import flatten from "flat";
import { TableTreeItem } from "../TreeItem";
import { TreeItemCommand } from "../types";
import { PreviewDataPanel } from "../panels/PreviewDataPanel";
import { queryTable } from "../xata/xataComponents";

export const previewDataCommand: TreeItemCommand<TableTreeItem> = {
  id: "previewData",
  icon: "eye",
  type: "treeItem",
  action: (context) => {
    return async (tableTreeItem) => {
      const table = await queryTable({
        baseUrl: context.getBaseUrl(tableTreeItem.workspace.id),
        context: context,
        pathParams: {
          dbBranchName: `${tableTreeItem.database.name}:${tableTreeItem.branch.name}`,
          tableName: tableTreeItem.table.name,
        },
      });

      if (!table.success) {
        throw new Error(table.error.payload.message);
      }

      const { records } = table.data;

      const flattenRecords = records.map((r) => {
        // Omit `xata` key from the preview (internals)
        const { xata, ...record } = r;
        // Flatten every object to avoid `[object][Object]` in the output data grid
        return flatten(record, { safe: true });
      });

      PreviewDataPanel.render(
        context,
        {
          workspaceId: tableTreeItem.workspace.id,
          branchName: tableTreeItem.branch.name,
          databaseName: tableTreeItem.database.name,
          tableName: tableTreeItem.table.name,
        },
        JSON.stringify(flattenRecords)
      );
    };
  },
};
