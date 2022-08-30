import * as vscode from "vscode";
import { formatDistanceStrict } from "date-fns";
import { GetWorkspacesListResponse } from "../../xata/xataComponents";
import type * as Schema from "../../xata/xataSchemas";

export type Workspace = GetWorkspacesListResponse["workspaces"][-1];

type Database = Required<Schema.ListDatabasesResponse>["databases"][-1] & {
  workspaceId: string;
};

type Branch = Schema.Branch & { workspaceId: string; databaseName: string };

type Table = Schema.Table & {
  workspaceId: string;
  databaseName: string;
  branchName: string;
};

type Column = Schema.Column & {
  workspaceId: string;
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

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly database: Database,
    withColor: boolean
  ) {
    super(label, collapsibleState);

    this.workspaceId = database.workspaceId;

    if (withColor && database.ui?.color) {
      const color = new vscode.ThemeColor(database.ui.color.replace("-", "."));
      this.iconPath = new vscode.ThemeIcon("database", color);
    }
  }
}

export class OneBranchDatabaseItem extends vscode.TreeItem {
  contextValue = "oneBranchDatabase" as const;
  iconPath = new vscode.ThemeIcon("database");
  workspaceId: string;
  databaseName: string;

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly database: Database,
    public readonly branchName: string,
    withColor: boolean
  ) {
    super(label, collapsibleState);

    this.workspaceId = database.workspaceId;
    this.databaseName = database.name;

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
  databaseName: string;
  branchName: string;

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly branch: Branch
  ) {
    super(label, collapsibleState);

    this.workspaceId = branch.workspaceId;
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
  databaseName: string;
  branchName: string;

  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly table: Table,
    public readonly scope?: {
      baseUrl: string;
      token: string;
      vscodeWorkspace: vscode.WorkspaceFolder;
    }
  ) {
    super(label, collapsibleState);

    this.workspaceId = table.workspaceId;
    this.databaseName = table.databaseName;
    this.branchName = table.branchName;
  }
}

export class ColumnTreeItem extends vscode.TreeItem {
  contextValue = "column" as const;
  workspaceId: string;
  databaseName: string;
  branchName: string;
  tableName: string;

  constructor(
    public readonly label: string,
    public readonly path: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly column: Column,
    public readonly columns: Schema.Column[],
    public readonly scope?: {
      baseUrl: string;
      token: string;
      vscodeWorkspace: vscode.WorkspaceFolder;
    }
  ) {
    super(label, collapsibleState);

    this.workspaceId = column.workspaceId;
    this.databaseName = column.databaseName;
    this.branchName = column.branchName;
    this.tableName = column.tableName;

    if (column.type === "link" && column.link) {
      this.description = `🔗 ${column.link.table}`;
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
  | OneBranchDatabaseItem
  | BranchTreeItem
  | TableTreeItem
  | ColumnTreeItem
  | VSCodeWorkspaceTreeItem
  | EmptyVSCodeWorkspaceTreeItem
  | NoConfigTreeItem
  | EmptyTreeItem;
