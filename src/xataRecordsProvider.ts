import * as vscode from "vscode";
import { Context } from "./context";
import { queryTable } from "./xata/xataComponents";

/**
 * Text document provider around `xata.queryTable`
 *
 * scheme: xata:{workspaceId}/{db}/{branch}/{table}.json
 */
export class XataRecordsProvider implements vscode.TextDocumentContentProvider {
  onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
  onDidChange = this.onDidChangeEmitter.event;

  constructor(private context: Context) {}

  async provideTextDocumentContent(uri: vscode.Uri): Promise<string> {
    const [workspaceId, databaseName, branchName, tableName] = uri.path
      .replace(/\.json$/, "")
      .split("/");

    const { records } = await queryTable({
      baseUrl: this.context.getBaseUrl(workspaceId),
      context: this.context,
      pathParams: {
        dbBranchName: `${databaseName}:${branchName}`,
        tableName,
      },
    });

    return JSON.stringify(records, null, 2);
  }
}
