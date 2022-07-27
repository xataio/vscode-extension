import * as vscode from "vscode";
import { VSCodeWorkspaceTreeItem } from "../views/treeItems/TreeItem";
import { TreeItemCommand, WorkspaceNavigationItem } from "../types";
import { createBranch, getBranchList } from "../xata/xataComponents";
import { ValidationError } from "../xata/xataFetcher";
import { validateResourceName } from "../utils";

/**
 * Create a xata branch based on the actual git branch.
 *
 * If the xata branch and the git branch are already in sync, ask for creating a new branch.
 *
 * If the workspace doesn't have any git environment, the branching will be handled with the `XATA_BRANCH` env var instead.
 */
export const createBranchCommand: TreeItemCommand<
  VSCodeWorkspaceTreeItem | WorkspaceNavigationItem
> = {
  id: "createBranch",
  title: "Create branch",
  group: "inline",
  viewItems: ["vscodeWorkspace"],
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

      if (!config) {
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

      if (!currentGitBranch) {
        const newBranchName = await vscode.window.showInputBox({
          prompt: "Enter the name of your branch",
          title: "Branch name",
          validateInput: validateResourceName("branch", existingBranches),
        });

        if (!newBranchName) {
          return;
        }
        await updateXataBranchInDotEnv(workspaceFolder, newBranchName);
        dbBranchName = `${config.databaseName}:${newBranchName}`;
        from =
          existingBranches.length === 1
            ? existingBranches[0]
            : await vscode.window.showQuickPick(existingBranches, {
                title: "Base branch",
              });
      } else if (config.branch !== currentGitBranch) {
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

async function updateXataBranchInDotEnv(
  workspaceFolder: vscode.WorkspaceFolder,
  branchName: string
) {
  const envPath =
    vscode.workspace.getConfiguration().get<string>("xata.envFilePath") ??
    ".env";

  const envFileRaw = await await vscode.workspace.fs.readFile(
    vscode.Uri.joinPath(workspaceFolder.uri, envPath)
  );

  let envFile = envFileRaw.toString();
  if (envFile.match(/^XATA_BRANCH=/gm)) {
    envFile = envFile.replace(
      /^(XATA_BRANCH=)([a-zA-Z0-9_\-~:]+)/gm,
      `$1${branchName}`
    );
  } else {
    envFile += `${envFile.length ? "\n" : ""}XATA_BRANCH=${branchName}`;
  }

  await vscode.workspace.fs.writeFile(
    vscode.Uri.joinPath(workspaceFolder.uri, envPath),
    Buffer.from(envFile)
  );
}
