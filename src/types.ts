import { Context } from "./context";

/**
 * VSCode command.
 */
export type Command = {
  id: string;
  action: (context: Context) => () => void;
};
