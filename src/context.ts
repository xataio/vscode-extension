import {
  ExtensionContext,
  workspace,
  window,
  TreeItem,
  commands,
} from "vscode";
import { XataTablePath } from "./types";
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
    async getToken() {
      const token = await extensionContext.secrets.get("token");
      setIsLoggedCommandContext(Boolean(token));
      return token;
    },

    /**
     * Set a xata token
     */
    setToken(token: string) {
      setIsLoggedCommandContext(Boolean(token));
      return extensionContext.secrets.store("token", token);
    },

    /**
     * Clear xata token
     */
    clearToken() {
      setIsLoggedCommandContext(false);
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
     * Get link to Xata UI
     */
    getAppLink({
      branchName,
      databaseName,
      tableName,
      workspaceId,
    }: XataTablePath) {
      const configValue = workspace.getConfiguration().get("xata.appBaseUrl");

      if (!(typeof configValue === "string" && configValue.includes("//"))) {
        window.showErrorMessage('"xata.appBaseUrl" is not a valid url');
        return "";
      }

      return `${configValue.replace(
        /\/$/,
        ""
      )}/workspaces/${workspaceId}/dbs/${databaseName}/${branchName}/tables/${tableName}`;
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

// Expose `xata.isLogged` for the welcome screen logic
const setIsLoggedCommandContext = (value: boolean) => {
  commands.executeCommand("setContext", "xata.isLogged", value);
};
