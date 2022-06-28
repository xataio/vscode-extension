import * as vscode from "vscode";
import { Context } from "./context";

/**
 * Watch all `.env` files to trigger a refresh
 *
 * @param onConfigChange
 */
export function watchWorkspaceConfig(onConfigChange: () => void) {
  const configFiles = new Set<vscode.Uri["path"]>();

  const indexConfigFiles = () => {
    vscode.workspace.workspaceFolders?.forEach(async (workspaceFolder) => {
      const envPath =
        vscode.workspace.getConfiguration().get<string>("xata.envFilePath") ??
        ".env";

      const configUri = vscode.Uri.joinPath(workspaceFolder.uri, envPath);
      configFiles.add(configUri.path.toLowerCase());

      try {
        // Check if the config exists (not relevant in multi-vscode-workspace context)
        await vscode.workspace.fs.stat(configUri);
        vscode.commands.executeCommand(
          "setContext",
          "xata.noConfigFile",
          false
        );
      } catch {
        vscode.commands.executeCommand("setContext", "xata.noConfigFile", true);
      }
    });
  };

  indexConfigFiles();

  const saveListener = vscode.workspace.onDidSaveTextDocument((document) => {
    if (!vscode.workspace.workspaceFolders) {
      return;
    }
    if (configFiles.has(document.uri.path.toLowerCase())) {
      onConfigChange();
    }
  });

  const onFileEvent = (e: vscode.FileDeleteEvent | vscode.FileCreateEvent) => {
    e.files.forEach((file) => {
      if (configFiles.has(file.path.toLowerCase())) {
        onConfigChange();
        indexConfigFiles();
      }
    });
  };

  const deleteListener = vscode.workspace.onDidDeleteFiles(onFileEvent);
  const createListener = vscode.workspace.onDidCreateFiles(onFileEvent);
  const wsListener = vscode.workspace.onDidChangeWorkspaceFolders(() => {
    configFiles.clear();
    indexConfigFiles();
  });

  const configListener = vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("xata.envFilePath")) {
      configFiles.clear();
      indexConfigFiles();
    }
  });

  return {
    dispose() {
      deleteListener.dispose();
      createListener.dispose();
      saveListener.dispose();
      wsListener.dispose();
      configListener.dispose();
    },
  };
}
