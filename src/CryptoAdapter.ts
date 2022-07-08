/**
 * Helpers around crypto.subtle
 */
class CryptoAdapter {
  private publicKey: CryptoKey | undefined;
  private privateKey: CryptoKey | undefined;

  constructor(private subtle: SubtleCrypto) {}

  async generateKeys() {
    const keys = await this.subtle.generateKey(
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
      throw new Error(
        "Public key not available, please call `generateKeys() first`"
      );
    }
    const exported = await this.subtle.exportKey("spki", this.publicKey);

    return this.ab2str(exported);
  }

  async decrypt(data: string): Promise<string> {
    if (!this.privateKey) {
      throw new Error(
        "Private key not available, please call `generateKeys() first`"
      );
    }

    const decrypted = await this.subtle.decrypt(
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

const instance =
  process.env.VSCODE_ENV === "browser"
    ? new CryptoAdapter(self.crypto.subtle)
    : new CryptoAdapter(require("node:crypto").webcrypto.subtle);

export default instance;
