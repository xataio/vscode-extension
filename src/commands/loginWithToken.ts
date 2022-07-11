import * as vscode from "vscode";
import { Command } from "../types";

/**
 * Command to ask for xata token
 */
export const loginWithTokenCommand: Command = {
  id: "loginWithToken",
  type: "global",
  inPalette: true,
  action(context, refresh) {
    return async () => {
      const token = await vscode.window.showInputBox({
        prompt: "Paste your xata personal access token",
        ignoreFocusOut: true,
      });

      if (token) {
        await context.setToken(token);
        return refresh("explorer");
      }
    };
  },
};
