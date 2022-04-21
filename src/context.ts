import { ExtensionContext, workspace, window } from "vscode";

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

    /**
     * Get baseUrl from the workspace configuration
     */
    getBaseUrl(workspaceId?: string) {
      const configValue = workspace.getConfiguration().get("xata.baseUrl");

      if (!(typeof configValue === "string" && configValue.includes("//"))) {
        window.showErrorMessage('"xata.baseUrl" is not a valid url');
        return "";
      }

      if (workspaceId) {
        const { protocol, host } = new URL(configValue);
        return `${protocol}//${workspaceId}.${host}`;
      } else {
        return configValue;
      }
    },
  };
}

export type Context = ReturnType<typeof getContext>;
