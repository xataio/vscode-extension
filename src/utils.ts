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

/**
 * Validate a new resource name.
 *
 * @param resourceName
 * @param existingResources
 * @returns
 */
export function validateResourceName(
  resourceName: "branch" | "column" | "table",
  existingResources: string[]
) {
  return (value: string) => {
    const isValid = Boolean(/^[a-zA-Z0-9_\-~:]+$/.exec(value));
    if (existingResources.includes(value)) {
      return `${resourceName} already exists`;
    }

    return isValid
      ? undefined
      : "only alphanumerics and '-', '_', or '~' are allowed";
  };
}
