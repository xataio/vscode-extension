import * as vscode from "vscode";
import crypto from "../CryptoAdapter";
import { Command } from "../types";
import { Context } from "../context";

/**
 * Command to ask for xata token
 */
export const loginCommand: Command = {
  id: "login",
  type: "global",
  inPalette: true,
  action(context) {
    return async () => {
      const openURL = await generateURL(context);
      vscode.env.openExternal(vscode.Uri.parse(openURL));
    };
  },
};

/**
 * Generate the xata url to create a new api key.
 *
 * @param context
 * @returns
 */
async function generateURL(context: Context) {
  const redirect = await vscode.env.asExternalUri(
    vscode.Uri.parse(`${vscode.env.uriScheme}://xata.xata`)
  );

  const pub = await crypto.getPublicKey();

  return `${context.getAppBaseUrl()}/new-api-key?pub=${encodeURIComponent(
    pub
  )}&name=${encodeURIComponent(
    "Xata VSCode extension"
  )}&redirect=${encodeURIComponent(redirect.toString())}`;
}
