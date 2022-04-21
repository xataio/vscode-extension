import * as vscode from "vscode";
import { Context, getContext } from "./context";

import {
  TreeItem,
  ColumnTreeItem,
  DatabaseTreeItem,
  TableTreeItem,
  WorkspaceTreeItem,
  BranchTreeItem,
} from "./TreeItem";

import {
  getBranchDetails,
  getBranchList,
  getDatabaseList,
  getTableSchema,
  getWorkspacesList,
} from "./xata/xataComponents";
import { Branch } from "./xata/xataSchemas";

export class XataDataProvider implements vscode.TreeDataProvider<TreeItem> {
  constructor(private context: Context) {}

  async getChildren(element?: TreeItem): Promise<TreeItem[]> {
    // Root level
    if (!element) {
      const { workspaces } = await getWorkspacesList({
        baseUrl: this.context.getBaseUrl(),
        context: this.context,
      });

      return workspaces.map(
        (w) =>
          new WorkspaceTreeItem(
            `[ws] ${w.name}`,
            vscode.TreeItemCollapsibleState.Collapsed,
            w
          )
      );
    }

    // Workspace level
    if (element.contextValue === "workspace") {
      const { databases } = await getDatabaseList({
        baseUrl: this.context.getBaseUrl(element.workspace.id),
        context: this.context,
      });

      return (databases || []).map(
        (db) =>
          new DatabaseTreeItem(
            `[db] ${db.displayName}`,
            vscode.TreeItemCollapsibleState.Collapsed,
            element.workspace,
            db
          )
      );
    }

    // Database level
    if (element.contextValue === "database") {
      const { branches } = await getBranchList({
        baseUrl: this.context.getBaseUrl(element.workspace.id),
        context: this.context,
        pathParams: {
          dbName: element.database.name,
        },
      });

      if (branches.length === 1) {
        return this.getTableTreeItems(element, branches[0]);
      } else {
        return branches.map(
          (branch) =>
            new BranchTreeItem(
              `[b] ${branch.name}`,
              vscode.TreeItemCollapsibleState.Collapsed,
              element.workspace,
              element.database,
              branch
            )
        );
      }
    }

    // Branch level
    if (element.contextValue === "branch") {
      return this.getTableTreeItems(element, element.branch);
    }

    // Table level
    if (element.contextValue === "table") {
      const { columns } = await getTableSchema({
        baseUrl: this.context.getBaseUrl(element.workspace.id),
        context: this.context,
        pathParams: {
          dbBranchName: `${element.database.name}:main`,
          tableName: element.table.name,
        },
      });

      return columns.map(
        (column) =>
          new ColumnTreeItem(
            column.name,
            vscode.TreeItemCollapsibleState.None,
            element.workspace,
            element.database,
            element.branch,
            element.table,
            column
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

  private async getTableTreeItems(
    element: DatabaseTreeItem | BranchTreeItem,
    branch: Branch
  ) {
    const { schema } = await getBranchDetails({
      baseUrl: this.context.getBaseUrl(element.workspace.id),
      context: this.context,
      pathParams: {
        dbBranchName: `${element.database.name}:${branch.name}`,
      },
    });

    return schema.tables.map(
      (table) =>
        new TableTreeItem(
          `[t] ${table.name}`,
          vscode.TreeItemCollapsibleState.Collapsed,
          element.workspace,
          element.database,
          branch,
          table
        )
    );
  }
}

export class XataExplorer {
  constructor(context: vscode.ExtensionContext) {
    const treeDataProvider = new XataDataProvider(getContext(context));

    context.subscriptions.push(
      vscode.window.createTreeView("xataExplorer", {
        treeDataProvider,
      })
    );
  }
}
