import * as vscode from "vscode";
import { WorkspaceTreeItem } from "../views/treeItems/TreeItem";
import { TreeItemCommand } from "../types";
import { slugify } from "../utils";
import { createDatabase, getDatabaseList } from "../xata/xataComponents";
import { ValidationError } from "../xata/xataFetcher";

/**
 * Command to add a database to a selected workspace
 */
export const addDatabaseCommand: TreeItemCommand<WorkspaceTreeItem> = {
  id: "addDatabase",
  type: "treeItem",
  icon: "add",
  action(context, explorer) {
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
        await createDatabase({
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

        return explorer.refresh();
      } catch (e) {
        if (e instanceof ValidationError) {
          return vscode.window.showErrorMessage(e.details);
        }
        if (e instanceof Error) {
          return vscode.window.showErrorMessage(e.message);
        }
      }
    };
  },
};
