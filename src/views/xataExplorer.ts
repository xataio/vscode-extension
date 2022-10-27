import * as vscode from "vscode";
import { Context, getContext } from "../context";

import {
  TreeItem,
  DatabaseTreeItem,
  WorkspaceTreeItem,
  BranchTreeItem,
  ColumnTreeItem,
} from "./treeItems/TreeItem";
import { getColumnTreeItems } from "./treeItems/getColumnTreeItems";
import { getTableTreeItems } from "./treeItems/getTableTreeItems";
import {
  getDatabaseList,
  getWorkspacesList,
} from "../xataCore/xataCoreComponents";
import { getBranchList } from "../xataWorkspace/xataWorkspaceComponents";

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

    // Root level
    if (!element) {
      const workspacesList = await getWorkspacesList({
        context: this.context,
      });

      if (!workspacesList.success) {
        throw new Error(workspacesList.error.payload.message);
      }

      const { workspaces } = workspacesList.data;

      // Expose `xata.workspaceCount` for the welcome screen logic
      vscode.commands.executeCommand(
        "setContext",
        "xata.workspaceCount",
        workspaces.length
      );

      return workspaces.map(
        (w) =>
          new WorkspaceTreeItem(
            w.name,
            vscode.TreeItemCollapsibleState.Collapsed,
            w
          )
      );
    }

    // Workspace level
    if (element.contextValue === "workspace") {
      const databaseList = await getDatabaseList({
        pathParams: {
          workspaceId: element.workspace.id,
        },
        context: this.context,
      });

      if (!databaseList.success) {
        throw new Error(databaseList.error.payload.message);
      }

      const { databases } = databaseList.data;

      return Promise.all(
        (databases || []).map(async (db) => {
          return new DatabaseTreeItem(
            db.name,
            vscode.TreeItemCollapsibleState.Collapsed,
            { ...db, workspaceId: element.workspace.id, regionId: db.region },
            this.context.getEnableDatabaseColor()
          );
        })
      );
    }

    // Database level
    if (element.contextValue === "database") {
      const branchList = await getBranchList({
        workspaceId: element.workspaceId,
        regionId: element.regionId,
        context: this.context,
        pathParams: {
          dbName: element.database.name,
        },
      });

      if (!branchList.success) {
        throw new Error(branchList.error.payload.message);
      }

      const { branches } = branchList.data;

      return branches.map(
        (branch) =>
          new BranchTreeItem(
            branch.name,
            vscode.TreeItemCollapsibleState.Collapsed,

            {
              ...branch,
              workspaceId: element.workspaceId,
              regionId: element.regionId,
              databaseName: element.database.name,
            }
          )
      );
    }

    // Branch level
    if (element.contextValue === "branch") {
      return getTableTreeItems(
        {
          workspaceId: element.workspaceId,
          regionId: element.regionId,
          databaseName: element.databaseName,
          branchName: element.branchName,
        },
        this.context
      );
    }

    // Table level
    if (element.contextValue === "table") {
      return getColumnTreeItems(element, this.context);
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

export class XataExplorer {
  private treeDataProvider: XataDataProvider;
  private view: vscode.TreeView<unknown>;

  public refresh() {
    this.treeDataProvider.refresh();
  }

  constructor(context: Context) {
    this.treeDataProvider = new XataDataProvider(context);

    this.view = vscode.window.createTreeView("xataExplorer", {
      treeDataProvider: this.treeDataProvider,
      showCollapseAll: true,
    });
  }

  dispose() {
    this.view.dispose();
  }
}
