import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";
import { validateResourceName } from "../utils";
import {
  createBranch,
  getBranchList,
} from "../xataWorkspace/xataWorkspaceComponents";

/**
 * Create a xata branch based on the actual git branch.
 *
 * If the xata branch and the git branch are already in sync, ask for creating a new branch.
 *
 * If the workspace doesn't have any git environment, the branching will be handled with the `XATA_BRANCH` env var instead.
 */
export const createBranchCommand = createTreeItemCommand({
  id: "createBranch",
  title: "Create branch",
  contexts: [
    {
      item: "vscodeWorkspace",
      view: "xataProject",
      group: "inline",
    },
    {
      item: "workspaceNavigationItem",
    },
  ],
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

      if (!config) {
        return;
      }

      const branchList = await getBranchList({
        baseUrl: config.baseUrl,
        workspaceId: config.workspaceId,
        regionId: config.regionId,
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

      const newBranch = Symbol("new branch");

      const selection = await vscode.window.showQuickPick(
        [
          { type: newBranch, label: "$(add) Create new branch…" },
          ...existingBranches.map((b) => ({
            type: b,
            label: `$(git-branch) ${b}`,
          })),
        ],
        {
          title: " Select a branch or create one",
        }
      );

      if (!selection) return;
      if (selection.type === newBranch) {
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

        if (!from) {
          return;
        }

        try {
          await createBranch({
            baseUrl: config.baseUrl,
            workspaceId: config.workspaceId,
            regionId: config.regionId,
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
          if (e instanceof Error) {
            vscode.window.showErrorMessage(e.message);
            return;
          }
        }
      } else if (typeof selection.type === "string") {
        await updateXataBranchInDotEnv(workspaceFolder, selection.type);
        return refresh();
      }
    };
  },
});

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
