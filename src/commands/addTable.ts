import * as vscode from "vscode";
import { BranchTreeItem, OneBranchDatabaseItem } from "../TreeItem";
import { TreeItemCommand } from "../types";
import { createTable, getBranchDetails } from "../xata/xataComponents";
import { ValidationError } from "../xata/xataFetcher";

export const addTableCommand: TreeItemCommand<
  OneBranchDatabaseItem | BranchTreeItem
> = {
  id: "xata.addTable",
  type: "treeItem",
  icon: "empty-window",
  action: (context, explorer) => {
    return async (branchTreeItem) => {
      const { schema } = await getBranchDetails({
        baseUrl: context.getBaseUrl(branchTreeItem.workspace.id),
        context: context,
        pathParams: {
          dbBranchName: `${branchTreeItem.database.name}:${branchTreeItem.branch.name}`,
        },
      });

      const existingTables = schema.tables.map((t) => t.name);

      const name = await vscode.window.showInputBox({
        prompt: "Enter the name of your table",
        title: "Table name",
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
        await createTable({
          baseUrl: context.getBaseUrl(branchTreeItem.workspace.id),
          context,
          pathParams: {
            dbBranchName: `${branchTreeItem.database.name}:${branchTreeItem.branch.name}`,
            tableName: name,
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
