import * as vscode from "vscode";
import { formatDistanceStrict } from "date-fns";
import { GetWorkspacesListResponse } from "./xata/xataComponents";
import {
  Branch,
  Column,
  ListDatabasesResponse,
  Table,
} from "./xata/xataSchemas";

export class WorkspaceTreeItem extends vscode.TreeItem {
  contextValue = "workspace" as const;
  iconPath = new vscode.ThemeIcon("rocket");

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly workspace: GetWorkspacesListResponse["workspaces"][-1]
  ) {
    super(label, collapsibleState);
  }
}

export class DatabaseTreeItem extends vscode.TreeItem {
  contextValue = "database" as const;
  iconPath = new vscode.ThemeIcon("database");

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly workspace: GetWorkspacesListResponse["workspaces"][-1],
    public readonly database: Required<ListDatabasesResponse>["databases"][-1],
    withColor: boolean
  ) {
    super(label, collapsibleState);
    if (withColor && database.ui?.color) {
      const color = new vscode.ThemeColor(database.ui.color.replace("-", "."));
      this.iconPath = new vscode.ThemeIcon("database", color);
    }
  }
}

export class OneBranchDatabaseItem extends vscode.TreeItem {
  contextValue = "oneBranchDatabase" as const;
  iconPath = new vscode.ThemeIcon("database");

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly workspace: GetWorkspacesListResponse["workspaces"][-1],
    public readonly database: Required<ListDatabasesResponse>["databases"][-1],
    withColor: boolean
  ) {
    super(label, collapsibleState);
    if (withColor && database.ui?.color) {
      const color = new vscode.ThemeColor(database.ui.color.replace("-", "."));
      this.iconPath = new vscode.ThemeIcon("database", color);
    }
  }
}

export class BranchTreeItem extends vscode.TreeItem {
  contextValue = "branch" as const;
  iconPath = new vscode.ThemeIcon("source-control");

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly workspace: GetWorkspacesListResponse["workspaces"][-1],
    public readonly database: Required<ListDatabasesResponse>["databases"][-1],
    public readonly branch: Branch
  ) {
    super(label, collapsibleState);

    this.description = formatDistanceStrict(
      new Date(branch.createdAt),
      new Date(),
      {
        addSuffix: true,
      }
    );
  }
}

export class TableTreeItem extends vscode.TreeItem {
  contextValue = "table" as const;
  iconPath = new vscode.ThemeIcon("table");

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly workspace: GetWorkspacesListResponse["workspaces"][-1],
    public readonly database: Required<ListDatabasesResponse>["databases"][-1],
    public readonly branch: Branch,
    public readonly table: Table
  ) {
    super(label, collapsibleState);
  }
}

export class ColumnTreeItem extends vscode.TreeItem {
  contextValue = "column" as const;

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly workspace: GetWorkspacesListResponse["workspaces"][-1],
    public readonly database: Required<ListDatabasesResponse>["databases"][-1],
    public readonly branch: Branch,
    public readonly table: Table,
    public readonly column: Column
  ) {
    super(label, collapsibleState);

    if (column.type === "link" && column.link) {
      this.description = `🔗 ${column.link.table}`;
    }
  }
}

export type TreeItem =
  | WorkspaceTreeItem
  | DatabaseTreeItem
  | OneBranchDatabaseItem
  | BranchTreeItem
  | TableTreeItem
  | ColumnTreeItem;
