import * as vscode from "vscode";
import { Context } from "../../context";
import { ColumnTreeItem, TableTreeItem } from "./TreeItem";
import { getTableSchema } from "../../xata/xataComponents";

export async function getColumnTreeItems(
  element: TableTreeItem,
  context: Context,
  scope?: {
    token: string;
    baseUrl: string;
    vscodeWorkspace: vscode.WorkspaceFolder;
  }
) {
  const tableSchema = await getTableSchema({
    baseUrl: scope?.baseUrl ?? context.getBaseUrl(element.workspaceId),
    token: scope?.token,
    context: context,
    pathParams: {
      dbBranchName: `${element.databaseName}:${element.branchName}`,
      tableName: element.table.name,
    },
  });

  if (!tableSchema.success) {
    throw new Error(tableSchema.error.payload.message);
  }

  const { columns } = tableSchema.data;

  return columns.map(
    (column) =>
      new ColumnTreeItem(
        column.name,
        column.name,
        column.columns?.length
          ? vscode.TreeItemCollapsibleState.Collapsed
          : vscode.TreeItemCollapsibleState.None,
        {
          ...column,
          workspaceId: element.workspaceId,
          databaseName: element.databaseName,
          branchName: element.branchName,
          tableName: element.table.name,
        },
        tableSchema.data.columns,
        scope
      )
  );
}
