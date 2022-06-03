import * as vscode from "vscode";
import * as commands from "./commands";
import { getContext } from "./context";
import { CurrentDatabase } from "./views/currentDatabase";
import { XataExplorer } from "./views/xataExplorer";
import { XataJsonSchemaProvider } from "./xataJsonSchemaProvider";

export function activate(extensionContext: vscode.ExtensionContext) {
  new CurrentDatabase(extensionContext);
  const xataExplorer = new XataExplorer(extensionContext);
  const context = getContext(extensionContext);

  const xataJsonSchema = new XataJsonSchemaProvider(context);
  extensionContext.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider("xata", xataJsonSchema)
  );

  // Register all commands
  Object.values(commands).forEach((command) => {
    if (command.type === "global" && command.inPalette) {
      extensionContext.subscriptions.push(
        vscode.commands.registerCommand(
          `xata.palette.${command.id}`,
          command.action(context, xataExplorer, xataJsonSchema)
        )
      );
    }
    extensionContext.subscriptions.push(
      vscode.commands.registerCommand(
        `xata.${command.id}`,
        command.action(context, xataExplorer, xataJsonSchema)
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
