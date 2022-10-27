import * as vscode from "vscode";
import { Context } from "../../context";
import { getTableSchema } from "../../xataWorkspace/xataWorkspaceComponents";
import { ColumnTreeItem, TableTreeItem } from "./TreeItem";

export async function getColumnTreeItems(
  element: TableTreeItem,
  context: Context,
  scope?: {
    token: string;
    vscodeWorkspace: vscode.WorkspaceFolder;
  }
) {
  const tableSchema = await getTableSchema({
    regionId: element.regionId,
    workspaceId: element.workspaceId,
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
          regionId: element.regionId,
          databaseName: element.databaseName,
          branchName: element.branchName,
          tableName: element.table.name,
        },
        tableSchema.data.columns,
        scope
      )
  );
}
