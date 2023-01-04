import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";
import { validateResourceName } from "../utils";
import {
  createBranch,
  getBranchList,
} from "../xataWorkspace/xataWorkspaceComponents";

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
  ],
  icon: "git-pull-request-create",
  action: (context, refresh) => {
    return async (databaseTreeItem) => {
      const branchList = await getBranchList({
        baseUrl: databaseTreeItem.baseUrl,
        workspaceId: databaseTreeItem.workspaceId,
        regionId: databaseTreeItem.regionId,
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
          workspaceId: databaseTreeItem.workspaceId,
          regionId: databaseTreeItem.regionId,
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
