import * as vscode from "vscode";
import * as commands from "./commands";
import { getContext } from "./context";
import { XataWorkspace } from "./views/xataWorkspace";
import { XataExplorer } from "./views/xataExplorer";
import { XataJsonSchemaProvider } from "./xataJsonSchemaProvider";
import { watchWorkspaceConfig } from "./watchWorkspaceConfig";

export function activate(extensionContext: vscode.ExtensionContext) {
  const xataWorkspace = new XataWorkspace(extensionContext);
  const xataExplorer = new XataExplorer(extensionContext);

  const refresh = (scope?: "explorer" | "workspace") => {
    if (scope === "explorer") {
      xataExplorer.refresh();
    } else if (scope === "workspace") {
      xataWorkspace.refresh();
    } else {
      xataExplorer.refresh();
      xataWorkspace.refresh();
    }
  };

  // Expose `xata.treeViews` from `package.json:view/item/context` when clauses
  vscode.commands.executeCommand("setContext", "xata.treeViews", [
    "xataExplorer",
    "xataWorkspace",
  ]);

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
          command.action(context, refresh, xataJsonSchema)
        )
      );
    }
    extensionContext.subscriptions.push(
      vscode.commands.registerCommand(
        `xata.${command.id}`,
        command.action(context, refresh, xataJsonSchema)
      )
    );
  });

  // Handle configuration change
  extensionContext.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (
        event.affectsConfiguration("xata.hideBranchLevel") ||
        event.affectsConfiguration("xata.enableDatabaseColor")
      ) {
        xataExplorer.refresh();
      }

      if (event.affectsConfiguration("xata.envFilePath")) {
        xataWorkspace.refresh();
      }
    })
  );

  // Handle config files (.env) changes
  extensionContext.subscriptions.push(
    watchWorkspaceConfig(() => xataWorkspace.refresh())
  );
}

export function deactivate() {}
