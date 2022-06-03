import { Command } from "../types";

/**
 * Command to remove the stored xata token
 */
export const logoutCommand: Command = {
  id: "logout",
  type: "global",
  inPalette: true,
  action(context, refresh) {
    return async () => {
      await context.clearToken();
      return refresh();
    };
  },
};
