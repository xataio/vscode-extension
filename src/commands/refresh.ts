import { Command } from "../types";

/**
 * Command to refresh the schema tree
 */
export const refreshCommand: Command = {
  id: "xata.refresh",
  type: "global",
  icon: "refresh",
  action: (_context, explorer, jsonSchemaProvider) => () => {
    jsonSchemaProvider.refresh();
    explorer.refresh();
  },
};
