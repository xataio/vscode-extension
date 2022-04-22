import * as vscode from "vscode";
import { WorkspaceTreeItem } from "../TreeItem";
import { TreeItemCommand } from "../types";
import { deleteWorkspace } from "../xata/xataComponents";

export const deleteWorkspaceCommand: TreeItemCommand<WorkspaceTreeItem> = {
  id: "xata.deleteWorkspace",
  icon: "trash",
  type: "treeItem",
  action: (context, explorer) => {
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
        baseUrl: context.getBaseUrl(),
        context,
        pathParams: {
          workspaceId: workspaceTreeItem.workspace.id,
        },
      });

      return explorer.refresh();
    };
  },
};
