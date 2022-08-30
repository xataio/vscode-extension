import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";
import { updateColumn } from "../xata/xataComponents";
import { getFlattenColumns, validateResourceName } from "../utils";

export const renameColumnCommand = createTreeItemCommand({
  id: "renameColumn",
  title: "Rename column",
  contexts: [
    {
      item: "column",
      view: "xataExplorer",
    },
    {
      item: "column",
      view: "xataProject",
    },
  ],
  icon: "edit",
  action: (context, refresh) => {
    return async (columnTreeItem) => {
      const existingColumns = getFlattenColumns(columnTreeItem.columns);

      const name = await vscode.window.showInputBox({
        title: `New column name`,
        value: columnTreeItem.path,
        validateInput: validateResourceName("column", existingColumns),
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
            columnName: columnTreeItem.path,
          },
          body: {
            name,
          },
        });

        return refresh();
      } catch (e) {
        if (e instanceof Error) {
          vscode.window.showErrorMessage(e.message);
          return;
        }
      }
    };
  },
});
