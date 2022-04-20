import { Command } from "../types";

/**
 * Command to remove the stored xata token
 */
export const logoutCommand: Command = {
  id: "xata.logout",
  action(context) {
    return context.clearToken;
  },
};
