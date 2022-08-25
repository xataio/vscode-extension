import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";
import { slugify } from "../utils";
import { createDatabase, getDatabaseList } from "../xata/xataComponents";

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
        baseUrl: context.getBaseUrl(workspaceTreeItem.workspace.id),
        context: context,
      });

      if (!databaseList.success) {
        throw new Error(databaseList.error.payload.message);
      }

      const { databases } = databaseList.data;

      const existingDatabases = databases?.map((d) => d.name) || [];

      const name = await vscode.window.showInputBox({
        prompt: "Enter the name of your database",
        title: "Database name",
        validateInput: (value) => {
          if (existingDatabases.includes(slugify(value))) {
            return "database already exists";
          }
        },
      });

      if (!name) {
        return;
      }

      // TODO: Make this picker colorful 🌈
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
          baseUrl: context.getBaseUrl(workspaceTreeItem.workspace.id),
          context,
          pathParams: {
            dbName: slugify(name),
          },
          body: {
            displayName: name,
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
