import crypto from "crypto";

abstract class CryptoAdapter {
  abstract getPublicKey(): Promise<string>;
  abstract encrypt(data: string): Promise<string>;
  abstract decrypt(data: string): Promise<string>;
}

/**
 * Crypto adapter for webworker environment (vscode.dev)
 */
class CryptoBrowserAdapter implements CryptoAdapter {
  private publicKey: CryptoKey | undefined;
  private privateKey: CryptoKey | undefined;

  constructor() {
    this.generateKeys();
  }

  private async generateKeys() {
    const keys = await self.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"]
    );

    this.publicKey = keys.publicKey;
    this.privateKey = keys.privateKey;
  }

  async getPublicKey() {
    if (!this.publicKey) {
      throw new Error("Public key not available");
    }
    const exported = await self.crypto.subtle.exportKey("spki", this.publicKey);

    return this.ab2str(exported);
  }

  async encrypt(data: string): Promise<string> {
    if (!this.publicKey) {
      throw new Error("Public key not available");
    }

    const enc = new TextEncoder();
    const ciphertext = await self.crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      this.publicKey,
      enc.encode(data)
    );

    return this.ab2str(ciphertext);
  }

  async decrypt(data: string): Promise<string> {
    if (!this.privateKey) {
      throw new Error("Private key not available");
    }

    const decrypted = await self.crypto.subtle.decrypt(
      { name: "RSA-OAEP" },
      this.privateKey,
      Buffer.from(data.replace(/ /g, "+"), "base64")
    );

    const dec = new TextDecoder();
    return dec.decode(decrypted);
  }

  /*
   * Convert an ArrayBuffer into a string
   * from https://developer.chrome.com/blog/how-to-convert-arraybuffer-to-and-from-string/
   **/
  private ab2str(buf: ArrayBuffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
  }
}

/**
 * Crypto adapter for nodejs environment (vscode desktop)
 */
class CryptoNodeAdapter implements CryptoAdapter {
  private passphrase: string;
  private publicKey: string;
  private privateKey: string;

  constructor() {
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

    this.passphrase = passphrase;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  async getPublicKey() {
    return this.publicKey
      .replace(/\n/g, "")
      .replace("-----BEGIN PUBLIC KEY-----", "")
      .replace("-----END PUBLIC KEY-----", "");
  }

  async encrypt(data: string) {
    return crypto
      .privateEncrypt(
        { key: this.privateKey, passphrase: this.passphrase },
        Buffer.from(data)
      )
      .toString("base64");
  }

  async decrypt(data: string) {
    const privKey = crypto.createPrivateKey({
      key: this.privateKey,
      passphrase: this.passphrase,
    });
    return crypto
      .privateDecrypt(privKey, Buffer.from(data.replace(/ /g, "+"), "base64"))
      .toString("utf8");
  }
}

const instance =
  process.env.VSCODE_ENV === "browser"
    ? new CryptoBrowserAdapter()
    : new CryptoNodeAdapter();

export default instance;
