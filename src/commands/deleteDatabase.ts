import * as vscode from "vscode";
import { DatabaseTreeItem } from "../views/treeItems/TreeItem";
import { TreeItemCommand } from "../types";
import { deleteDatabase } from "../xata/xataComponents";

export const deleteDatabaseCommand: TreeItemCommand<DatabaseTreeItem> = {
  id: "deleteDatabase",
  icon: "trash",
  views: ["xataExplorer"],
  type: "treeItem",
  action: (context, refresh) => {
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
        baseUrl: context.getBaseUrl(databaseTreeItem.workspaceId),
        context,
        pathParams: {
          dbName: databaseTreeItem.database.name,
        },
      });

      return refresh();
    };
  },
};
