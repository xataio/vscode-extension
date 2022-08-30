import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";
import { createBranch, getBranchList } from "../xata/xataComponents";
import { validateResourceName } from "../utils";

/**
 * Add a branch in a context of the xata explorer (when all the others branches is visible)
 */
export const addBranchCommand = createTreeItemCommand({
  id: "addBranch",
  title: "Add branch",
  contexts: [
    {
      item: "database",
      view: "xataExplorer",
      group: "inline",
    },
    {
      item: "oneBranchDatabase",
      view: "xataExplorer",
      group: "inline",
    },
  ],
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
        validateInput: validateResourceName("branch", existingBranches),
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
        if (e instanceof Error) {
          vscode.window.showErrorMessage(e.message);
          return;
        }
      }
    };
  },
});
