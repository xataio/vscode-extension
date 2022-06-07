import { Codicon } from "./codicon";
import { Context } from "./context";
import { TreeItem } from "./views/treeItems/TreeItem";
import { XataJsonSchemaProvider } from "./xataJsonSchemaProvider";

type RefreshAction = (scope?: "explorer" | "workspace") => void;

/**
 * Global VSCode command.
 */
export type Command = {
  id: string;
  type: "global";
  /**
   * Icon
   * @see https://microsoft.github.io/vscode-codicons/dist/codicon.html
   */
  icon?: Codicon;
  inPalette?: boolean;
  action: (
    context: Context,
    refresh: RefreshAction,
    jsonSchemaProvider: XataJsonSchemaProvider
  ) => () => void;
};

/**
 * TreeItem command.
 *
 * - Assign to one TreeItem
 * - Not visible from the command palette
 */
export type TreeItemCommand<T extends TreeItem | undefined> = {
  id: string;
  type: "treeItem";
  /**
   * Icon
   * @see https://microsoft.github.io/vscode-codicons/dist/codicon.html
   */
  icon: Codicon;
  action: (
    context: Context,
    refresh: RefreshAction,
    jsonSchemaProvider: XataJsonSchemaProvider
  ) => (treeItem: T) => void;
};

export interface XataTablePath {
  workspaceId: string;
  databaseName: string;
  branchName: string;
  tableName: string;
}
