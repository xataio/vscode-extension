import * as vscode from "vscode";
import crypto from "crypto";
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

    const { privateKey, passphrase } = await this.context.retrieveKeys();
    if (!privateKey || !passphrase) {
      vscode.window.showErrorMessage("No key generated");
      return;
    }

    const privKey = crypto.createPrivateKey({ key: privateKey, passphrase });
    const apiKey = crypto
      .privateDecrypt(privKey, Buffer.from(key.replace(/ /g, "+"), "base64"))
      .toString("utf8");

    await this.context.setToken(apiKey);
    this.refresh("explorer");
  }
}
