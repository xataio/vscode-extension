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

/**
 * TreeItem command.
 *
 * - Assign to one TreeItem
 * - Not visible from the command palette
 */
export function createTreeItemCommand<
  TContext extends Array<
    | {
        item: TreeItem["contextValue"];
        view: "xataExplorer" | "xataWorkspace";
        group?: "inline" | "1_actions" | "5_templates";
      }
    | { item: "workspaceNavigationItem" }
  >,
  U
>(command: {
  id: string;
  title: string;
  /**
   * Icon
   * @see https://microsoft.github.io/vscode-codicons/dist/codicon.html
   */
  icon: Codicon;
  /**
   * Where is the command accessible?
   */
  contexts: TContext;
  action: (
    context: Context,
    refresh: RefreshAction,
    jsonSchemaProvider: XataJsonSchemaProvider
  ) => (treeItem: ResolveItem<TreeItem, TContext[-1]["item"]>) => U;
}) {
  return { type: "treeItem" as const, ...command };
}

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

/**
 * Helper to narrowing `TreeItem` union with a union of `contextValue`
 */
type ResolveItem<Item extends TreeItem, ContextValue extends string> =
  | (Item extends {
      contextValue: ContextValue;
    }
      ? Item
      : never)
  | (ContextValue extends "workspaceNavigationItem" ? undefined : never);
