import * as vscode from "vscode";
import { ColumnTreeItem } from "../views/treeItems/TreeItem";
import { TreeItemCommand } from "../types";
import { updateColumn } from "../xata/xataComponents";
import { ValidationError } from "../xata/xataFetcher";
import { validateResourceName } from "../utils";

export const renameColumnCommand: TreeItemCommand<ColumnTreeItem> = {
  id: "renameColumn",
  title: "Rename column",
  viewItems: ["column"],
  icon: "edit",
  views: ["xataExplorer", "xataWorkspace"],
  type: "treeItem",
  action: (context, refresh) => {
    return async (columnTreeItem) => {
      const existingTables = columnTreeItem.columns.map((c) => c.name);

      const name = await vscode.window.showInputBox({
        title: `New column name`,
        value: columnTreeItem.column.name,
        validateInput: validateResourceName("column", existingTables),
      });

      if (!name) {
        return;
      }

      try {
        await updateColumn({
          baseUrl:
            columnTreeItem.scope?.baseUrl ??
            context.getBaseUrl(columnTreeItem.workspaceId),
          token: columnTreeItem.scope?.token,
          context,
          pathParams: {
            dbBranchName: `${columnTreeItem.databaseName}:${columnTreeItem.branchName}`,
            tableName: columnTreeItem.tableName,
            columnName: columnTreeItem.column.name,
          },
          body: {
            name,
          },
        });

        return refresh();
      } catch (e) {
        if (e instanceof ValidationError) {
          vscode.window.showErrorMessage(e.details);
          return;
        }
        if (e instanceof Error) {
          vscode.window.showErrorMessage(e.message);
          return;
        }
      }
    };
  },
};
