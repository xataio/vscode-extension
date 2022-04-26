import { ExtensionContext, workspace, window, TreeItem } from "vscode";
import { Column } from "./xata/xataSchemas";

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
     * Get `baseUrl` from the workspace configuration
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

    /**
     * Get `hideBranchLevel` from the workspace configuration
     */
    getHideBranchLevel() {
      return (
        workspace.getConfiguration().get<boolean>("xata.hideBranchLevel") ??
        true
      );
    },

    /**
     * Get `enableDatabaseColor` from the workspace configuration
     */
    getEnableDatabaseColor() {
      return (
        workspace.getConfiguration().get<boolean>("xata.enableDatabaseColor") ??
        true
      );
    },

    /**
     * Retrieve a column icon by type
     */
    getColumnIcon(type: Column["type"]): TreeItem["iconPath"] {
      return {
        light: extensionContext.asAbsolutePath(
          `media/columns/light/${type}.svg`
        ),
        dark: extensionContext.asAbsolutePath(`media/columns/dark/${type}.svg`),
      };
    },

    /**
     * The uri of the directory containing the extension.
     */
    extensionUri: extensionContext.extensionUri,
  };
}

export type Context = ReturnType<typeof getContext>;
