import { ExtensionContext } from "vscode";

/**
 * Wrapper around vscode extension context
 *
 * @param extensionContext
 * @returns
 */
export function getContext(extensionContext: ExtensionContext) {
  return {
    /**
     * Retrieve stored xata token
     */
    getToken() {
      return extensionContext.secrets.get("token");
    },

    /**
     * Set a xata token
     */
    setToken(token: string) {
      return extensionContext.secrets.store("token", token);
    },

    /**
     * Clear xata token
     */
    clearToken() {
      return extensionContext.secrets.delete("token");
    },
  };
}

export type Context = ReturnType<typeof getContext>;
