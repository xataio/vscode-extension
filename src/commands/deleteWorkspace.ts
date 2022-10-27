import * as vscode from "vscode";
import { createTreeItemCommand } from "../types";
import { deleteWorkspace } from "../xataCore/xataCoreComponents";

export const deleteWorkspaceCommand = createTreeItemCommand({
  id: "deleteWorkspace",
  title: "Delete workspace",
  contexts: [
    {
      item: "workspace",
      view: "xataExplorer",
    },
  ],
  icon: "trash",
  action: (context, refresh) => {
    return async (workspaceTreeItem) => {
      const confirm = await vscode.window.showInputBox({
        title: `Delete workspace`,
        prompt: `Deleting this workspace will result in the permanent removal of the entire workspace including all its databases and data. You cannot undo this action.`,
        validateInput: (value) => {
          if (value !== workspaceTreeItem.workspace.name) {
            return `Please type "${workspaceTreeItem.workspace.name}" to confirm`;
          }
        },
      });

      if (!confirm) {
        return;
      }

      await deleteWorkspace({
        context,
        pathParams: {
          workspaceId: workspaceTreeItem.workspace.id,
        },
      });

      return refresh();
    };
  },
});
