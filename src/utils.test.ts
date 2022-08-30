import { describe, expect, it, vi } from "vitest";
import { getFlattenColumns, validateResourceName } from "./utils";

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
