import * as vscode from "vscode";
import { Command } from "../types";
import { slugify } from "../utils";
import { createWorkspace } from "../xata/xataComponents";

/**
 * Command to add a workspace
 */
export const addWorkspaceCommand: Command = {
  id: "xata.addWorkspace",
  type: "global",
  hideFromCommandPalette: true,
  icon: "add",
  action(context, explorer) {
    return async () => {
      const name = await vscode.window.showInputBox({
        prompt: "Enter the name of your workspace",
        title: "Workspace name",
      });

      if (!name) {
        return;
      }

      await createWorkspace({
        baseUrl: context.getBaseUrl(),
        context,
        body: {
          name,
          slug: slugify(name),
        },
      });

      return explorer.refresh();
    };
  },
};
