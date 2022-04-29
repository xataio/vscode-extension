import * as vscode from "vscode";
import { ColumnTreeItem } from "../TreeItem";
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
        baseUrl: context.getBaseUrl(tableTreeItem.workspace.id),
        context,
        pathParams: {
          dbBranchName: `${tableTreeItem.database.name}:${tableTreeItem.branch.name}`,
          tableName: tableTreeItem.table.name,
          columnName: tableTreeItem.column.name,
        },
      });

      // Notify the change to our custom jsonSchemaProvider
      jsonSchemaProvider.onDidChangeEmitter.fire(
        vscode.Uri.parse(
          `xata:${tableTreeItem.workspace.id}/${tableTreeItem.database.name}/${tableTreeItem.branch.name}/${tableTreeItem.table.name}`
        )
      );

      return explorer.refresh();
    };
  },
};
