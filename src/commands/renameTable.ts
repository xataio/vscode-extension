import * as vscode from "vscode";
import { TableTreeItem } from "../TreeItem";
import { TreeItemCommand } from "../types";
import { slugify } from "../utils";
import {
  getBranchDetails,
  updateTable,
  updateWorkspace,
} from "../xata/xataComponents";
import { ValidationError } from "../xata/xataFetcher";

export const renameTableCommand: TreeItemCommand<TableTreeItem> = {
  id: "xata.renameTable",
  icon: "edit",
  type: "treeItem",
  action: (context, explorer) => {
    return async (tableTreeItem) => {
      const { schema } = await getBranchDetails({
        baseUrl: context.getBaseUrl(tableTreeItem.workspace.id),
        context: context,
        pathParams: {
          dbBranchName: `${tableTreeItem.database.name}:${tableTreeItem.branch.name}`,
        },
      });

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
          baseUrl: context.getBaseUrl(tableTreeItem.workspace.id),
          context,
          pathParams: {
            dbBranchName: `${tableTreeItem.database.name}:${tableTreeItem.branch.name}`,
            tableName: tableTreeItem.table.name,
          },
          body: {
            name,
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
