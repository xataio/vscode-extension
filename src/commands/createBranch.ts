import * as vscode from "vscode";
import { VSCodeWorkspaceTreeItem } from "../views/treeItems/TreeItem";
import { TreeItemCommand, WorkspaceNavigationItem } from "../types";
import { createBranch, getBranchList } from "../xata/xataComponents";
import { ValidationError } from "../xata/xataFetcher";

/**
 * Create a xata branch based on the actual git branch.
 *
 * If the xata branch and the git branch are already in sync, ask for creating a new branch.
 */
export const createBranchCommand: TreeItemCommand<
  VSCodeWorkspaceTreeItem | WorkspaceNavigationItem
> = {
  id: "createBranch",
  type: "treeItem",
  views: ["xataWorkspace"],
  icon: "git-pull-request-create",
  action: (context, refresh) => {
    return async (treeItem) => {
      if (!vscode.workspace.workspaceFolders) {
        console.log("no workspace");
        return;
      }

      const workspaceFolder = treeItem
        ? treeItem.workspaceFolder
        : vscode.workspace.workspaceFolders[0];

      const config = await context.getVSCodeWorkspaceEnvConfig(
        workspaceFolder.uri
      );

      const currentGitBranch = await context.getGitBranch(workspaceFolder.uri);

      if (!config || !currentGitBranch) {
        return;
      }

      const branchList = await getBranchList({
        baseUrl: config.baseUrl,
        token: config.apiKey,
        context,
        pathParams: {
          dbName: config.databaseName,
        },
      });
      if (!branchList.success) {
        throw new Error(branchList.error.payload.message);
      }

      const { branches } = branchList.data;

      const existingBranches = branches.map((b) => b.name);
      let from: string | undefined;

      let dbBranchName: string;

      if (config.branch !== currentGitBranch) {
        dbBranchName = `${config.databaseName}:${currentGitBranch}`;
        from =
          existingBranches.length === 1
            ? existingBranches[0]
            : await vscode.window.showQuickPick(existingBranches, {
                title: "Base branch",
              });
      } else {
        from = config.branch;
        await vscode.commands.executeCommand("git.checkout");
        const newBranch = await context.getGitBranch(workspaceFolder.uri);
        dbBranchName = `${config.databaseName}:${newBranch}`;
      }

      if (!from) {
        return;
      }

      try {
        await createBranch({
          baseUrl: config.baseUrl,
          token: config.apiKey,
          context,
          pathParams: {
            dbBranchName,
          },
          queryParams: {
            from,
          },
        });

        return refresh();
      } catch (e) {
        if (e instanceof ValidationError) {
          vscode.window.showErrorMessage(e.details);
          return;
        }
        if (e instanceof Error) {
          vscode.window.showErrorMessage(e.message);
          return;
        }
      }
    };
  },
};
