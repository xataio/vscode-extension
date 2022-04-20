import * as vscode from "vscode";
import * as commands from "./commands";
import { getContext } from "./context";

export function activate(extContext: vscode.ExtensionContext) {
  const context = getContext(extContext);

  // Register all commands
  Object.values(commands).forEach((command) => {
    extContext.subscriptions.push(
      vscode.commands.registerCommand(command.id, command.action(context))
    );
  });
}

export function deactivate() {}
