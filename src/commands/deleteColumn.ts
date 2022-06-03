import * as vscode from "vscode";
import { ColumnTreeItem } from "../views/treeItems/TreeItem";
import { TreeItemCommand } from "../types";
import { deleteColumn } from "../xata/xataComponents";

export const deleteColumnCommand: TreeItemCommand<ColumnTreeItem> = {
  id: "deleteColumn",
  icon: "trash",
  type: "treeItem",
  action: (context, explorer, jsonSchemaProvider) => {
    return async (tableTreeItem) => {
      const confirm = await vscode.window.showInputBox({
        title: `Delete column`,
        prompt: `Deleting this column will suppress all data associated with it. This action cannot be undone.`,
        validateInput: (value) => {
          if (value !== tableTreeItem.column.name) {
            return `Please type "${tableTreeItem.column.name}" to confirm`;
          }
        },
      });

      if (!confirm) {
        return;
      }

      await deleteColumn({
        baseUrl: context.getBaseUrl(tableTreeItem.workspaceId),
        context,
        pathParams: {
          dbBranchName: `${tableTreeItem.databaseName}:${tableTreeItem.branchName}`,
          tableName: tableTreeItem.tableName,
          columnName: tableTreeItem.column.name,
        },
      });

      // Notify the change to our custom jsonSchemaProvider
      jsonSchemaProvider.onDidChangeEmitter.fire(
        vscode.Uri.parse(
          `xata:${tableTreeItem.workspaceId}/${tableTreeItem.databaseName}/${tableTreeItem.branchName}/${tableTreeItem.tableName}`
        )
      );

      return explorer.refresh();
    };
  },
};
