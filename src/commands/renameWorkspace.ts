import * as vscode from "vscode";
import { WorkspaceTreeItem } from "../TreeItem";
import { TreeItemCommand } from "../types";
import { slugify } from "../utils";
import { updateWorkspace } from "../xata/xataComponents";

export const renameWorkspaceCommand: TreeItemCommand<WorkspaceTreeItem> = {
  id: "renameWorkspace",
  icon: "edit",
  type: "treeItem",
  action: (context, explorer) => {
    return async (workspaceTreeItem) => {
      const name = await vscode.window.showInputBox({
        title: `New workspace name`,
        value: workspaceTreeItem.workspace.name,
      });

      if (!name) {
        return;
      }

      await updateWorkspace({
        baseUrl: context.getBaseUrl(workspaceTreeItem.workspace.id),
        context,
        pathParams: {
          workspaceId: workspaceTreeItem.workspace.id,
        },
        body: {
          name,
          slug: slugify(name),
        },
      });

      return explorer.refresh();
    };
  },
};
