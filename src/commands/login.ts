import * as vscode from "vscode";
import crypto from "crypto";
import { Command } from "../types";
import { Context } from "../context";

/**
 * Command to ask for xata token
 */
export const loginCommand: Command = {
  id: "login",
  type: "global",
  inPalette: true,
  action(context, refresh) {
    return async () => {
      const token =
        process.env.VSCODE_ENV === "browser"
          ? await vscode.window.showInputBox({
              prompt: "Paste your xata personal access token",
              ignoreFocusOut: true,
            })
          : await createAPIKeyThroughWebUI(context);

      if (token) {
        await context.setToken(token);
        return refresh("explorer");
      }
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
  const { publicKey, privateKey, passphrase } = await context.generateKeys();

  const redirect = await vscode.env.asExternalUri(
    vscode.Uri.parse(`${vscode.env.uriScheme}://xata.xata`)
  );

  const pub = publicKey
    .replace(/\n/g, "")
    .replace("-----BEGIN PUBLIC KEY-----", "")
    .replace("-----END PUBLIC KEY-----", "");
  const data = Buffer.from(
    JSON.stringify({
      name: "Xata VSCode extension",
      redirect: redirect.toString(),
    })
  );
  const info = crypto
    .privateEncrypt({ key: privateKey, passphrase }, data)
    .toString("base64");
  return `${context.getAppBaseUrl()}/new-api-key?pub=${encodeURIComponent(
    pub
  )}&info=${encodeURIComponent(info)}`;
}

async function createAPIKeyThroughWebUI(context: Context) {
  const openURL = await generateURL(context);
  vscode.env.openExternal(vscode.Uri.parse(openURL));

  // The token will be retrieve and set in the AuthUriHandler.
}
