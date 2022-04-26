import * as vscode from "vscode";
import * as commands from "./commands";
import { getContext } from "./context";
import { XataExplorer } from "./xataExplorer";
import { XataJsonSchemaProvider } from "./xataJsonSchemaProvider";

export function activate(extensionContext: vscode.ExtensionContext) {
  const xataExplorer = new XataExplorer(extensionContext);
  const context = getContext(extensionContext);

  const xataJsonSchema = new XataJsonSchemaProvider(context);
  extensionContext.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider("xata", xataJsonSchema)
  );

  // Register all commands
  Object.values(commands).forEach((command) => {
    extensionContext.subscriptions.push(
      vscode.commands.registerCommand(
        command.id,
        command.action(context, xataExplorer)
      )
    );
  });

  // Handle configuration change
  vscode.workspace.onDidChangeConfiguration((event) => {
    if (
      event.affectsConfiguration("xata.hideBranchLevel") ||
      event.affectsConfiguration("xata.enableDatabaseColor")
    ) {
      xataExplorer.refresh();
    }
  });
}

export function deactivate() {}
