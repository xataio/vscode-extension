import * as vscode from "vscode";
import { CONFIG_FILES } from "../context";
import { StandAloneCommand } from "../types";
import {
  VSCodeWorkspaceTreeItem,
  Workspace,
  WorkspaceTreeItem,
} from "../views/treeItems/TreeItem";
import {
  getDatabaseList,
  getWorkspacesList,
} from "../xataCore/xataCoreComponents";
import { addDatabaseCommand } from "./addDatabase";
import { loginCommand } from "./login";

// Trigger from welcome view (one vscode workspace case)
type WelcomeViewAction = undefined;

/**
 * Command to init a workspace (create or modify a .env/.xatarc)
 */
export const initWorkspaceCommand: StandAloneCommand<
  WelcomeViewAction | VSCodeWorkspaceTreeItem
> = {
  id: "initWorkspace",
  title: "Initialize workspace",
  type: "standAlone",
  action(context, refresh, jsonSchemaProvider) {
    return async (item) => {
      if (!(await context.getToken())) {
        await loginCommand.action(
          context,
          refresh,
          jsonSchemaProvider
        )("initWorkspace");
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

      const config = await context.getVSCodeWorkspaceEnvConfig(
        workspaceFolder.uri
      );

      if (!config) {
        // choose workspace
        const workspacesList = await getWorkspacesList({
          context,
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
          pathParams: {
            workspaceId: selectedWorkspace.id,
          },
          context,
        });

        if (!databaseList.success) {
          throw new Error(databaseList.error.payload.message);
        }

        let selectedDatabaseName: string | undefined;
        let selectedDatabaseRegion: string | undefined;

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
          selectedDatabaseRegion = res.regionId;
        } else if (databases.length === 1) {
          selectedDatabaseName = databases[0].name;
          selectedDatabaseRegion = databases[0].region;
        } else {
          const databaseChoice = await vscode.window.showQuickPick([
            {
              label: "$(add) New database",
              name: createDatabaseId,
              regionId: "eu-west-1",
            },
            ...databases.map((i) => ({
              label: `$(database) ${i.name}`,
              name: i.name,
              regionId: i.region,
            })),
          ]);

          if (typeof databaseChoice?.name === "string") {
            selectedDatabaseName = databaseChoice.name;
            selectedDatabaseRegion = databaseChoice.regionId;
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
            selectedDatabaseRegion = res.regionId;
          } else {
            return;
          }
        }

        const databaseURL = `${context
          .getWorkspaceBaseUrl()
          .replace("{workspaceId}", selectedWorkspace.id)
          .replace(
            "{regionId}",
            selectedDatabaseRegion
          )}/db/${selectedDatabaseName}`;

        // create .xatarc file
        const xataRcUri = vscode.Uri.joinPath(
          workspaceFolder.uri,
          CONFIG_FILES[0]
        );
        const xataRcFile = await readFileSafe(xataRcUri);
        const writeInitialFile = async () =>
          await vscode.workspace.fs.writeFile(
            xataRcUri,
            Buffer.from(JSON.stringify({ databaseURL }, null, 2))
          );

        if (xataRcFile.length) {
          try {
            const xataRcData = JSON.parse(
              Buffer.from(xataRcFile).toString("utf-8")
            );
            xataRcData.databaseURL = databaseURL;
            await vscode.workspace.fs.writeFile(
              xataRcUri,
              Buffer.from(JSON.stringify(xataRcData, null, 2))
            );
          } catch {
            await writeInitialFile();
          }
        } else {
          await writeInitialFile();
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
            }XATA_API_KEY=${await context.getToken()}`
          ),
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
