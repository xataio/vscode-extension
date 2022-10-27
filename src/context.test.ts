import { describe, expect, it, vi } from "vitest";
import ts, { TypeAliasDeclaration } from "typescript";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

describe("context", () => {
  describe("getColumnIcon", () => {
    const xataSchemasColumnTypes = getXataSchemasColumnTypes();
    xataSchemasColumnTypes.forEach((typeName) => {
      it(`should have a light icon for "${typeName}"`, () => {
        expect(
          existsSync(join(__dirname, `../media/columns/light/${typeName}.svg`))
        ).toBe(true);
      });

      it(`should have a dark icon for "${typeName}"`, () => {
        expect(
          existsSync(join(__dirname, `../media/columns/dark/${typeName}.svg`))
        ).toBe(true);
      });
    });
  });
});

/**
 * Find and return a typescript node in a sourcefile.
 */
function findNode<TNode extends ts.Node>(
  sourceFile: ts.SourceFile,
  predicate: (node: ts.Node) => node is TNode
) {
  let declarationNode: TNode | undefined;

  const visitor = (node: ts.Node) => {
    if (!declarationNode && predicate(node)) {
      declarationNode = node;
    }
  };
  ts.forEachChild(sourceFile, visitor);

  return declarationNode;
}

/**
 * Extract `Column.type` from `xataSchemas.ts`
 *
 * @returns list of available types
 */
function getXataSchemasColumnTypes() {
  const sourceText = readFileSync(
    join(__dirname, "xataWorkspace/xataWorkspaceSchemas.ts"),
    "utf-8"
  );

  const sourceFile = ts.createSourceFile(
    "xataWorkspaceSchemas.ts",
    sourceText,
    ts.ScriptTarget.Latest
  );

  const columnTypeNode = findNode(
    sourceFile,
    (node): node is TypeAliasDeclaration =>
      ts.isTypeAliasDeclaration(node) && node.name.escapedText === "Column"
  );

  if (!columnTypeNode) {
    throw new Error("Column type declaration not found!");
  }

  if (!ts.isTypeLiteralNode(columnTypeNode.type)) {
    throw new Error("Column type should be a type literal!");
  }

  const typeProperty = columnTypeNode.type.members.find((m) => {
    if (!ts.isPropertySignature(m)) {
      return false;
    }

    // @ts-expect-error
    return m.name.escapedText === "type";
  });

  if (
    !typeProperty ||
    !ts.isPropertySignature(typeProperty) ||
    !typeProperty.type ||
    !ts.isUnionTypeNode(typeProperty.type)
  ) {
    throw new Error("Column.type not found!");
  }

  return typeProperty.type.types.map((type) => {
    if (!ts.isLiteralTypeNode(type)) {
      return "";
    }
    // @ts-expect-error
    return type.literal.text;
  });
}
