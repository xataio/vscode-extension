import { Command } from "../types";

/**
 * Command to refresh the schema tree
 */
export const refreshCommand: Command = {
  id: "refresh",
  type: "global",
  title: "Refresh",
  icon: "refresh",
  inPalette: true,
  action: (context, refresh, jsonSchemaProvider) => () => {
    context.setOffline(false);
    jsonSchemaProvider.refresh();
    refresh();
  },
};
