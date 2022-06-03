import flatten from "flat";
import { TableTreeItem } from "../views/treeItems/TreeItem";
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
        baseUrl:
          tableTreeItem.scope?.baseUrl ??
          context.getBaseUrl(tableTreeItem.workspaceId),
        token: tableTreeItem.scope?.token,
        context: context,
        pathParams: {
          dbBranchName: `${tableTreeItem.databaseName}:${tableTreeItem.branchName}`,
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
          workspaceId: tableTreeItem.workspaceId,
          branchName: tableTreeItem.branchName,
          databaseName: tableTreeItem.databaseName,
          tableName: tableTreeItem.table.name,
        },
        JSON.stringify(flattenRecords)
      );
    };
  },
};
