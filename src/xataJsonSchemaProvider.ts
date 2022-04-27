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
 *  "$schema": "xata:{workspaceId}/{db}/{branch}/{table}"
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

    const { columns } = await getTableSchema({
      baseUrl: this.context.getBaseUrl(workspaceId),
      context: this.context,
      pathParams: {
        dbBranchName: `${databaseName}:${branchName}`,
        tableName,
      },
    });

    return JSON.stringify(xataTableSchemaToJsonSchema(columns));
  }
}

export function xataTableSchemaToJsonSchema(
  columns: Column[]
): JSONSchema7Definition {
  return {
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
          property.type = "string";
          property.description = "id of the linked resource";
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
  };
}
