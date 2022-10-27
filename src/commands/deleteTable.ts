import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";
import { deleteTable } from "../xataWorkspace/xataWorkspaceComponents";

export const deleteTableCommand = createTreeItemCommand({
  id: "deleteTable",
  title: "Delete table",
  contexts: [
    {
      item: "table",
      view: "xataExplorer",
      group: "1_actions",
    },
    {
      item: "table",
      view: "xataProject",
      group: "1_actions",
    },
  ],
  icon: "trash",
  action: (context, refresh) => {
    return async (tableTreeItem) => {
      const confirm = await vscode.window.showInputBox({
        title: `Delete table`,
        prompt: `Deleting this table will result in the permanent removal of the entire table including all data associated with it. This action cannot be undone.`,
        validateInput: (value) => {
          if (value !== tableTreeItem.table.name) {
            return `Please type "${tableTreeItem.table.name}" to confirm`;
          }
        },
      });

      if (!confirm) {
        return;
      }

      await deleteTable({
        workspaceId: tableTreeItem.workspaceId,
        regionId: tableTreeItem.regionId,
        token: tableTreeItem.scope?.token,
        context,
        pathParams: {
          dbBranchName: `${tableTreeItem.databaseName}:${tableTreeItem.branchName}`,
          tableName: tableTreeItem.table.name,
        },
      });

      return refresh();
    };
  },
});
