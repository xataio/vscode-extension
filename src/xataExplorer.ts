import * as vscode from "vscode";
import { Context, getContext } from "./context";

import {
  TreeItem,
  ColumnTreeItem,
  DatabaseTreeItem,
  TableTreeItem,
  WorkspaceTreeItem,
  BranchTreeItem,
  OneBranchDatabaseItem,
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
        baseUrl: this.context.getBaseUrl(),
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
        baseUrl: this.context.getBaseUrl(element.workspace.id),
        context: this.context,
      });

      if (!databaseList.success) {
        throw new Error(databaseList.error.payload.message);
      }

      const { databases } = databaseList.data;

      return Promise.all(
        (databases || []).map(async (db) => {
          if (
            db.numberOfBranches > 1 ||
            this.context.getHideBranchLevel() === false
          ) {
            return new DatabaseTreeItem(
              db.displayName,
              vscode.TreeItemCollapsibleState.Collapsed,
              element.workspace,
              db,
              this.context.getEnableDatabaseColor()
            );
          }
          const branchList = await getBranchList({
            baseUrl: this.context.getBaseUrl(element.workspace.id),
            context: this.context,
            pathParams: {
              dbName: db.name,
            },
          });

          if (!branchList.success) {
            throw new Error(branchList.error.payload.message);
          }

          const { branches } = branchList.data;

          return new OneBranchDatabaseItem(
            db.displayName,
            vscode.TreeItemCollapsibleState.Collapsed,
            element.workspace,
            db,
            branches[0],
            this.context.getEnableDatabaseColor()
          );
        })
      );
    }

    // Database level
    if (
      element.contextValue === "database" ||
      element.contextValue === "oneBranchDatabase"
    ) {
      const branchList = await getBranchList({
        baseUrl: this.context.getBaseUrl(element.workspace.id),
        context: this.context,
        pathParams: {
          dbName: element.database.name,
        },
      });

      if (!branchList.success) {
        throw new Error(branchList.error.payload.message);
      }

      const { branches } = branchList.data;

      if (branches.length === 1 && this.context.getHideBranchLevel()) {
        return this.getTableTreeItems(element, branches[0]);
      } else {
        return branches.map(
          (branch) =>
            new BranchTreeItem(
              branch.name,
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
      const tableSchema = await getTableSchema({
        baseUrl: this.context.getBaseUrl(element.workspace.id),
        context: this.context,
        pathParams: {
          dbBranchName: `${element.database.name}:${element.branch.name}`,
          tableName: element.table.name,
        },
      });

      if (!tableSchema.success) {
        throw new Error(tableSchema.error.payload.message);
      }

      const { columns } = tableSchema.data;

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
    element: DatabaseTreeItem | BranchTreeItem | OneBranchDatabaseItem,
    branch: Branch
  ) {
    const branchDetails = await getBranchDetails({
      baseUrl: this.context.getBaseUrl(element.workspace.id),
      context: this.context,
      pathParams: {
        dbBranchName: `${element.database.name}:${branch.name}`,
      },
    });

    if (!branchDetails.success) {
      throw new Error(branchDetails.error.payload.message);
    }

    const { schema } = branchDetails.data;

    return schema.tables.map(
      (table) =>
        new TableTreeItem(
          table.name,
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
  private treeDataProvider: XataDataProvider;

  public refresh() {
    this.treeDataProvider.refresh();
  }

  constructor(context: vscode.ExtensionContext) {
    this.treeDataProvider = new XataDataProvider(getContext(context));

    context.subscriptions.push(
      vscode.window.createTreeView("xataExplorer", {
        treeDataProvider: this.treeDataProvider,
      })
    );
  }
}
