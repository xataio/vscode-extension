import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";
import { validateResourceName } from "../utils";
import {
  createDatabase,
  getDatabaseList,
  listRegions,
} from "../xataCore/xataCoreComponents";

/**
 * Command to add a database to a selected workspace
 */
export const addDatabaseCommand = createTreeItemCommand({
  id: "addDatabase",
  title: "Add database",
  contexts: [
    {
      item: "workspace",
      view: "xataExplorer",
      group: "inline",
    },
  ],
  icon: "add",
  action(context, refresh) {
    return async (workspaceTreeItem) => {
      const databaseList = await getDatabaseList({
        pathParams: {
          workspaceId: workspaceTreeItem.workspace.id,
        },
        context,
      });

      if (!databaseList.success) {
        throw new Error(databaseList.error.payload.message);
      }

      const { databases } = databaseList.data;

      const existingDatabases = databases?.map((d) => d.name) || [];

      const name = await vscode.window.showInputBox({
        prompt: "Enter the name of your database",
        title: "Database name",
        validateInput: validateResourceName("database", existingDatabases),
      });

      if (!name) {
        return;
      }

      const regions = await listRegions({
        context,
        pathParams: {
          workspaceId: workspaceTreeItem.workspace.id,
        },
      });

      if (!regions.success) {
        return;
      }

      const region = await vscode.window.showQuickPick(
        regions.data.regions.map((r) => ({ label: r.id, value: r.id })),
        {
          title: "Select your region",
        }
      );

      if (!region) {
        return;
      }

      const color = await vscode.window.showQuickPick(
        [
          { label: "Gray", value: "xata-gray" },
          { label: "Orange", value: "xata-orange" },
          { label: "Green", value: "xata-green" },
          { label: "Blue", value: "xata-blue" },
          { label: "Cyan", value: "xata-cyan" },
          { label: "Purple", value: "xata-purple" },
          { label: "Pink", value: "xata-pink" },
        ],
        {
          title: "Pick a color",
        }
      );

      if (!color) {
        return;
      }

      try {
        const response = await createDatabase({
          context,
          pathParams: {
            workspaceId: workspaceTreeItem.workspace.id,
            dbName: name,
          },
          body: {
            region: region.value,
            ui: {
              color: color.value,
            },
          },
        });

        refresh();
        return response;
      } catch (e) {
        if (e instanceof Error) {
          vscode.window.showErrorMessage(e.message);
        }
      }
    };
  },
});
