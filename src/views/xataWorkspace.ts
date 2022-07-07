import * as vscode from "vscode";
import { Context, getContext } from "../context";

import {
  EmptyVSCodeWorkspaceTreeItem,
  NoConfigTreeItem,
  TreeItem,
  VSCodeWorkspaceTreeItem,
} from "./treeItems/TreeItem";
import { getColumnTreeItems } from "./treeItems/getColumnTreeItems";
import { getTableTreeItems } from "./treeItems/getTableTreeItems";

class XataDataProvider implements vscode.TreeDataProvider<TreeItem> {
  #onDidChangeTreeData: vscode.EventEmitter<TreeItem | null> =
    new vscode.EventEmitter<TreeItem | null>();

  readonly onDidChangeTreeData:
    | vscode.Event<TreeItem | TreeItem[] | null>
    | undefined = this.#onDidChangeTreeData.event;

  constructor(
    private context: Context,
    private setView: (options: { description?: string; title?: string }) => void
  ) {}

  public refresh() {
    this.#onDidChangeTreeData.fire(null);
  }

  async getChildren(element?: TreeItem): Promise<TreeItem[]> {
    if (
      !vscode.workspace.workspaceFolders ||
      vscode.workspace.workspaceFolders.length < 1
    ) {
      return [];
    }

    // Root level
    if (!element) {
      if (vscode.workspace.workspaceFolders.length === 1) {
        // One vscode workspace
        const config = await this.context.getVSCodeWorkspaceEnvConfig(
          vscode.workspace.workspaceFolders[0].uri
        );

        vscode.commands.executeCommand(
          "setContext",
          "xata.isConfigValid",
          Boolean(config)
        );

        if (!config) {
          this.setView({
            title: "unknown",
          });
          return [];
        }

        this.setView({
          title: config.databaseName,
          description: config.branch,
        });

        return getTableTreeItems(
          {
            workspaceId: config.workspaceId,
            databaseName: config.databaseName,
            branchName: config.branch,
          },
          this.context,
          {
            baseUrl: config.baseUrl,
            token: config.apiKey,
            vscodeWorkspace: vscode.workspace.workspaceFolders[0],
          }
        );
      } else {
        // Multiple vscode workspaces
        this.setView({
          title: "Workspaces",
          description: undefined,
        });

        return Promise.all(
          vscode.workspace.workspaceFolders.map(async (workspaceFolder) => {
            const config = await this.context.getVSCodeWorkspaceEnvConfig(
              workspaceFolder.uri
            );

            if (!config) {
              return new EmptyVSCodeWorkspaceTreeItem(
                workspaceFolder.name,
                vscode.TreeItemCollapsibleState.Collapsed,
                workspaceFolder
              );
            }

            return new VSCodeWorkspaceTreeItem(
              workspaceFolder.name,
              vscode.TreeItemCollapsibleState.Collapsed,
              workspaceFolder,
              config.branch
            );
          })
        );
      }
    }

    // VSCode workspace folder
    if (
      element.contextValue === "vscodeWorkspace" ||
      element.contextValue === "emptyVscodeWorkspace"
    ) {
      const config = await this.context.getVSCodeWorkspaceEnvConfig(
        element.workspaceFolder.uri
      );

      if (!config) {
        return [
          new NoConfigTreeItem(
            "No xata project found!",
            element.workspaceFolder
          ),
        ];
      }

      return getTableTreeItems(
        {
          workspaceId: config.workspaceId,
          databaseName: config.databaseName,
          branchName: config.branch,
        },
        this.context,
        {
          baseUrl: config.baseUrl,
          token: config.apiKey,
          vscodeWorkspace: element.workspaceFolder,
        }
      );
    }

    // Table level
    if (element.contextValue === "table") {
      if (!element.scope) {
        throw new Error(
          "[dev] A scope should be provided to the table element"
        );
      }
      return getColumnTreeItems(element, this.context, element.scope);
    }

    return [];
  }

  getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    if (element.contextValue === "column") {
      element.iconPath = this.context.getColumnIcon(element.column.type);
    }

    return element;
  }
}

export class XataWorkspace {
  private treeDataProvider: XataDataProvider;
  private treeView: vscode.TreeView<unknown>;

  public refresh() {
    this.treeDataProvider.refresh();
  }

  constructor(context: Context) {
    this.treeDataProvider = new XataDataProvider(
      context,
      ({ description, title }) => {
        this.treeView.description = description;
        this.treeView.title = title;
      }
    );
    this.treeView = vscode.window.createTreeView("xataWorkspace", {
      treeDataProvider: this.treeDataProvider,
      showCollapseAll: true,
    });
  }

  dispose() {
    this.treeView.dispose();
  }
}
