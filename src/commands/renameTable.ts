import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";
import { validateResourceName } from "../utils";
import {
  getBranchDetails,
  updateTable,
} from "../xataWorkspace/xataWorkspaceComponents";

export const renameTableCommand = createTreeItemCommand({
  id: "renameTable",
  title: "Rename table",
  contexts: [
    { item: "table", view: "xataExplorer", group: "1_actions" },
    { item: "table", view: "xataProject", group: "1_actions" },
  ],
  icon: "edit",
  action: (context, refresh, jsonSchemaProvider) => {
    return async (tableTreeItem) => {
      const branchDetails = await getBranchDetails({
        workspaceId: tableTreeItem.workspaceId,
        regionId: tableTreeItem.regionId,
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
          workspaceId: tableTreeItem.workspaceId,
          regionId: tableTreeItem.regionId,
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
        if (e instanceof Error) {
          vscode.window.showErrorMessage(e.message);
          return;
        }
      }
    };
  },
});
