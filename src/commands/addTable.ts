import * as vscode from "vscode";
import {
  BranchTreeItem,
  OneBranchDatabaseItem,
} from "../views/treeItems/TreeItem";
import { TreeItemCommand } from "../types";
import { createTable, getBranchDetails } from "../xata/xataComponents";
import { ValidationError } from "../xata/xataFetcher";

// Trigger from the top view navigation level
type WorkspaceNavigationItem = undefined;

export const addTableCommand: TreeItemCommand<
  OneBranchDatabaseItem | BranchTreeItem | WorkspaceNavigationItem
> = {
  id: "addTable",
  type: "treeItem",
  icon: "empty-window",
  action: (context, refresh) => {
    return async (branchTreeItem) => {
      let baseUrl = "";
      let dbBranchName = "";
      let token: string | undefined = undefined;

      if (!branchTreeItem) {
        if (
          !vscode.workspace.workspaceFolders ||
          vscode.workspace.workspaceFolders.length > 1
        ) {
          throw new Error(
            "[dev] This action should not be available when the user have multiple workspaces opened"
          );
        }
        const config = await context.getVSCodeWorkspaceEnvConfig(
          vscode.workspace.workspaceFolders[0].uri
        );
        baseUrl = config.baseUrl;
        dbBranchName = `${config.databaseName}:${config.branch}`;
        token = config.apiKey;
      } else {
        baseUrl = context.getBaseUrl(branchTreeItem.workspaceId);
        dbBranchName = `${branchTreeItem.databaseName}:${branchTreeItem.branchName}`;
      }

      const branchDetails = await getBranchDetails({
        baseUrl,
        context: context,
        token,
        pathParams: {
          dbBranchName,
        },
      });

      if (!branchDetails.success) {
        throw new Error(branchDetails.error.payload.message);
      }

      const { schema } = branchDetails.data;
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
          baseUrl,
          context,
          token,
          pathParams: {
            dbBranchName,
            tableName: name,
          },
        });

        return refresh();
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
