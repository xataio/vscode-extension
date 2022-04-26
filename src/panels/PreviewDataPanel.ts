import * as vscode from "vscode";
import { Context } from "../context";
import { getUri } from "../utils";

interface XataTablePath {
  workspaceId: string;
  databaseName: string;
  branchName: string;
  tableName: string;
}

/**
 * Panel to display table data as preview
 */
export class PreviewDataPanel {
  private disposables: vscode.Disposable[] = [];
  public static previewPanels: Map<string, PreviewDataPanel> = new Map();

  constructor(
    private context: Context,
    private panel: vscode.WebviewPanel,
    public uid: string,
    data: string
  ) {
    this.panel.onDidDispose(this.dispose.bind(this), null, this.disposables);
    this.panel.webview.html = this.getWebviewContent(this.panel.webview, data);
    this.panel.iconPath = {
      light: vscode.Uri.joinPath(context.extensionUri, "media/xata-icon.svg"),
      dark: vscode.Uri.joinPath(
        context.extensionUri,
        "media/xata-icon-dark.svg"
      ),
    };
  }

  public static render(context: Context, table: XataTablePath, data: string) {
    const tableUid = PreviewDataPanel.getXataTableUid(table);
    const openedPanel = PreviewDataPanel.previewPanels.get(tableUid);
    if (openedPanel) {
      openedPanel.panel.reveal(vscode.ViewColumn.One);
    } else {
      const panel = vscode.window.createWebviewPanel(
        "xata-preview-data",
        `${table.databaseName}:${table.branchName}/${table.tableName}`,
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );
      PreviewDataPanel.previewPanels.set(
        tableUid,
        new PreviewDataPanel(context, panel, tableUid, data)
      );
    }
  }

  public dispose() {
    PreviewDataPanel.previewPanels.delete(this.uid);
    this.panel.dispose();

    this.disposables.forEach((i) => i.dispose());
    this.disposables = [];
  }

  private getWebviewContent(webview: vscode.Webview, data: string) {
    const toolkitUri = getUri(
      webview,
      this.context.extensionUri,
      "node_modules/@vscode/webview-ui-toolkit/dist/toolkit.min.js"
    );

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script type="module" src="${toolkitUri}"></script>
          <title>Xata preview data</title>
        </head>
        <body>
        ${data === "[]" ? /*html*/ `<p>No records found</p>` : ""}
        <vscode-data-grid id="xata-preview" generate-header="sticky" aria-label="Preview of xata records"></vscode-data-grid>
        <script>
          document.getElementById("xata-preview").rowsData = ${data};
        </script>
        </body>
      </html>
    `;
  }

  public static getXataTableUid({
    workspaceId,
    databaseName,
    branchName,
    tableName,
  }: XataTablePath) {
    return `${workspaceId}/${databaseName}:${branchName}/${tableName}`;
  }
}
