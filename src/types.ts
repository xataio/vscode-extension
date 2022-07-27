import { Codicon } from "./codicon";
import { Context } from "./context";
import { TreeItem } from "./views/treeItems/TreeItem";
import { XataJsonSchemaProvider } from "./xataJsonSchemaProvider";

export type RefreshAction = (scope?: "explorer" | "workspace") => void;

/**
 * Global VSCode command.
 */
export type Command<T = void> = {
  id: string;
  title: string;
  type: "global";
  /**
   * Icon
   * @see https://microsoft.github.io/vscode-codicons/dist/codicon.html
   */
  icon?: Codicon;
  inPalette?: boolean;
  /**
   * Add the entry in the palette only if the condition is `true`
   */
  paletteCondition?: "isLogged" | "isNotLogged";
  action: (
    context: Context,
    refresh: RefreshAction,
    jsonSchemaProvider: XataJsonSchemaProvider
  ) => (params?: T) => void;
};

type TupleUnion<U extends string, R extends string[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U] &
  string[];

/**
 * TreeItem command.
 *
 * - Assign to one TreeItem
 * - Not visible from the command palette
 */
export type TreeItemCommand<T extends TreeItem | undefined, U = void> = {
  id: string;
  title: string;
  viewItems: TupleUnion<T extends TreeItem ? T["contextValue"] : never>;
  type: "treeItem";
  /**
   * Icon
   * @see https://microsoft.github.io/vscode-codicons/dist/codicon.html
   */
  icon: Codicon;
  views: ("xataExplorer" | "xataWorkspace")[];
  group?: "inline" | "1_actions" | "5_templates";
  action: (
    context: Context,
    refresh: RefreshAction,
    jsonSchemaProvider: XataJsonSchemaProvider
  ) => (treeItem: T) => Promise<U>;
};

/**
 * Stand alone command.
 *
 * Can be triggered from welcome views, treeItem.command or programmatically
 */
export type StandAloneCommand<T extends TreeItem | undefined, U = void> = {
  id: string;
  title: string;
  type: "standAlone";

  action: (
    context: Context,
    refresh: RefreshAction,
    jsonSchemaProvider: XataJsonSchemaProvider
  ) => (treeItem: T) => Promise<U>;
};

export interface XataTablePath {
  workspaceId: string;
  databaseName: string;
  branchName: string;
  tableName: string;
}

// Trigger from the top view navigation level
export type WorkspaceNavigationItem = undefined;
