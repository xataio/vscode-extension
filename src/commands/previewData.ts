import flatten from "flat";
import { TableTreeItem } from "../views/treeItems/TreeItem";
import { TreeItemCommand } from "../types";
import { PreviewDataPanel } from "../panels/PreviewDataPanel";
import { getTableSchema, queryTable } from "../xata/xataComponents";
import sanitizeHtml from "sanitize-html";

export const previewDataCommand: TreeItemCommand<TableTreeItem> = {
  id: "previewData",
  icon: "eye",
  views: ["xataExplorer", "xataWorkspace"],
  type: "treeItem",
  action: (context) => {
    return async (tableTreeItem) => {
      const params = {
        baseUrl:
          tableTreeItem.scope?.baseUrl ??
          context.getBaseUrl(tableTreeItem.workspaceId),
        token: tableTreeItem.scope?.token,
        context: context,
        pathParams: {
          dbBranchName: `${tableTreeItem.databaseName}:${tableTreeItem.branchName}`,
          tableName: tableTreeItem.table.name,
        },
      };
      const schema = await getTableSchema(params);
      const table = await queryTable(params);

      if (!schema.success) {
        throw new Error(schema.error.payload.message);
      }

      if (!table.success) {
        throw new Error(table.error.payload.message);
      }

      const { records } = table.data;

      const flattenRecords = records.map((r, i) => {
        // Omit `xata` key from the preview (internals)
        const { xata, ...record } = r;

        // Force the key on the first record to be defined to have all the columns in the preview
        if (i === 0) {
          schema.data.columns.forEach((column) => {
            if (record[column.name] === undefined) {
              record[column.name] = "";
            }
          });
        }

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
        sanitizeHtml(JSON.stringify(flattenRecords))
      );
    };
  },
};
