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
      const { workspaces } = await getWorkspacesList({
        baseUrl: this.context.getBaseUrl(),
        context: this.context,
      });

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
      const { databases } = await getDatabaseList({
        baseUrl: this.context.getBaseUrl(element.workspace.id),
        context: this.context,
      });

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
          const { branches } = await getBranchList({
            baseUrl: this.context.getBaseUrl(element.workspace.id),
            context: this.context,
            pathParams: {
              dbName: db.name,
            },
          });

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
      const { branches } = await getBranchList({
        baseUrl: this.context.getBaseUrl(element.workspace.id),
        context: this.context,
        pathParams: {
          dbName: element.database.name,
        },
      });

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
      const { columns } = await getTableSchema({
        baseUrl: this.context.getBaseUrl(element.workspace.id),
        context: this.context,
        pathParams: {
          dbBranchName: `${element.database.name}:${element.branch.name}`,
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
    element: DatabaseTreeItem | BranchTreeItem | OneBranchDatabaseItem,
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
