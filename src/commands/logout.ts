import { Command } from "../types";

/**
 * Command to remove the stored xata token
 */
export const logoutCommand: Command = {
  id: "xata.logout",
  type: "global",
  action(context, explorer) {
    return async () => {
      await context.clearToken();
      return explorer.refresh();
    };
  },
};
