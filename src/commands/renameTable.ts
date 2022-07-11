import * as vscode from "vscode";
import { TableTreeItem } from "../views/treeItems/TreeItem";
import { TreeItemCommand } from "../types";
import { getBranchDetails, updateTable } from "../xata/xataComponents";
import { ValidationError } from "../xata/xataFetcher";
import { validateResourceName } from "../utils";

export const renameTableCommand: TreeItemCommand<TableTreeItem> = {
  id: "renameTable",
  icon: "edit",
  views: ["xataExplorer", "xataWorkspace"],
  type: "treeItem",
  action: (context, refresh, jsonSchemaProvider) => {
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
        validateInput: validateResourceName("table", existingTables),
      });

      if (!name) {
        return;
      }

      try {
        await updateTable({
          baseUrl:
            tableTreeItem.scope?.baseUrl ??
            context.getBaseUrl(tableTreeItem.workspaceId),
          token: tableTreeItem.scope?.token,
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
