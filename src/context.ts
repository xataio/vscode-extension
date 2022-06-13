import {
  ExtensionContext,
  workspace,
  window,
  TreeItem,
  commands,
  Uri,
} from "vscode";
import dotenv from "dotenv";
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
      setContributeContext("xata.isLogged", Boolean(token));
      return token;
    },

    /**
     * Set a xata token
     */
    setToken(token: string) {
      setContributeContext("xata.isLogged", Boolean(token));
      return extensionContext.secrets.store("token", token);
    },

    /**
     * Clear xata token
     */
    clearToken() {
      setContributeContext("xata.isLogged", false);
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

    /**
     * Set `xata:isOffline` contribute context value
     */
    setOffline(value: boolean) {
      setContributeContext("xata.isOffline", value);
    },

    /**
     * Retrieve and validate the config from the workspace .env
     *
     * @param uri vscode's workspace uri
     * @returns
     */
    async getVSCodeWorkspaceEnvConfig(uri: Uri) {
      const envPath =
        workspace.getConfiguration().get<string>("xata.envFilePath") ?? ".env";

      const envFile = await workspace.fs.readFile(Uri.joinPath(uri, envPath));
      const config = dotenv.parse(Buffer.from(envFile));

      if (
        typeof config.XATA_DATABASE_URL === "string" &&
        typeof config.XATA_API_KEY === "string"
      ) {
        const urlChunks = config.XATA_DATABASE_URL.match(/\/\/([a-z0-9-]*)\./);
        if (!urlChunks) {
          throw new Error("XATA_DATABASE_URL is not valid");
        }

        return {
          baseUrl: new URL(config.XATA_DATABASE_URL).origin,
          databaseName: new URL(config.XATA_DATABASE_URL).pathname.split(
            "/"
          )[2],
          databaseUrl: config.XATA_DATABASE_URL,
          branch: config.XATA_DATABASE_BRANCH ?? (await this.getGitBranch(uri)),
          apiKey: config.XATA_API_KEY,
          workspaceId: urlChunks[1],
        };
      } else {
        commands.executeCommand("setContext", "xata.noConfigFile", true);
        throw new Error("No config set for xata");
      }
    },

    /**
     * Get current git branch
     *
     * @param uri vscode's workspace uri
     */
    async getGitBranch(uri: Uri) {
      try {
        const HEAD = (
          await workspace.fs.readFile(Uri.joinPath(uri, ".git/HEAD"))
        ).toString();

        if (HEAD.startsWith("ref: refs/heads/")) {
          return HEAD.replace(/^ref: refs\/heads\//, "").trim();
        }
        return undefined; // No branch found
      } catch {
        return undefined; // No branch found
      }
    },
  };
}

export type Context = ReturnType<typeof getContext>;

/**
 * Set a value to vscode context.
 *
 * This value can be used in `when` conditions in package.json
 *
 * @documentation https://code.visualstudio.com/api/references/when-clause-contexts#add-a-custom-when-clause-context
 */
function setContributeContext(
  key: "xata.isLogged" | "xata.isOffline",
  value: boolean
) {
  commands.executeCommand("setContext", key, value);
}
