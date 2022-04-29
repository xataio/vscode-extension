import * as vscode from "vscode";
import { DatabaseTreeItem } from "../TreeItem";
import { TreeItemCommand } from "../types";
import { deleteDatabase } from "../xata/xataComponents";

export const deleteDatabaseCommand: TreeItemCommand<DatabaseTreeItem> = {
  id: "deleteDatabase",
  icon: "trash",
  type: "treeItem",
  action: (context, explorer) => {
    return async (databaseTreeItem) => {
      const confirm = await vscode.window.showInputBox({
        title: `Delete database`,
        prompt: `Deleting this database will result in the permanent removal of the entire database including all data and branches associated with it. This action cannot be undone.`,
        validateInput: (value) => {
          if (value !== databaseTreeItem.database.name) {
            return `Please type "${databaseTreeItem.database.name}" to confirm`;
          }
        },
      });

      if (!confirm) {
        return;
      }

      await deleteDatabase({
        baseUrl: context.getBaseUrl(databaseTreeItem.workspace.id),
        context,
        pathParams: {
          dbName: databaseTreeItem.database.name,
        },
      });

      return explorer.refresh();
    };
  },
};
