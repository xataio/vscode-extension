import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";

export const openInsertRecordsTemplateCommand = createTreeItemCommand({
  id: "openInsertRecordsTemplate",
  title: "Insert records",
  contexts: [
    { item: "table", view: "xataExplorer", group: "5_templates" },
    { item: "table", view: "xataProject", group: "5_templates" },
  ],
  icon: "json",
  action: () => async (tableTreeItem) => {
    const query = tableTreeItem.scope
      ? `?workspace=${tableTreeItem.scope.vscodeWorkspace.index}`
      : "";

    const doc = await vscode.workspace.openTextDocument({
      language: "jsonc",
      content:
        `// Insert records to ${tableTreeItem.workspaceId}/${tableTreeItem.regionId}/${tableTreeItem.databaseName}/${tableTreeItem.branchName}/${tableTreeItem.table.name}\n\n` +
        "// 1. Add your records\n" +
        "// 2. Press F1 - 'Xata: Insert records' or click on the 'Insert records' code lens action\n" +
        JSON.stringify(
          {
            $schema: `xata:${tableTreeItem.workspaceId}/${tableTreeItem.regionId}/${tableTreeItem.databaseName}/${tableTreeItem.branchName}/${tableTreeItem.table.name}${query}`,
            records: [],
          },
          null,
          2
        ),
    });

    vscode.window.showTextDocument(doc);
  },
});
