import * as vscode from "vscode";
import { GetWorkspacesListResponse } from "./xata/xataComponents";
import {
  Branch,
  Column,
  ListDatabasesResponse,
  Table,
} from "./xata/xataSchemas";

export class WorkspaceTreeItem extends vscode.TreeItem {
  contextValue = "workspace" as const;

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

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly workspace: GetWorkspacesListResponse["workspaces"][-1],
    public readonly database: Required<ListDatabasesResponse>["databases"][-1]
  ) {
    super(label, collapsibleState);
  }
}

export class BranchTreeItem extends vscode.TreeItem {
  contextValue = "branch" as const;

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly workspace: GetWorkspacesListResponse["workspaces"][-1],
    public readonly database: Required<ListDatabasesResponse>["databases"][-1],
    public readonly branch: Branch
  ) {
    super(label, collapsibleState);
  }
}

export class TableTreeItem extends vscode.TreeItem {
  contextValue = "table" as const;

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
      this.label = `${column.name} (${column.link.table})`;
    }
  }
}

export type TreeItem =
  | WorkspaceTreeItem
  | DatabaseTreeItem
  | BranchTreeItem
  | TableTreeItem
  | ColumnTreeItem;
