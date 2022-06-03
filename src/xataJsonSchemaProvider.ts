import { JSONSchema7Definition } from "json-schema";
import * as vscode from "vscode";
import { Context } from "./context";
import { getTableSchema } from "./xata/xataComponents";
import { Column } from "./xata/xataSchemas";

/**
 * Xata JSON schema provider.
 *
 * This is providing a json schema for a specific table
 *
 * @example
 * ```json
 * {
 *  "$schema": "xata:{workspaceId}/{db}/{branch}/{table}?workspace=0"
 * }
 * ```
 */
export class XataJsonSchemaProvider
  implements vscode.TextDocumentContentProvider
{
  onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
  onDidChange = this.onDidChangeEmitter.event;

  private static openDocuments: Set<vscode.Uri> = new Set();

  constructor(private context: Context) {}

  public refresh() {
    XataJsonSchemaProvider.openDocuments.forEach((uri) =>
      this.onDidChangeEmitter.fire(uri)
    );
  }

  async provideTextDocumentContent(uri: vscode.Uri): Promise<string> {
    XataJsonSchemaProvider.openDocuments.add(uri);

    const [workspaceId, databaseName, branchName, tableName] =
      uri.path.split("/");

    let config: { baseUrl: string; apiKey: string } | undefined = undefined;
    if (
      uri.query.startsWith("workspace=") &&
      vscode.workspace.workspaceFolders
    ) {
      const workspaceId = parseInt(uri.query.slice("workspace=".length));
      if (
        Number.isFinite(workspaceId) &&
        workspaceId <= vscode.workspace.workspaceFolders.length - 1
      ) {
        config = await this.context.getVSCodeWorkspaceEnvConfig(
          vscode.workspace.workspaceFolders[workspaceId].uri
        );
      }
    }

    const tableSchema = await getTableSchema({
      baseUrl: config?.baseUrl ?? this.context.getBaseUrl(workspaceId),
      token: config?.apiKey,
      context: this.context,
      pathParams: {
        dbBranchName: `${databaseName}:${branchName}`,
        tableName,
      },
    });

    if (!tableSchema.success) {
      throw new Error(tableSchema.error.payload.message);
    }

    const { columns } = tableSchema.data;

    return JSON.stringify(xataTableSchemaToJsonSchema(columns));
  }
}

export function xataTableSchemaToJsonSchema(
  columns: Column[]
): JSONSchema7Definition {
  return {
    type: "object",
    required: ["records"],
    properties: {
      records: {
        description: "List of records to insert",
        type: "array",
        items: {
          type: "object",
          properties: columns.reduce((mem, column) => {
            const property: JSONSchema7Definition = {};
            switch (column.type) {
              case "bool":
                property.type = "boolean";
                break;
              case "email":
                property.type = "string";
                property.format = "email";
                break;
              case "float":
                property.type = "number";
                break;
              case "int":
                property.type = "integer";
                break;
              case "link":
                property.description = `id of the linked record (${column.link?.table})`;
                property.type = "string";
                break;
              case "multiple":
                property.type = "array";
                property.items = {
                  type: "string",
                };
                break;
              case "object":
                property.type = "object";
                break;
              case "string":
              case "text":
                property.type = "string";
                break;
            }

            return { ...mem, [column.name]: property };
          }, {} as { [key: string]: JSONSchema7Definition }),
        },
      },
    },
  };
}
