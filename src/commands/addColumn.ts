import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";
import { xataColumnTypes } from "../xata/xataColumnTypes";
import {
  addTableColumn,
  AddTableColumnVariables,
  getBranchDetails,
} from "../xata/xataComponents";
import { ValidationError } from "../xata/xataFetcher";
import { Column } from "../xata/xataSchemas";
import { validateResourceName } from "../utils";

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

      const type = (await vscode.window.showQuickPick(xataColumnTypes, {
        title: "Column type",
      })) as Column["type"] | undefined;

      if (!type) {
        return;
      }

      if (type === "link") {
        const branchDetails = await getBranchDetails({
          baseUrl:
            tableTreeItem.scope?.baseUrl ??
            context.getBaseUrl(tableTreeItem.workspaceId),
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

      const existingColumns = tableTreeItem.table.columns.map((c) => c.name);

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
          baseUrl:
            tableTreeItem.scope?.baseUrl ??
            context.getBaseUrl(tableTreeItem.workspaceId),
          token: tableTreeItem.scope?.token,
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
});
