import { Command } from "../types";

/**
 * Command to refresh the schema tree
 */
export const refreshCommand: Command = {
  id: "xata.refresh",
  type: "global",
  icon: "refresh",
  action: (context, explorer, jsonSchemaProvider) => () => {
    context.setOffline(false);
    jsonSchemaProvider.refresh();
    explorer.refresh();
  },
};
