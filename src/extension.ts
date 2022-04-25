import * as vscode from "vscode";
import * as commands from "./commands";
import { getContext } from "./context";
import { XataExplorer } from "./xataExplorer";
import { XataRecordsProvider } from "./xataRecordsProvider";

export function activate(extensionContext: vscode.ExtensionContext) {
  const xataExplorer = new XataExplorer(extensionContext);
  const context = getContext(extensionContext);

  const xataRecords = new XataRecordsProvider(context);
  extensionContext.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider("xata", xataRecords)
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
