import * as vscode from "vscode";
import { Context } from "../context";

export class XataBranchStatus {
  private instance: vscode.StatusBarItem;

  constructor(private context: Context) {
    this.instance = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      100
    );

    this.instance.tooltip = "Xata branch";
    this.instance.command = "xata.createBranch";
    this.update();
  }

  public dispose() {
    this.instance.dispose();
  }

  public async update() {
    if (vscode.workspace.workspaceFolders?.length === 1) {
      const config = await this.context.getVSCodeWorkspaceEnvConfig(
        vscode.workspace.workspaceFolders[0].uri
      );
      if (!config) {
        this.instance.hide();
        return;
      }
      this.instance.text = `$(git-branch) ${config.branch}`;
      this.instance.show();
      return;
    }
    this.instance.hide();
  }
}
