import {
  generateSchemaTypes,
  generateFetchers,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  xata: {
    from: {
      source: "github",
      owner: "xataio",
      repository: "openapi",
      ref: "main",
      specPath: "bundled/openapi.yaml",
    },
    outputDir: "src/xata",
    to: async (context) => {
      const filenamePrefix = "xata";
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
