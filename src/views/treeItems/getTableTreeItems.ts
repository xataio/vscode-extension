import * as vscode from "vscode";
import { Context } from "../../context";
import { getBranchDetails } from "../../xataWorkspace/xataWorkspaceComponents";
import { EmptyTreeItem, TableTreeItem } from "./TreeItem";

export async function getTableTreeItems(
  element: {
    workspaceId: string;
    regionId: string;
    databaseName: string;
    branchName: string;
  },
  context: Context,
  scope?: {
    token: string;
    vscodeWorkspace: vscode.WorkspaceFolder;
  }
) {
  const branchDetails = await getBranchDetails({
    workspaceId: element.workspaceId,
    regionId: element.regionId,
    token: scope?.token,
    context: context,
    pathParams: {
      dbBranchName: `${element.databaseName}:${element.branchName}`,
    },
  });

  if (!branchDetails.success) {
    throw new Error(branchDetails.error.payload.message);
  }

  const { schema } = branchDetails.data;

  if (schema.tables.length === 0) {
    return [
      new EmptyTreeItem("Create table", {
        command: "xata.addTable",
        title: "Create table",
        arguments: [element],
      }),
    ];
  }

  return schema.tables.map(
    (table) =>
      new TableTreeItem(
        table.name,
        vscode.TreeItemCollapsibleState.Collapsed,
        {
          ...table,
          ...element,
        },
        scope
      )
  );
}
