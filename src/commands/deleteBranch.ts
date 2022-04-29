import * as vscode from "vscode";
import { BranchTreeItem, TableTreeItem } from "../TreeItem";
import { TreeItemCommand } from "../types";
import { deleteBranch, deleteTable } from "../xata/xataComponents";

export const deleteBranchCommand: TreeItemCommand<BranchTreeItem> = {
  id: "deleteBranch",
  icon: "trash",
  type: "treeItem",
  action: (context, explorer) => {
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
        baseUrl: context.getBaseUrl(branchTreeItem.workspace.id),
        context,
        pathParams: {
          dbBranchName: `${branchTreeItem.database.name}:${branchTreeItem.branch.name}`,
        },
      });

      return explorer.refresh();
    };
  },
};
