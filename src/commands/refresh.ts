import { Command } from "../types";

/**
 * Command to refresh the schema tree
 */
export const refreshCommand: Command = {
  id: "xata.refresh",
  action: (_context, explorer) => () => explorer.refresh(),
};
