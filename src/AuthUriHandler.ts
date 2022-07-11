import * as vscode from "vscode";
import crypto from "./CryptoAdapter";
import { Context } from "./context";
import { RefreshAction } from "./types";

/**
 * Handle `vscode://xata.xata?key=abc` uri.
 *
 * This is part of the login command flow.
 */
export class AuthUriHandler implements vscode.UriHandler {
  constructor(private context: Context, private refresh: RefreshAction) {}

  async handleUri(uri: vscode.Uri) {
    const searchParams = new URLSearchParams(uri.query);

    const key = searchParams.get("key");
    if (!key) {
      vscode.window.showErrorMessage("Missing key parameter");
      return;
    }

    try {
      const apiKey = await crypto.decrypt(key);
      await this.context.setToken(apiKey);
      this.refresh("explorer");
    } catch {
      vscode.window.showErrorMessage("Can't decrypt the apiKey");
    }
  }
}
