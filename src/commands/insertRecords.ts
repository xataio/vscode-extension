import * as vscode from "vscode";
import { jsonc } from "jsonc";
import { Command } from "../types";
import { bulkInsertTableRecords } from "../xata/xataComponents";
import { TableTreeItem } from "../views/treeItems/TreeItem";

/**
 * Command to insert a record from a json
 */
export const insertRecordsCommand: Command = {
  id: "insertRecords",
  title: "Insert record(s)",
  type: "global",
  inPalette: true,
  action: (context) => {
    return async () => {
      if (!vscode.window.activeTextEditor) {
        return;
      }

      const rawText = vscode.window.activeTextEditor.document.getText();
      try {
        const document = jsonc.parse(rawText);
        if (
          typeof document !== "object" ||
          typeof document.$schema !== "string" ||
          !document.$schema.startsWith("xata:")
        ) {
          vscode.window.showErrorMessage(
            `You need to have a "$schema": "xata:workspace/db/branch/table"`
          );
          return;
        }

        const { $schema, records } = document;

        if (!Array.isArray(records)) {
          vscode.window.showErrorMessage(`"records" must be an array`);
          return;
        }

        const [workspaceId, databaseName, branchName, tableName] = $schema
          .replace(/^xata:/, "") // scheme
          .replace(/\?.*$/, "") // query
          .split("/");

        // Retrieve config from `?workspace={index}`
        let config: { baseUrl: string; apiKey: string } | undefined = undefined;
        const queryExecArray = /\?workspace=(\d)$/.exec($schema);
        if (queryExecArray && vscode.workspace.workspaceFolders) {
          const workspaceIndex = parseInt(queryExecArray[1]);
          const envConfig = await context.getVSCodeWorkspaceEnvConfig(
            vscode.workspace.workspaceFolders[workspaceIndex].uri
          );
          if (!envConfig?.apiKey) {
            throw new Error(
              "You are not logged-in! Please add a `XATA_API_KEY` to your env configuration."
            );
          }
          config = {
            apiKey: envConfig.apiKey,
            baseUrl: envConfig.baseUrl,
          };
        }

        if (!workspaceId || !databaseName || !branchName || !tableName) {
          vscode.window.showErrorMessage(
            `You need to have a "$schema": "xata:workspace/db/branch/table"`
          );
          return;
        }

        try {
          const res = await bulkInsertTableRecords({
            baseUrl: config?.baseUrl ?? context.getBaseUrl(workspaceId),
            token: config?.apiKey,
            silentError: true,
            context,
            pathParams: {
              dbBranchName: `${databaseName}:${branchName}`,
              tableName,
            },
            body: {
              records,
            },
          });

          if (res.success) {
            const resultLength =
              "recordIDs" in res.data
                ? res.data.recordIDs.length
                : res.data.records.length;

            vscode.window
              .showInformationMessage(
                `${resultLength} record${
                  resultLength > 1 ? "s" : ""
                } inserted in ${$schema.replace(/^xata:/, "")} 🥳`,
                "View Data"
              )
              .then((value) => {
                if (value === "View Data") {
                  vscode.commands.executeCommand(
                    "xata.previewData",
                    new TableTreeItem(
                      tableName,
                      vscode.TreeItemCollapsibleState.Collapsed,
                      {
                        workspaceId,
                        databaseName,
                        branchName,
                        columns: [],
                        name: tableName,
                      },
                      vscode.workspace.workspaceFolders && config
                        ? {
                            baseUrl: config.baseUrl,
                            token: config.apiKey,
                            vscodeWorkspace:
                              vscode.workspace.workspaceFolders[0],
                          }
                        : undefined
                    )
                  );
                }
              });
          } else if (res.error.status === 400) {
            // TODO: Improve error feedback
            vscode.window.showErrorMessage(
              "The records can't be inserted - Reason: " +
                res.error.payload.errors
                  .map((i) => i.message ?? "Unknown error")
                  .join(", ")
            );
          } else {
            throw new Error(res.error.payload.message);
          }
        } catch (e) {
          if (e instanceof Error) {
            vscode.window.showErrorMessage(
              "The records can't be inserted - Reason: " + e.message
            );
          }
        }
      } catch {
        vscode.window.showErrorMessage("The current document is not a valid");
      }
    };
  },
};
