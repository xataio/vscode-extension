import * as vscode from "vscode";
import { Context } from "./context";

/**
 * Watch all `.env` files to trigger a refresh
 *
 * @param onConfigChange
 */
export function watchWorkspaceConfig(onConfigChange: () => void) {
  const configFiles = new Set<vscode.Uri["path"]>();
  vscode.workspace.workspaceFolders?.forEach((workspaceFolder) => {
    const envPath =
      vscode.workspace.getConfiguration().get<string>("xata.envFilePath") ??
      ".env";

    configFiles.add(vscode.Uri.joinPath(workspaceFolder.uri, envPath).path);
  });

  return vscode.workspace.onDidSaveTextDocument((document) => {
    if (!vscode.workspace.workspaceFolders) {
      return;
    }
    if (configFiles.has(document.uri.path)) {
      onConfigChange();
    }
  });
}
