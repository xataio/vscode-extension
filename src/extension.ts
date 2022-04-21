import * as vscode from "vscode";
import * as commands from "./commands";
import { getContext } from "./context";
import { XataExplorer } from "./xataExplorer";

export function activate(extensionContext: vscode.ExtensionContext) {
  const xataExplorer = new XataExplorer(extensionContext);
  const context = getContext(extensionContext);

  // Register all commands
  Object.values(commands).forEach((command) => {
    extensionContext.subscriptions.push(
      vscode.commands.registerCommand(
        command.id,
        command.action(context, xataExplorer)
      )
    );
  });
}

export function deactivate() {}
