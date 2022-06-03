import * as vscode from "vscode";
import { TableTreeItem } from "../views/treeItems/TreeItem";
import { TreeItemCommand } from "../types";
import { deleteTable } from "../xata/xataComponents";

export const deleteTableCommand: TreeItemCommand<TableTreeItem> = {
  id: "deleteTable",
  icon: "trash",
  type: "treeItem",
  action: (context, refresh) => {
    return async (tableTreeItem) => {
      const confirm = await vscode.window.showInputBox({
        title: `Delete table`,
        prompt: `Deleting this table will result in the permanent removal of the entire table including all data associated with it. This action cannot be undone.`,
        validateInput: (value) => {
          if (value !== tableTreeItem.table.name) {
            return `Please type "${tableTreeItem.table.name}" to confirm`;
          }
        },
      });

      if (!confirm) {
        return;
      }

      await deleteTable({
        baseUrl:
          tableTreeItem.scope?.baseUrl ??
          context.getBaseUrl(tableTreeItem.workspaceId),
        token: tableTreeItem.scope?.token,
        context,
        pathParams: {
          dbBranchName: `${tableTreeItem.databaseName}:${tableTreeItem.branchName}`,
          tableName: tableTreeItem.table.name,
        },
      });

      return refresh();
    };
  },
};
