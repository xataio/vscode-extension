import * as vscode from "vscode";
import { Command, StandAloneCommand, TreeItemCommand } from "../types";
import {
  VSCodeWorkspaceTreeItem,
  Workspace,
  WorkspaceTreeItem,
} from "../views/treeItems/TreeItem";
import { getDatabaseList, getWorkspacesList } from "../xata/xataComponents";
import { addDatabaseCommand } from "./addDatabase";
import { loginCommand } from "./login";

// Trigger from welcome view (one vscode workspace case)
type WelcomeViewAction = undefined;

/**
 * Command to init a workspace (create or modify a .env)
 */
export const initWorkspaceCommand: StandAloneCommand<
  WelcomeViewAction | VSCodeWorkspaceTreeItem
> = {
  id: "initWorkspace",
  type: "standAlone",
  action(context, refresh, jsonSchemaProvider) {
    return async (item) => {
      if (!(await context.getToken())) {
        await loginCommand.action(context, refresh, jsonSchemaProvider)();
      }

      let workspaceFolder: vscode.WorkspaceFolder;

      if (item) {
        workspaceFolder = item.workspaceFolder;
      } else {
        if (
          !vscode.workspace.workspaceFolders ||
          vscode.workspace.workspaceFolders.length !== 1
        ) {
          return;
        }
        workspaceFolder = vscode.workspace.workspaceFolders[0];
      }

      // choose workspace
      const workspacesList = await getWorkspacesList({
        baseUrl: context.getBaseUrl(),
        context: context,
      });

      if (!workspacesList.success) {
        throw new Error(workspacesList.error.payload.message);
      }

      const { workspaces } = workspacesList.data;
      let selectedWorkspace: undefined | Workspace;

      if (workspaces.length === 1) {
        selectedWorkspace = workspaces[0];
      } else {
        const workspaceChoice = await vscode.window.showQuickPick(
          workspaces.map((i) => ({
            label: `$(rocket) ${i.name}`,
            payload: i,
          }))
        );

        if (workspaceChoice) {
          selectedWorkspace = workspaceChoice.payload;
        } else {
          return;
        }
      }

      // choose database
      const databaseList = await getDatabaseList({
        baseUrl: context.getBaseUrl(selectedWorkspace.id),
        context: context,
      });

      if (!databaseList.success) {
        throw new Error(databaseList.error.payload.message);
      }

      let selectedDatabaseName: string | undefined;

      const { databases } = databaseList.data;
      const createDatabaseId = Symbol();

      if (!databases) {
        const res = await addDatabaseCommand.action(
          context,
          refresh,
          jsonSchemaProvider
        )(
          new WorkspaceTreeItem(
            `$(rocket) ${selectedWorkspace.name}`,
            vscode.TreeItemCollapsibleState.Collapsed,
            selectedWorkspace
          )
        );

        if (!res || !res.success) {
          return;
        }
        selectedDatabaseName = res.data.databaseName;
      } else if (databases.length === 1) {
        selectedDatabaseName = databases[0].name;
      } else {
        const databaseChoice = await vscode.window.showQuickPick([
          { label: "$(add) New database", name: createDatabaseId },
          ...databases.map((i) => ({
            label: `$(database) ${i.displayName}`,
            name: i.name,
          })),
        ]);

        if (typeof databaseChoice?.name === "string") {
          selectedDatabaseName = databaseChoice.name;
        } else if (databaseChoice?.name === createDatabaseId) {
          const res = await addDatabaseCommand.action(
            context,
            refresh,
            jsonSchemaProvider
          )(
            new WorkspaceTreeItem(
              selectedWorkspace.name,
              vscode.TreeItemCollapsibleState.Collapsed,
              selectedWorkspace
            )
          );

          if (!res || !res.success) {
            return;
          }
          selectedDatabaseName = res.data.databaseName;
        } else {
          return;
        }
      }

      // create .env file
      const envPath =
        vscode.workspace.getConfiguration().get<string>("xata.envFilePath") ??
        ".env";

      const envFile = await readFileSafe(
        vscode.Uri.joinPath(workspaceFolder.uri, envPath)
      );

      await vscode.workspace.fs.writeFile(
        vscode.Uri.joinPath(workspaceFolder.uri, envPath),
        Buffer.concat([
          envFile,
          Buffer.from(
            `${
              envFile.length ? "\n" : ""
            }XATA_DATABASE_URL=${context.getBaseUrl(
              selectedWorkspace.id
            )}/db/${selectedDatabaseName}`
          ),
          Buffer.from(`\nXATA_API_KEY=${await context.getToken()}`),
        ])
      );

      refresh();
    };
  },
};

async function readFileSafe(uri: vscode.Uri) {
  try {
    return await vscode.workspace.fs.readFile(uri);
  } catch {
    return Promise.resolve(new Uint8Array());
  }
}
