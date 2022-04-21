import * as vscode from "vscode";
import { GetWorkspacesListResponse } from "./xata/xataComponents";
import { Column, ListDatabasesResponse, Table } from "./xata/xataSchemas";

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

// TODO Add branch layer

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

export class TableTreeItem extends vscode.TreeItem {
  contextValue = "table" as const;

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly workspace: GetWorkspacesListResponse["workspaces"][-1],
    public readonly database: Required<ListDatabasesResponse>["databases"][-1],
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
    public readonly table: Table,
    public readonly column: Column
  ) {
    super(label, collapsibleState);
  }
}

export type TreeItem =
  | WorkspaceTreeItem
  | DatabaseTreeItem
  | TableTreeItem
  | ColumnTreeItem;
