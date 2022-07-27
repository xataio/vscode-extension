import * as vscode from "vscode";
import { BranchTreeItem, TableTreeItem } from "../views/treeItems/TreeItem";
import { TreeItemCommand } from "../types";
import { deleteBranch, deleteTable } from "../xata/xataComponents";

export const deleteBranchCommand: TreeItemCommand<BranchTreeItem> = {
  id: "deleteBranch",
  title: "Delete branch",
  viewItems: ["branch"],
  icon: "trash",
  views: ["xataExplorer"],
  type: "treeItem",
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
};
