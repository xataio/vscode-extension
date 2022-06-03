import * as vscode from "vscode";
import {
  DatabaseTreeItem,
  OneBranchDatabaseItem,
} from "../views/treeItems/TreeItem";
import { TreeItemCommand } from "../types";
import { createBranch, getBranchList } from "../xata/xataComponents";
import { ValidationError } from "../xata/xataFetcher";

export const addBranchCommand: TreeItemCommand<
  DatabaseTreeItem | OneBranchDatabaseItem
> = {
  id: "addBranch",
  type: "treeItem",
  icon: "git-pull-request-create",
  action: (context, refresh) => {
    return async (databaseTreeItem) => {
      const branchList = await getBranchList({
        baseUrl: context.getBaseUrl(databaseTreeItem.workspaceId),
        context: context,
        pathParams: {
          dbName: databaseTreeItem.database.name,
        },
      });

      if (!branchList.success) {
        throw new Error(branchList.error.payload.message);
      }

      const { branches } = branchList.data;

      const existingBranches = branches.map((b) => b.name);

      const name = await vscode.window.showInputBox({
        prompt: "Enter the name of your branch",
        title: "Branch name",
        validateInput: (value) => {
          const isValid = Boolean(/^[a-zA-Z0-9_-~:]+$/.exec(value));
          if (existingBranches.includes(value)) {
            return "branch already exists";
          }

          return isValid
            ? undefined
            : "only alphanumerics and '-', '_', or '~' are allowed";
        },
      });

      if (!name) {
        return;
      }

      const from =
        existingBranches.length === 1
          ? existingBranches[0]
          : await vscode.window.showQuickPick(existingBranches);

      if (!from) {
        return;
      }

      try {
        await createBranch({
          baseUrl: context.getBaseUrl(databaseTreeItem.workspaceId),
          context,
          pathParams: {
            dbBranchName: `${databaseTreeItem.database.name}:${name}`,
          },
          queryParams: {
            from,
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
