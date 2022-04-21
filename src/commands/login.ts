import * as vscode from "vscode";
import { Command } from "../types";

/**
 * Command to ask for xata token
 */
export const loginCommand: Command = {
  id: "xata.login",
  action(context, explorer) {
    return async () => {
      const token = await vscode.window.showInputBox({
        prompt: "Paste your xata personal access token",
        ignoreFocusOut: true,
      });

      if (token) {
        await context.setToken(token);
        return explorer.refresh();
      }
    };
  },
};

// TODO:
// - list workspaces
