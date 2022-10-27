import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";
import { getFlattenColumns, validateResourceName } from "../utils";
import { xataColumnDisplayNames } from "../xataWorkspace/xataColumnDisplayNames";
import { xataColumnTypes } from "../xataWorkspace/xataColumnTypes";
import {
  addTableColumn,
  AddTableColumnVariables,
  getBranchDetails,
} from "../xataWorkspace/xataWorkspaceComponents";

/**
 * Command to add a column to selected table
 */
export const addColumnCommand = createTreeItemCommand({
  id: "addColumn",
  title: "Add column",
  contexts: [
    {
      item: "table",
      view: "xataExplorer",
      group: "inline",
    },
    {
      item: "table",
      view: "xataProject",
      group: "inline",
    },
  ],
  icon: "add",
  action(context, refresh, jsonSchemaProvider) {
    return async (tableTreeItem) => {
      let link: AddTableColumnVariables["body"]["link"];

      const selection = await vscode.window.showQuickPick(
        xataColumnTypes
          .filter((i) => i !== "object")
          .map((i) => ({
            type: i,
            label: xataColumnDisplayNames[i],
          })),
        {
          title: "Column type",
        }
      );

      if (!selection) {
        return;
      }

      const { type } = selection;

      if (type === "link") {
        const branchDetails = await getBranchDetails({
          workspaceId: tableTreeItem.workspaceId,
          regionId: tableTreeItem.regionId,
          token: tableTreeItem.scope?.token,
          context,
          pathParams: {
            dbBranchName: `${tableTreeItem.databaseName}:${tableTreeItem.branchName}`,
          },
        });

        if (!branchDetails.success) {
          throw new Error(branchDetails.error.payload.message);
        }

        const { schema } = branchDetails.data;

        const table = await vscode.window.showQuickPick(
          schema.tables.map((t) => t.name),
          {
            title: "Database to link",
          }
        );

        if (!table) {
          return;
        }

        link = { table };
      }

      const existingColumns = getFlattenColumns(tableTreeItem.table.columns);

      const name = await vscode.window.showInputBox({
        prompt: "Enter the name of your column",
        title: "Column name",
        validateInput: validateResourceName("column", existingColumns),
      });

      if (!name) {
        return;
      }

      try {
        await addTableColumn({
          workspaceId: tableTreeItem.workspaceId,
          regionId: tableTreeItem.regionId,
          context,
          body: {
            type,
            name,
            link,
          },
          pathParams: {
            dbBranchName: `${tableTreeItem.databaseName}:${tableTreeItem.branchName}`,
            tableName: tableTreeItem.table.name,
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
