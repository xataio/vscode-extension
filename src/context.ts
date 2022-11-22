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
import { Column } from "./xataWorkspace/xataWorkspaceSchemas";
import { resolveBranch } from "./xataWorkspace/xataWorkspaceComponents";
import { xataColumnIcons } from "./xataWorkspace/xataColumnIcons";

export const CONFIG_FILES = [
  ".xatarc",
  ".xatarc.json",
  "package.json",
] as const;

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
     * Get `appBaseUrl` from the workspace configuration
     */
    getAppBaseUrl() {
      const configValue = workspace.getConfiguration().get("xata.appBaseUrl");

      if (!(typeof configValue === "string" && configValue.includes("//"))) {
        window.showErrorMessage('"xata.appBaseUrl" is not a valid url');
        return "";
      }

      return configValue.replace(/\/^/, "");
    },

    /**
     * Get `coreBaseUrl` from the workspace configuration
     */
    getCoreBaseUrl() {
      const configValue = workspace.getConfiguration().get("xata.coreBaseUrl");

      if (!(typeof configValue === "string" && configValue.includes("//"))) {
        window.showErrorMessage('"xata.coreBaseUrl" is not a valid url');
        return "";
      }

      return configValue.replace(/\/^/, "");
    },

    /**
     * Get `workspaceBaseUrl` from the workspace configuration
     */
    getWorkspaceBaseUrl() {
      const configValue = workspace
        .getConfiguration()
        .get("xata.workspaceBaseUrl");

      if (typeof configValue !== "string") {
        window.showErrorMessage('"xata.workspaceBaseUrl" is not a valid url');
        return "";
      }

      if (!configValue.includes("//")) {
        window.showErrorMessage('"xata.workspaceBaseUrl" is not a valid url');
        return "";
      }

      if (!configValue.includes("{workspaceId}")) {
        window.showErrorMessage(
          '"xata.workspaceBaseUrl" is not a valid url, `{workspaceId}` needs to be part of the url'
        );
        return "";
      }

      if (!configValue.includes("{regionId}")) {
        window.showErrorMessage(
          '"xata.workspaceBaseUrl" is not a valid url, `{regionId}` needs to be part of the url'
        );
        return "";
      }

      return configValue.replace(/\/^/, "");
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
      )}/workspaces/${workspaceId}/dbs/${databaseName}/branches/${branchName}/tables/${tableName}`;
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
      return xataColumnIcons[type];
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
      let dotenvConfig: any = {}; // validated & typed later
      let xataRcConfig: any = {}; // validated & typed later

      try {
        const envPath =
          workspace.getConfiguration().get<string>("xata.envFilePath") ??
          ".env";

        const envFile = await workspace.fs.readFile(Uri.joinPath(uri, envPath));
        dotenvConfig = dotenv.parse(Buffer.from(envFile));
      } catch {
        // No .env in the workspace
      }

      // Load config from files (example: `.xatarc`)
      for (const fileName of CONFIG_FILES) {
        try {
          const raw = await workspace.fs.readFile(Uri.joinPath(uri, fileName));
          const json = JSON.parse(Buffer.from(raw).toString("utf-8"));
          if (fileName === "package.json") {
            xataRcConfig = {
              ...xataRcConfig,
              ...json.xata,
            };
          } else {
            xataRcConfig = {
              ...xataRcConfig,
              ...json,
            };
          }
        } catch {
          /* The file doesn't exist or is not a valid json */
        }
      }

      const databaseURL =
        dotenvConfig.XATA_DATABASE_URL ?? xataRcConfig.databaseURL;

      if (typeof databaseURL === "string") {
        const urlChunks = databaseURL.match(
          /\/\/([a-zA-Z0-9-_]*)\.([a-zA-Z0-9-]*)\./
        );
        if (!urlChunks) {
          throw new Error(
            "`XATA_DATABASE_URL` is not valid. Check your DB Configuration tab at https://app.xata.io"
          );
        }

        // List of things that could be in the url but not a region
        const notARegion = ["xata", "staging", "localhost"];
        const regionId = notARegion.includes(urlChunks[2])
          ? "eu-west-1"
          : urlChunks[2];

        const databaseName = new URL(databaseURL).pathname.split("/")[2];
        const baseUrl = new URL(databaseURL).origin;
        const apiKey: string | undefined =
          typeof dotenvConfig.XATA_API_KEY === "string"
            ? dotenvConfig.XATA_API_KEY
            : undefined;

        const branch = await resolveBranch({
          regionId,
          workspaceId: urlChunks[1],
          context: this,
          token: apiKey,
          pathParams: {
            dbName: databaseName,
          },
          queryParams: {
            gitBranch:
              dotenvConfig.XATA_BRANCH ?? (await this.getGitBranch(uri)),
          },
        });

        if (branch.success === false) {
          throw new Error("Branch can't be resolved");
        }

        return {
          baseUrl,
          databaseName,
          databaseURL,
          branch: branch.data.branch,
          apiKey,
          workspaceId: urlChunks[1],
          regionId,
        } as const;
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
