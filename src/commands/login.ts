import * as vscode from "vscode";
import crypto from "crypto";
import http from "http";
import path from "path";
import { AddressInfo } from "net";
import { Command } from "../types";

/**
 * Command to ask for xata token
 */
export const loginCommand: Command = {
  id: "login",
  type: "global",
  inPalette: true,
  action(context, refresh) {
    return async () => {
      const token = await createAPIKeyThroughWebUI(context.extensionUri.path);

      if (token) {
        await context.setToken(token);
        return refresh("explorer");
      }
    };
  },
};

function handler(
  privateKey: string,
  passphrase: string,
  extensionPath: string,
  callback: (apiKey: string) => void
) {
  return async (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (!req.url) {
      res.writeHead(422);
      return res.end();
    }
    try {
      if (req.method !== "GET") {
        res.writeHead(405);
        return res.end();
      }

      const parsedURL = new URL(req.url, `http://${req.headers.host}`);
      if (parsedURL.pathname !== "/") {
        res.writeHead(404);
        return res.end();
      }

      if (!parsedURL.searchParams.get("key")) {
        res.writeHead(400);
        return res.end("Missing key parameter");
      }
      const privKey = crypto.createPrivateKey({ key: privateKey, passphrase });
      const apiKey = crypto
        .privateDecrypt(
          privKey,
          Buffer.from(
            String(parsedURL.searchParams.get("key")).replace(/ /g, "+"),
            "base64"
          )
        )
        .toString("utf8");
      await renderSuccessPage(res, extensionPath);
      req.destroy();
      callback(apiKey);
    } catch (err) {
      res.writeHead(500);
      res.end(
        `Something went wrong: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }
  };
}

async function renderSuccessPage(
  res: http.ServerResponse,
  extensionPath: string
) {
  res.writeHead(200, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "Content-Type": "text/html",
  });

  const apiKeySuccessPage = vscode.Uri.file(
    path.join(extensionPath, "media", "api-key-success.html")
  );

  res.end(await vscode.workspace.fs.readFile(apiKeySuccessPage), "utf-8");
}

function generateURL(
  port: number,
  publicKey: string,
  privateKey: string,
  passphrase: string
) {
  const pub = publicKey
    .replace(/\n/g, "")
    .replace("-----BEGIN PUBLIC KEY-----", "")
    .replace("-----END PUBLIC KEY-----", "");
  const data = Buffer.from(
    JSON.stringify({ name: "Xata CLI", redirect: `http://localhost:${port}` })
  );
  const info = crypto
    .privateEncrypt({ key: privateKey, passphrase }, data)
    .toString("base64");
  return `https://app.xata.io/new-api-key?pub=${encodeURIComponent(
    pub
  )}&info=${encodeURIComponent(info)}`;
}

function generateKeys() {
  const passphrase = crypto.randomBytes(32).toString("hex");
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase,
    },
  });
  return { publicKey, privateKey, passphrase };
}

async function createAPIKeyThroughWebUI(extensionPath: string) {
  const { publicKey, privateKey, passphrase } = generateKeys();

  return new Promise<string>((resolve) => {
    const server = http.createServer(
      handler(privateKey, passphrase, extensionPath, (apiKey) => {
        resolve(apiKey);
        server.close();
      })
    );
    server.listen(() => {
      const { port } = server.address() as AddressInfo;
      const openURL = generateURL(port, publicKey, privateKey, passphrase);
      vscode.env.openExternal(vscode.Uri.parse(openURL));
    });
  });
}
