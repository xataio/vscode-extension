import {
  generateSchemaTypes,
  generateFetchers,
  renameComponent,
} from "@openapi-codegen/typescript";
import { isSchemaObject } from "openapi3-ts";
import { defineConfig } from "@openapi-codegen/cli";
import ts from "typescript";
import { readFile } from "fs/promises";
import { Context } from "@openapi-codegen/cli/lib/types";

const { factory: f } = ts;

export default defineConfig({
  // Workspace API  https://website-git-multi-region-xata.vercel.app/docs/web-api/contexts#workspace-api
  xataWorkspace: {
    from: {
      source: "github",
      owner: "xataio",
      ref: "main",
      repository: "xata",
      specPath: "openapi/bundled/xata_sh.yaml",
    },
    outputDir: "src/xataWorkspace",
    to: async (context) => {
      if (
        isSchemaObject(context.openAPIDocument.components!.schemas!.Column) &&
        isSchemaObject(
          context.openAPIDocument.components!.schemas!.Column.properties!.type
        )
      ) {
        const xataColumnTypes = context.openAPIDocument.components!.schemas!
          .Column.properties!.type.enum as string[];

        context.writeFile(
          "xataColumnTypes.ts",
          `// Generated by @openapi-codegen\n\n export const xataColumnTypes = ${JSON.stringify(
            xataColumnTypes
          )} as const`
        );

        const iconsDeclaration = await generateColumnIcons(xataColumnTypes);

        const printer = ts.createPrinter();

        context.writeFile(
          "xataColumnIcons.ts",
          `// Generated by @openapi-codegen\n import { Uri } from "vscode";\n\n${printer.printNode(
            ts.EmitHint.Unspecified,
            iconsDeclaration,
            ts.createSourceFile(
              "xataColumnIcons.ts",
              "",
              ts.ScriptTarget.Latest
            )
          )}`
        );
      }

      const filenamePrefix = "xataWorkspace";

      // Avoid conflict with typescript `Record<>` type helper
      context.openAPIDocument = renameComponent({
        openAPIDocument: context.openAPIDocument,
        from: "#/components/schemas/Record",
        to: "#/components/schemas/XataRecord",
      });

      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateFetchers(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },

  // Core API https://website-git-multi-region-xata.vercel.app/docs/web-api/contexts#core-api
  xataCore: {
    from: {
      source: "github",
      owner: "xataio",
      ref: "main",
      repository: "xata",
      specPath: "openapi/bundled/api_xata_io.yaml",
    },
    outputDir: "./src/xataCore",
    to: async (context) => {
      const filenamePrefix = "xataCore";

      context.openAPIDocument = removeDraftPaths({
        openAPIDocument: context.openAPIDocument,
      });

      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateFetchers(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});

/**
 * Generate a set of icons compatible with the web extension (vscode.dev).
 *
 * @see https://github.com/microsoft/vscode/issues/141303#issuecomment-1020795448
 *
 * @param icons icon lists
 * @returns variable statement with all the icons inlined
 */
async function generateColumnIcons(icons: string[]) {
  return f.createVariableStatement(
    [f.createModifier(ts.SyntaxKind.ExportKeyword)],
    f.createVariableDeclarationList(
      [
        f.createVariableDeclaration(
          f.createIdentifier("xataColumnIcons"),
          undefined,
          undefined,
          f.createObjectLiteralExpression(
            await Promise.all(
              icons.map(async (icon) =>
                f.createPropertyAssignment(
                  f.createIdentifier(icon),
                  f.createObjectLiteralExpression(
                    [
                      f.createPropertyAssignment(
                        f.createIdentifier("light"),
                        generateIconUri(
                          (
                            await readFile(
                              `media/columns/light/${icon}.svg`,
                              "utf-8"
                            )
                          ).toString()
                        )
                      ),
                      f.createPropertyAssignment(
                        f.createIdentifier("dark"),
                        generateIconUri(
                          (
                            await readFile(
                              `media/columns/dark/${icon}.svg`,
                              "utf-8"
                            )
                          ).toString()
                        )
                      ),
                    ],
                    false
                  )
                )
              )
            ),
            true
          )
        ),
      ],
      ts.NodeFlags.Const
    )
  );
}

function generateIconUri(svg: string) {
  return f.createCallExpression(
    f.createPropertyAccessExpression(
      f.createIdentifier("Uri"),
      f.createIdentifier("from")
    ),
    undefined,
    [
      f.createObjectLiteralExpression(
        [
          f.createPropertyAssignment(
            f.createIdentifier("scheme"),
            f.createStringLiteral("data")
          ),
          f.createPropertyAssignment(
            f.createIdentifier("path"),
            f.createStringLiteral(
              `image/svg+xml;utf8,${svg
                .replace('<?xml version="1.0" encoding="UTF-8"?>', "")
                .replace(/[\n\r]/gm, "")}`
            )
          ),
        ],
        true
      ),
    ]
  );
}

function removeDraftPaths({
  openAPIDocument,
}: {
  openAPIDocument: Context["openAPIDocument"];
}) {
  const paths = Object.fromEntries(
    Object.entries(openAPIDocument.paths).map(([route, verbs]) => {
      const updatedVerbs = Object.entries(verbs).reduce(
        (acc, [verb, operation]) => {
          if (isVerb(verb) && isDraft(operation)) {
            return acc;
          }

          return { ...acc, [verb]: operation };
        },
        {}
      );

      return [route, updatedVerbs];
    })
  );

  return { ...openAPIDocument, paths };
}

const isVerb = (
  verb: string
): verb is "get" | "post" | "patch" | "put" | "delete" =>
  ["get", "post", "patch", "put", "delete"].includes(verb);

const isDraft = (operation: unknown) => {
  if (!operation || typeof operation !== "object") {
    return false;
  }

  return (operation as Record<string, unknown>)["x-draft"] === true;
};
