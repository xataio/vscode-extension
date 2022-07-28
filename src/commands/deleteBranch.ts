import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";
import { deleteBranch } from "../xata/xataComponents";

export const deleteBranchCommand = createTreeItemCommand({
  id: "deleteBranch",
  title: "Delete branch",
  contexts: [{ item: "branch", view: "xataExplorer" }],
  icon: "trash",
  action: (context, refresh) => {
    return async (branchTreeItem) => {
      const confirm = await vscode.window.showInputBox({
        title: `Delete branch`,
        prompt: `Are you sure you want to permanently delete the branch ${branchTreeItem.branch.name}? This action cannot be undone.`,
        validateInput: (value) => {
          if (value !== branchTreeItem.branch.name) {
            return `Please type "${branchTreeItem.branch.name}" to confirm`;
          }
        },
      });

      if (!confirm) {
        return;
      }

      await deleteBranch({
        baseUrl: context.getBaseUrl(branchTreeItem.workspaceId),
        context,
        pathParams: {
          dbBranchName: `${branchTreeItem.databaseName}:${branchTreeItem.branch.name}`,
        },
      });

      return refresh();
    };
  },
});
