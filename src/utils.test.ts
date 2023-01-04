import { describe, expect, it, vi } from "vitest";
import {
  getFlattenColumns,
  DatabaseUrl,
  parseDatabaseUrl,
  validateResourceName,
} from "./utils";

vi.mock("vscode", () => ({}));

describe("validateResourceName", () => {
  const validateInput = validateResourceName("branch", ["foo", "bar"]);

  it("should allow name with dash", () => {
    expect(validateInput("my-branch")).toBeUndefined();
  });

  it("should allow non existing branch", () => {
    expect(validateInput("myBranch")).toBeUndefined();
  });

  it("should disallow existing branch", () => {
    expect(validateInput("foo")).toBe("branch already exists");
  });

  it("should disallow exotic name", () => {
    expect(validateInput("🥸")).toBe(
      "only alphanumerics and '-', '_', or '~' are allowed"
    );
  });
});

describe("getFlattenColumns", () => {
  it("should extract all column's names", () => {
    expect(
      getFlattenColumns([
        { name: "email", type: "email" },
        {
          name: "address",
          type: "object",
          columns: [
            { name: "number", type: "int" },
            { name: "line1", type: "text" },
            { name: "line2", type: "text" },
          ],
        },
      ])
    ).toEqual(["email", "address.number", "address.line1", "address.line2"]);
  });
});

describe("parseUrl", () => {
  it("should parse production url", () => {
    const expected: DatabaseUrl = {
      regionId: "eu-west-1",
      databaseName: "default-value",
      workspaceId: "demo-07kttr",
      baseUrl: "https://demo-07kttr.eu-west-1.xatabase.co",
    };

    expect(
      parseDatabaseUrl(
        "https://demo-07kttr.eu-west-1.xatabase.co/db/default-value"
      )
    ).toEqual(expected);
  });
  it("should parse production url (without region)", () => {
    const expected: DatabaseUrl = {
      regionId: "eu-west-1",
      databaseName: "default-value",
      workspaceId: "demo-07kttr",
      baseUrl: "https://demo-07kttr.xatabase.co",
    };

    expect(
      parseDatabaseUrl("https://demo-07kttr.xatabase.co/db/default-value")
    ).toEqual(expected);
  });
  it("should parse staging url", () => {
    const expected: DatabaseUrl = {
      regionId: "eu-west-1",
      databaseName: "default-value",
      workspaceId: "demo-07kttr",
      baseUrl: "https://demo-07kttr.staging.eu-west-1.xatabase.co",
    };

    expect(
      parseDatabaseUrl(
        "https://demo-07kttr.staging.eu-west-1.xatabase.co/db/default-value"
      )
    ).toEqual(expected);
  });

  it("should parse staging url (without region)", () => {
    const expected: DatabaseUrl = {
      regionId: "eu-west-1",
      databaseName: "default-value",
      workspaceId: "demo-07kttr",
      baseUrl: "https://demo-07kttr.staging.xatabase.co",
    };

    expect(
      parseDatabaseUrl(
        "https://demo-07kttr.staging.xatabase.co/db/default-value"
      )
    ).toEqual(expected);
  });

  it("should parse localhost url", () => {
    const expected: DatabaseUrl = {
      regionId: "eu-west-1",
      databaseName: "default-value",
      workspaceId: "demo-07kttr",
      baseUrl: "https://demo-07kttr.localhost:1337",
    };

    expect(
      parseDatabaseUrl("https://demo-07kttr.localhost:1337/db/default-value")
    ).toEqual(expected);
  });
});
