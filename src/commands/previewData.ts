import { TableTreeItem } from "../TreeItem";
import { TreeItemCommand } from "../types";
import * as vscode from "vscode";

export const previewDataCommand: TreeItemCommand<TableTreeItem> = {
  id: "xata.previewData",
  icon: "eye",
  type: "treeItem",
  action: () => {
    return async (tableTreeItem) => {
      const uri = vscode.Uri.parse(
        `xata:${tableTreeItem.workspace.id}/${tableTreeItem.database.name}/${tableTreeItem.branch.name}/${tableTreeItem.table.name}.json`,
        true
      );

      const doc = await vscode.workspace.openTextDocument(uri);
      await vscode.window.showTextDocument(doc, { preview: false });
    };
  },
};
