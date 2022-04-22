import { Context } from "./context";
import { XataExplorer } from "./xataExplorer";

/**
 * VSCode command.
 */
export type Command = {
  id: `xata.${string}`;
  action: (context: Context, explorer: XataExplorer) => () => void;
};
