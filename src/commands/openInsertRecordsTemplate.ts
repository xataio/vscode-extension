import * as vscode from "vscode";
import { TableTreeItem } from "../TreeItem";
import { TreeItemCommand } from "../types";

export const openInsertRecordsTemplateCommand: TreeItemCommand<TableTreeItem> =
  {
    id: "openInsertRecordsTemplate",
    type: "treeItem",
    icon: "json",
    action: () => async (tableTreeItem) => {
      const doc = await vscode.workspace.openTextDocument({
        language: "jsonc",
        content:
          `// Insert a record to ${tableTreeItem.workspace.id}/${tableTreeItem.database.name}/${tableTreeItem.branch.name}/${tableTreeItem.table.name}\n\n` +
          "// 1. Add your records\n" +
          JSON.stringify(
            {
              $schema: `xata:${tableTreeItem.workspace.id}/${tableTreeItem.database.name}/${tableTreeItem.branch.name}/${tableTreeItem.table.name}`,
              records: [],
            },
            null,
            2
          ) +
          "\n// 2. Press F1 - 'Xata: Insert records'",
      });

      vscode.window.showTextDocument(doc);
    },
  };
