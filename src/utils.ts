import { Uri, Webview } from "vscode";
import { Column } from "./xataWorkspace/xataWorkspaceSchemas";

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
  resourceName: "branch" | "column" | "table" | "database",
  existingResources: string[]
) {
  return (value: string) => {
    const pattern =
      resourceName === "column"
        ? /^[a-zA-Z0-9_\-~:.]+$/ // column is supporting the dot notation
        : /^[a-zA-Z0-9_\-~:]+$/;
    const isValid = Boolean(pattern.exec(value));
    if (existingResources.includes(value)) {
      return `${resourceName} already exists`;
    }

    return isValid
      ? undefined
      : "only alphanumerics and '-', '_', or '~' are allowed";
  };
}

/**
 * Get the list of flatten columns names.
 *
 * @param columns
 * @returns list of flatten column names.
 */
export function getFlattenColumns(
  columns: Column[],
  entries: string[] = [],
  parentPath = ""
) {
  columns.forEach((c) => {
    if (c.columns) {
      getFlattenColumns(c.columns, entries, parentPath + c.name + ".");
    } else {
      entries.push(parentPath + c.name);
    }
  });

  return entries;
}
