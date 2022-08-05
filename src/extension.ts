import * as vscode from "vscode";
import * as commands from "./commands";
import { getContext } from "./context";
import { XataProject } from "./views/xataProject";
import { XataExplorer } from "./views/xataExplorer";
import { XataJsonSchemaProvider } from "./xataJsonSchemaProvider";
import { watchWorkspaceConfig } from "./watchWorkspaceConfig";
import { AuthUriHandler } from "./AuthUriHandler";

export function activate(extensionContext: vscode.ExtensionContext) {
  const context = getContext(extensionContext);
  const xataProject = new XataProject(context);
  const xataExplorer = new XataExplorer(context);

  extensionContext.subscriptions.push(xataExplorer);
  extensionContext.subscriptions.push(xataProject);

  const refresh = (scope?: "explorer" | "workspace") => {
    if (scope === "explorer") {
      xataExplorer.refresh();
    } else if (scope === "workspace") {
      xataProject.refresh();
    } else {
      xataExplorer.refresh();
      xataProject.refresh();
    }
  };

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
        xataProject.refresh();
      }
    })
  );

  // Handle config files changes
  extensionContext.subscriptions.push(
    watchWorkspaceConfig(() => xataProject.refresh())
  );

  // Uri handler
  extensionContext.subscriptions.push(
    vscode.window.registerUriHandler(new AuthUriHandler(context, refresh))
  );

  // Extends jsonc to add "Insert Records" code lens action
  extensionContext.subscriptions.push(
    vscode.languages.registerCodeLensProvider("jsonc", {
      async provideCodeLenses(document) {
        try {
          const { jsonc } = await import("jsonc");
          const data = jsonc.parse(document.getText());
          const schema = data.$schema;
          if (typeof schema === "string" && schema.startsWith("xata:")) {
            let i = 0;
            for (const line of document.getText().split("\n")) {
              if (line.trimLeft().startsWith('"records":')) {
                break;
              }
              i++;
            }

            return [
              {
                range: new vscode.Range(
                  new vscode.Position(i, 0),
                  new vscode.Position(i, 1)
                ),
                isResolved: true,
                command: {
                  title: "Insert records",
                  command: "xata.insertRecords",
                },
              },
            ];
          }
          return [];
        } catch {
          return [];
        }
      },
    })
  );
}

export function deactivate() {}
