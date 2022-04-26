import * as vscode from "vscode";
import { TableTreeItem } from "../TreeItem";
import { TreeItemCommand } from "../types";

export const openInsertRecordTemplateCommand: TreeItemCommand<TableTreeItem> = {
  id: "xata.openInsertRecordTemplate",
  type: "treeItem",
  icon: "json",
  action: () => async (tableTreeItem) => {
    const doc = await vscode.workspace.openTextDocument({
      language: "jsonc",
      content:
        `// Insert a record to ${tableTreeItem.workspace.id}/${tableTreeItem.database.name}/${tableTreeItem.branch.name}/${tableTreeItem.table.name}\n\n` +
        "// 1. Fill the entry\n" +
        JSON.stringify(
          {
            $schema: `xata:${tableTreeItem.workspace.id}/${tableTreeItem.database.name}/${tableTreeItem.branch.name}/${tableTreeItem.table.name}`,
          },
          null,
          2
        ) +
        "\n// 2. Press F1 - 'Xata: Insert record'",
    });

    vscode.window.showTextDocument(doc);
  },
};
