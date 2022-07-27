import * as vscode from "vscode";
import { TableTreeItem } from "../views/treeItems/TreeItem";
import { TreeItemCommand } from "../types";

export const openInsertRecordsTemplateCommand: TreeItemCommand<TableTreeItem> =
  {
    id: "openInsertRecordsTemplate",
    title: "Insert records",
    viewItems: ["table"],
    group: "5_templates",
    type: "treeItem",
    views: ["xataExplorer", "xataWorkspace"],
    icon: "json",
    action: () => async (tableTreeItem) => {
      const query = tableTreeItem.scope
        ? `?workspace=${tableTreeItem.scope.vscodeWorkspace.index}`
        : "";

      const doc = await vscode.workspace.openTextDocument({
        language: "jsonc",
        content:
          `// Insert records to ${tableTreeItem.workspaceId}/${tableTreeItem.databaseName}/${tableTreeItem.branchName}/${tableTreeItem.table.name}\n\n` +
          "// 1. Add your records\n" +
          "// 2. Press F1 - 'Xata: Insert records' or click on the 'Insert records' code lens action\n" +
          JSON.stringify(
            {
              $schema: `xata:${tableTreeItem.workspaceId}/${tableTreeItem.databaseName}/${tableTreeItem.branchName}/${tableTreeItem.table.name}${query}`,
              records: [],
            },
            null,
            2
          ),
      });

      vscode.window.showTextDocument(doc);
    },
  };
