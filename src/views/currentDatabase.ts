import * as vscode from "vscode";
import { Context, getContext } from "../context";
import dotenv from "dotenv";

import {
  TreeItem,
  TableTreeItem,
  VSCodeWorkspaceTreeItem,
} from "./treeItems/TreeItem";
import { getColumnTreeItems } from "./treeItems/getColumnTreeItems";
import { getTableTreeItems } from "./treeItems/getTableTreeItems";

import { getBranchDetails } from "../xata/xataComponents";

class XataDataProvider implements vscode.TreeDataProvider<TreeItem> {
  #onDidChangeTreeData: vscode.EventEmitter<TreeItem | null> =
    new vscode.EventEmitter<TreeItem | null>();

  readonly onDidChangeTreeData:
    | vscode.Event<TreeItem | TreeItem[] | null>
    | undefined = this.#onDidChangeTreeData.event;

  constructor(private context: Context) {}

  public refresh() {
    this.#onDidChangeTreeData.fire(null);
  }

  async getChildren(element?: TreeItem): Promise<TreeItem[]> {
    if (!(await this.context.getToken())) {
      return [];
    }

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
        const config = await this.getVscodeWorkspaceEnvConfig(
          vscode.workspace.workspaceFolders[0].uri
        );

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
          }
        );
      } else {
        // Multiple vscode workspaces
        return vscode.workspace.workspaceFolders.map(
          (workspaceFolder) =>
            new VSCodeWorkspaceTreeItem(
              workspaceFolder.name,
              vscode.TreeItemCollapsibleState.Collapsed,
              workspaceFolder
            )
        );
      }
    }

    // VSCode workspace folder
    if (element.contextValue === "vscodeWorkspace") {
      const config = await this.getVscodeWorkspaceEnvConfig(
        element.workspaceFolder.uri
      );

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

  private async getVscodeWorkspaceEnvConfig(uri: vscode.Uri) {
    const envFile = await vscode.workspace.fs.readFile(
      vscode.Uri.joinPath(uri, ".env")
    );
    const config = dotenv.parse(Buffer.from(envFile));

    if (
      typeof config.XATA_DATABASE_URL === "string" &&
      typeof config.XATA_DATABASE_BRANCH === "string" &&
      typeof config.XATA_API_KEY === "string"
    ) {
      const urlChunks = config.XATA_DATABASE_URL.match(/\/\/([a-z0-9-]*)\./);
      if (!urlChunks) {
        throw new Error("XATA_DATABASE_URL is not valid");
      }

      return {
        baseUrl: new URL(config.XATA_DATABASE_URL).origin,
        databaseName: new URL(config.XATA_DATABASE_URL).pathname.split("/")[2],
        databaseUrl: config.XATA_DATABASE_URL,
        branch: config.XATA_DATABASE_BRANCH,
        apiKey: config.XATA_API_KEY,
        workspaceId: urlChunks[1],
      };
    } else {
      throw new Error(".env is missing"); // TODO improve the error / call to action
    }
  }
}

export class CurrentDatabase {
  private treeDataProvider: XataDataProvider;

  public refresh() {
    this.treeDataProvider.refresh();
  }

  constructor(context: vscode.ExtensionContext) {
    this.treeDataProvider = new XataDataProvider(getContext(context));

    context.subscriptions.push(
      vscode.window.createTreeView("currentDatabase", {
        treeDataProvider: this.treeDataProvider,
      })
    );
  }
}
