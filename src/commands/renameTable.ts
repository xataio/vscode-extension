import * as vscode from "vscode";
import { TableTreeItem } from "../views/treeItems/TreeItem";
import { TreeItemCommand } from "../types";
import { getBranchDetails, updateTable } from "../xata/xataComponents";
import { ValidationError } from "../xata/xataFetcher";

export const renameTableCommand: TreeItemCommand<TableTreeItem> = {
  id: "renameTable",
  icon: "edit",
  type: "treeItem",
  action: (context, explorer, jsonSchemaProvider) => {
    return async (tableTreeItem) => {
      const branchDetails = await getBranchDetails({
        baseUrl: context.getBaseUrl(tableTreeItem.workspaceId),
        context: context,
        pathParams: {
          dbBranchName: `${tableTreeItem.databaseName}:${tableTreeItem.branchName}`,
        },
      });

      if (!branchDetails.success) {
        throw new Error(branchDetails.error.payload.message);
      }

      const { schema } = branchDetails.data;

      const existingTables = schema.tables.map((t) => t.name);

      const name = await vscode.window.showInputBox({
        title: `New table name`,
        value: tableTreeItem.table.name,
        validateInput: (value) => {
          const isValid = Boolean(/^[a-zA-Z0-9_-~:]+$/.exec(value));
          if (existingTables.includes(value)) {
            return "table already exists";
          }

          return isValid
            ? undefined
            : "only alphanumerics and '-', '_', or '~' are allowed";
        },
      });

      if (!name) {
        return;
      }

      try {
        await updateTable({
          baseUrl: context.getBaseUrl(tableTreeItem.workspaceId),
          context,
          pathParams: {
            dbBranchName: `${tableTreeItem.databaseName}:${tableTreeItem.branchName}`,
            tableName: tableTreeItem.table.name,
          },
          body: {
            name,
          },
        });

        // Notify the change to our custom jsonSchemaProvider
        jsonSchemaProvider.onDidChangeEmitter.fire(
          vscode.Uri.parse(
            `xata:${tableTreeItem.workspaceId}/${tableTreeItem.databaseName}/${tableTreeItem.branchName}/${tableTreeItem.table.name}`
          )
        );

        return explorer.refresh();
      } catch (e) {
        if (e instanceof ValidationError) {
          return vscode.window.showErrorMessage(e.details);
        }
        if (e instanceof Error) {
          return vscode.window.showErrorMessage(e.message);
        }
      }
    };
  },
};
