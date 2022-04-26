import { Codicon } from "./codicon";
import { Context } from "./context";
import { TreeItem } from "./TreeItem";
import { XataExplorer } from "./xataExplorer";
import { XataJsonSchemaProvider } from "./xataJsonSchemaProvider";

/**
 * Global VSCode command.
 */
export type Command = {
  id: `xata.${string}`;
  type: "global";
  icon?: Codicon;
  hideFromCommandPalette?: boolean;
  action: (
    context: Context,
    explorer: XataExplorer,
    jsonSchemaProvider: XataJsonSchemaProvider
  ) => () => void;
};

/**
 * TreeItem command.
 *
 * - Assign to one TreeItem
 * - Not visible from the command palette
 */
export type TreeItemCommand<T extends TreeItem> = {
  id: `xata.${string}`;
  type: "treeItem";
  /**
   * Icon
   * @see https://microsoft.github.io/vscode-codicons/dist/codicon.html
   */
  icon: Codicon;
  action: (
    context: Context,
    explorer: XataExplorer,
    jsonSchemaProvider: XataJsonSchemaProvider
  ) => (treeItem: T) => void;
};

export interface XataTablePath {
  workspaceId: string;
  databaseName: string;
  branchName: string;
  tableName: string;
}
