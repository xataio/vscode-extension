import * as vscode from "vscode";
import { jsonc } from "jsonc";
import { Command } from "../types";
import { insertRecord } from "../xata/xataComponents";

/**
 * Command to insert a record from a json
 */
export const insertRecordCommand: Command = {
  id: "insertRecord",
  type: "global",
  inPalette: true,
  action: (context) => {
    return async () => {
      if (!vscode.window.activeTextEditor) {
        return;
      }

      const rawText = vscode.window.activeTextEditor.document.getText();
      try {
        const record = jsonc.parse(rawText);
        if (
          typeof record !== "object" ||
          typeof record.$schema !== "string" ||
          !record.$schema.startsWith("xata:")
        ) {
          vscode.window.showErrorMessage(
            `You need to have a "$schema": "xata:workspace/db/branch/table"`
          );
          return;
        }

        const { $schema, ...payload } = record;

        const [workspaceId, databaseName, branchName, tableName] = $schema
          .replace(/^xata:/, "")
          .split("/");

        if (!workspaceId || !databaseName || !branchName || !tableName) {
          vscode.window.showErrorMessage(
            `You need to have a "$schema": "xata:workspace/db/branch/table"`
          );
          return;
        }

        await insertRecord({
          baseUrl: context.getBaseUrl(workspaceId),
          context,
          pathParams: {
            dbBranchName: `${databaseName}:${branchName}`,
            tableName,
          },
          body: payload,
        });

        vscode.window.showInformationMessage(
          `New entry in ${$schema.replace(/^xata:/, "")} 🥳`
        );
      } catch {
        vscode.window.showErrorMessage(
          "The current document is not a valid record"
        );
      }
    };
  },
};
