import * as vscode from "vscode";
import { formatDistanceStrict } from "date-fns";
import type * as WorspaceSchema from "../../xataWorkspace/xataWorkspaceSchemas";
import type * as CoreSchema from "../../xataCore/xataCoreSchemas";
import type { GetWorkspacesListResponse } from "../../xataCore/xataCoreComponents";

export type Workspace = GetWorkspacesListResponse["workspaces"][-1];

type Database = Required<CoreSchema.ListDatabasesResponse>["databases"][-1] & {
  workspaceId: string;
  regionId: string;
};

type Branch = WorspaceSchema.Branch & {
  workspaceId: string;
  regionId: string;
  databaseName: string;
};

type Table = WorspaceSchema.Table & {
  workspaceId: string;
  regionId: string;
  databaseName: string;
  branchName: string;
};

type Column = WorspaceSchema.Column & {
  workspaceId: string;
  regionId: string;
  databaseName: string;
  branchName: string;
  tableName: string;
};

export class WorkspaceTreeItem extends vscode.TreeItem {
  contextValue = "workspace" as const;
  iconPath = new vscode.ThemeIcon("rocket");

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly workspace: Workspace
  ) {
    super(label, collapsibleState);
  }
}

export class DatabaseTreeItem extends vscode.TreeItem {
  contextValue = "database" as const;
  iconPath = new vscode.ThemeIcon("database");
  workspaceId: string;
  regionId: string;

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly database: Database,
    withColor: boolean
  ) {
    super(label, collapsibleState);

    this.workspaceId = database.workspaceId;
    this.regionId = database.regionId;
    this.description = database.regionId;

    if (withColor && database.ui?.color) {
      const color = new vscode.ThemeColor(database.ui.color.replace("-", "."));
      this.iconPath = new vscode.ThemeIcon("database", color);
    }
  }
}

export class BranchTreeItem extends vscode.TreeItem {
  contextValue = "branch" as const;
  iconPath = new vscode.ThemeIcon("source-control");
  workspaceId: string;
  regionId: string;
  databaseName: string;
  branchName: string;

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly branch: Branch
  ) {
    super(label, collapsibleState);

    this.workspaceId = branch.workspaceId;
    this.regionId = branch.regionId;
    this.databaseName = branch.databaseName;
    this.branchName = branch.name;

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
  workspaceId: string;
  regionId: string;
  databaseName: string;
  branchName: string;

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly table: Table,
    public readonly scope?: {
      token: string;
      vscodeWorkspace: vscode.WorkspaceFolder;
    }
  ) {
    super(label, collapsibleState);

    this.workspaceId = table.workspaceId;
    this.regionId = table.regionId;
    this.databaseName = table.databaseName;
    this.branchName = table.branchName;
  }
}

export class ColumnTreeItem extends vscode.TreeItem {
  contextValue = "column" as const;
  workspaceId: string;
  regionId: string;
  databaseName: string;
  branchName: string;
  tableName: string;

  constructor(
    public readonly label: string,
    public readonly path: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly column: Column,
    public readonly columns: WorspaceSchema.Column[],
    public readonly scope?: {
      token: string;
      vscodeWorkspace: vscode.WorkspaceFolder;
    }
  ) {
    super(label, collapsibleState);

    this.workspaceId = column.workspaceId;
    this.regionId = column.regionId;
    this.databaseName = column.databaseName;
    this.branchName = column.branchName;
    this.tableName = column.tableName;

    if (column.type === "link" && column.link) {
      this.description = `🔗 ${column.link.table}`;
      if (column.unique && column.notNull) {
        this.description += " (unique & not null)";
      } else if (column.unique) {
        this.description += " (unique)";
      } else if (column.notNull) {
        this.description += " (not null)";
      }
    } else {
      if (column.unique && column.notNull) {
        this.description = "unique & not null";
      } else if (column.unique) {
        this.description = "unique";
      } else if (column.notNull) {
        this.description = "not null";
      }
    }
  }
}

export class VSCodeWorkspaceTreeItem extends vscode.TreeItem {
  contextValue = "vscodeWorkspace" as const;

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly workspaceFolder: vscode.WorkspaceFolder,
    public readonly branch: string
  ) {
    super(label, collapsibleState);
    this.description = branch;
  }
}

export class EmptyVSCodeWorkspaceTreeItem extends vscode.TreeItem {
  contextValue = "emptyVscodeWorkspace" as const;

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly workspaceFolder: vscode.WorkspaceFolder
  ) {
    super(label, collapsibleState);
  }
}

export class NoConfigTreeItem extends vscode.TreeItem {
  contextValue = "noConfig" as const;

  constructor(
    public readonly label: string,
    public readonly workspaceFolder: vscode.WorkspaceFolder
  ) {
    super(label);
    this.command = {
      command: "xata.initWorkspace",
      title: "Init xatabase environment",
      arguments: [{ workspaceFolder }],
    };
    this.description = "Click to start";
  }
}

export class EmptyTreeItem extends vscode.TreeItem {
  contextValue = "empty" as const;

  constructor(public readonly label: string, command: vscode.Command) {
    super(label);
    this.command = command;
  }
}

export type TreeItem =
  | WorkspaceTreeItem
  | DatabaseTreeItem
  | BranchTreeItem
  | TableTreeItem
  | ColumnTreeItem
  | VSCodeWorkspaceTreeItem
  | EmptyVSCodeWorkspaceTreeItem
  | NoConfigTreeItem
  | EmptyTreeItem;
