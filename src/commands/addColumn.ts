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

      const existingColumns = getFlattenColumns(tableTreeItem.table.columns);

      const name = await vscode.window.showInputBox({
        prompt: "Enter the name of your column",
        title: "Column name",
        validateInput: validateResourceName("column", existingColumns),
      });

      if (!name) {
        return;
      }

      const selection = await vscode.window.showQuickPick(
        xataColumnTypes
          .filter((i) => i !== "object")
          .map((i) => ({
            type: i,
            label: xataColumnDisplayNames[i],
          })),
        {
          title: "Column type",
          ignoreFocusOut: true,
        }
      );

      if (!selection) {
        return;
      }

      const { type } = selection;

      if (type === "link") {
        const branchDetails = await getBranchDetails({
          baseUrl: tableTreeItem.baseUrl,
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
            ignoreFocusOut: true,
          }
        );

        if (!table) {
          return;
        }

        link = { table };
      }

      // Constraints
      let notNull;
      let unique;
      let defaultValue: any = undefined;

      enum ColumnOption {
        none,
        notNull,
        unique,
      }

      const choices = [{ label: "-", value: ColumnOption.none }];

      // `link` doesn’t support `not null` constrain for now
      if (type !== "link") {
        choices.push({ label: "Not null", value: ColumnOption.notNull });
      }

      // `text` doesn’t support `unique` constrain for now
      if (type !== "text") {
        choices.push({ label: "Unique", value: ColumnOption.unique });
      }

      // `multiple` doesn’t support any constrain for now
      if (type !== "multiple") {
        const options = await vscode.window.showQuickPick(choices, {
          title: "Constraints",
          ignoreFocusOut: true,
        });

        switch (options?.value) {
          case ColumnOption.notNull:
            notNull = true;
            break;
          case ColumnOption.unique:
            unique = true;
            break;
        }
      }

      if (notNull) {
        switch (type) {
          case "bool":
            defaultValue = await vscode.window
              .showQuickPick(
                [
                  { label: "true", value: "true" },
                  { label: "false", value: "false" },
                ],
                {
                  title: "Default value",
                  ignoreFocusOut: true,
                }
              )
              .then((v) => v?.value || false);
            break;
          case "datetime":
            defaultValue = await vscode.window.showInputBox({
              title: "Default value",
              validateInput: (v) =>
                v === "now" ||
                /^((?:(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}(?:\.\d+)?))(Z|[\+-]\d{2}:\d{2})?)$/.exec(
                  v
                )
                  ? null
                  : "The value should be a valid datetime (RFC3339) or `now`",
            });
            break;
          case "float":
          case "int":
            defaultValue =
              (await vscode.window.showInputBox({
                title: "Default value",
                validateInput: (v) =>
                  Number.isFinite(parseFloat(v))
                    ? null
                    : "The value should be a valid number",
              })) || 0;
            break;
          case "email":
            defaultValue = await vscode.window.showInputBox({
              title: "Default value",
              validateInput: (v) =>
                v.includes("@") ? null : "The value should be a valid email",
            });
            break;
          case "string":
          case "text":
            defaultValue =
              (await vscode.window.showInputBox({
                title: "Default value",
              })) || "";
            break;
        }
      }

      try {
        await addTableColumn({
          baseUrl: tableTreeItem.baseUrl,
          workspaceId: tableTreeItem.workspaceId,
          regionId: tableTreeItem.regionId,
          token: tableTreeItem.scope?.token,
          context,
          body: {
            type,
            name,
            defaultValue,
            link,
            notNull,
            unique,
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
