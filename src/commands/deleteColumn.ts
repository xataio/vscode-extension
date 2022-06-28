import * as vscode from "vscode";
import { ColumnTreeItem } from "../views/treeItems/TreeItem";
import { TreeItemCommand } from "../types";
import { deleteColumn } from "../xata/xataComponents";

export const deleteColumnCommand: TreeItemCommand<ColumnTreeItem> = {
  id: "deleteColumn",
  icon: "trash",
  views: ["xataExplorer", "xataWorkspace"],
  type: "treeItem",
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
};
