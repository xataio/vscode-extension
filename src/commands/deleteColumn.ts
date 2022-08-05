import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";
import { deleteColumn } from "../xata/xataComponents";

export const deleteColumnCommand = createTreeItemCommand({
  id: "deleteColumn",
  title: "Delete column",
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
  icon: "trash",
  action: (context, refresh, jsonSchemaProvider) => {
    return async (columnTreeItem) => {
      const confirm = await vscode.window.showInputBox({
        title: `Delete column`,
        prompt: `Deleting this column will suppress all data associated with it. This action cannot be undone.`,
        validateInput: (value) => {
          if (value !== columnTreeItem.column.name) {
            return `Please type "${columnTreeItem.column.name}" to confirm`;
          }
        },
      });

      if (!confirm) {
        return;
      }

      await deleteColumn({
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
      });

      // Notify the change to our custom jsonSchemaProvider
      jsonSchemaProvider.onDidChangeEmitter.fire(
        vscode.Uri.parse(
          `xata:${columnTreeItem.workspaceId}/${columnTreeItem.databaseName}/${columnTreeItem.branchName}/${columnTreeItem.tableName}`
        )
      );

      return refresh();
    };
  },
});
