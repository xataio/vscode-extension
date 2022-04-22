import { Context } from "./context";
import { TreeItem } from "./TreeItem";
import { XataExplorer } from "./xataExplorer";

/**
 * Global VSCode command.
 */
export type Command = {
  id: `xata.${string}`;
  type: "global";
  icon?: string;
  action: (context: Context, explorer: XataExplorer) => () => void;
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
  icon: string;
  action: (context: Context, explorer: XataExplorer) => (treeItem: T) => void;
};
