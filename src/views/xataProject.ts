import * as vscode from "vscode";
import { Context } from "../context";

import {
  ColumnTreeItem,
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
          "xata.configState",
          config ? (config.apiKey ? "logged" : "notLogged") : false
        );

        if (!config) {
          this.setView({
            title: "(Uninitialized)",
          });
          return [];
        } else if (!config.apiKey) {
          this.setView({
            title: config.databaseName,
            description: config.branch,
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
            regionId: config.regionId,
            databaseName: config.databaseName,
            branchName: config.branch,
          },
          this.context,
          {
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

            if (!config || !config.apiKey) {
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

      if (!config?.apiKey) {
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
          regionId: config.regionId,
          databaseName: config.databaseName,
          branchName: config.branch,
        },
        this.context,
        {
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

    // Column level (type === `object`)
    if (element.contextValue === "column" && element.column.columns) {
      return element.column.columns.map(
        (column) =>
          new ColumnTreeItem(
            column.name,
            `${element.path}.${column.name}`,
            column.columns?.length
              ? vscode.TreeItemCollapsibleState.Collapsed
              : vscode.TreeItemCollapsibleState.None,
            {
              ...column,
              workspaceId: element.workspaceId,
              regionId: element.regionId,
              databaseName: element.databaseName,
              branchName: element.branchName,
              tableName: element.tableName,
            },
            element.columns,
            element.scope
          )
      );
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

export class XataProject {
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
    this.treeView = vscode.window.createTreeView("xataProject", {
      treeDataProvider: this.treeDataProvider,
      showCollapseAll: true,
    });
  }

  dispose() {
    this.treeView.dispose();
  }
}
