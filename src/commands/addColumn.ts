import * as vscode from "vscode";
import { TableTreeItem } from "../TreeItem";
import { TreeItemCommand } from "../types";
import { xataColumnTypes } from "../xata/xataColumnTypes";
import {
  addTableColumn,
  AddTableColumnVariables,
  getBranchDetails,
} from "../xata/xataComponents";
import { ValidationError } from "../xata/xataFetcher";
import { Column } from "../xata/xataSchemas";

/**
 * Command to add a column to selected table
 */
export const addColumnCommand: TreeItemCommand<TableTreeItem> = {
  id: "xata.addColumn",
  icon: "add",
  action(context, explorer) {
    return async (tableTreeItem) => {
      let link: AddTableColumnVariables["body"]["link"];

      const type = (await vscode.window.showQuickPick(xataColumnTypes, {
        title: "Column type",
      })) as Column["type"] | undefined;

      if (!type) {
        return;
      }

      if (type === "link") {
        const { schema } = await getBranchDetails({
          baseUrl: context.getBaseUrl(tableTreeItem.workspace.id),
          context,
          pathParams: {
            dbBranchName: `${tableTreeItem.database.name}:${tableTreeItem.branch.name}`,
          },
        });
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
        validateInput: (value) => {
          const isValid = Boolean(/^[a-zA-Z0-9_-~:]+$/.exec(value));
          if (existingColumns.includes(value)) {
            return "column already exists";
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
        await addTableColumn({
          baseUrl: context.getBaseUrl(tableTreeItem.workspace.id),
          context,
          body: {
            type,
            name,
            link,
          },
          pathParams: {
            dbBranchName: `${tableTreeItem.database.name}:${tableTreeItem.branch.name}`,
            tableName: tableTreeItem.table.name,
          },
        });

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
