import { Command } from "../types";

/**
 * Command to remove the stored xata token
 */
export const logoutCommand: Command = {
  id: "logout",
  title: "Logout",
  paletteCondition: "isLogged",
  type: "global",
  inPalette: true,
  action(context, refresh) {
    return async () => {
      await context.clearToken();
      return refresh("explorer");
    };
  },
};
