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

export type DatabaseUrl = {
  regionId: string;
  databaseName: string;
  workspaceId: string;
  baseUrl: string;
};

export function parseDatabaseUrl(databaseURL: string): DatabaseUrl {
  const { pathname, origin: baseUrl, host } = new URL(databaseURL);
  const urlChunks = host.split(".");
  const databaseName = pathname.split("/")[2];
  const workspaceId = host.split(".")[0];

  // List of things that could be in the url but not a region
  const notARegion = [
    "xata",
    "staging",
    "localhost",
    "xatabase",
    "io",
    "co",
    "com",
  ];

  let regionId = "eu-west-1";

  if (urlChunks[2] && !notARegion.includes(urlChunks[2])) {
    regionId = urlChunks[2];
  } else if (urlChunks[3] && !notARegion.includes(urlChunks[3])) {
    regionId = urlChunks[3];
  }

  return {
    baseUrl,
    databaseName,
    workspaceId,
    regionId,
  };
}
