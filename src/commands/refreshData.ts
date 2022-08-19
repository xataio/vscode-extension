import { createTreeItemCommand } from "../types";

export const refrshDataCommand = createTreeItemCommand({
  id: "refreshData",
  title: "Refresh data",
  contexts: [
    {
      item: "table",
      view: "xataExplorer",
      group: "inline",
    },
    {
      item: "table",
      view: "xataProject",
      group: "inline",
    },
  ],
  icon: "refresh",
  action: (_, refresh) => {
    return () => refresh();
  },
});
