import * as vscode from "vscode";
import { Context } from "../context";
import { XataTablePath } from "../types";
import { getUri } from "../utils";

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
    private path: XataTablePath,
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
      PreviewDataPanel.previewPanels.set(
        tableUid,
        new PreviewDataPanel(context, openedPanel.panel, tableUid, table, data)
      );
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
        new PreviewDataPanel(context, panel, tableUid, table, data)
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
    const codiconsUri = getUri(
      webview,
      this.context.extensionUri,
      "node_modules/@vscode/codicons/dist/codicon.css"
    );

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script type="module" src="${toolkitUri}"></script>
          <link href="${codiconsUri}" rel="stylesheet" />
          <style>
            a {
              text-decoration: none;
            }
            .top-bar {
              display: flex;
              justify-content: flex-end;
              padding: 4px 0;
            }
          </style>
          <title>Xata preview data</title>
        </head>
        <body>
        <div class="top-bar">
          <a href="${this.context.getAppLink(this.path)}">
            <vscode-button appearance="primary">
              Open in Xata
              <span slot="start" class="codicon codicon-link-external"></span>
            </vscode-button>
          </a>
        </div>
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
