import { Uri, Webview } from "vscode";

/**
 * Slugify a name for resources
 */
export function slugify(name: string) {
  return name.toLowerCase().split(/\W/g).filter(Boolean).join("-");
}

/**
 * Get a webview Uri
 */
export function getUri(webview: Webview, extensionUri: Uri, path: string) {
  return webview.asWebviewUri(Uri.joinPath(extensionUri, path));
}
