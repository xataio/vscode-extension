import { readFileSync } from "fs";
import { join } from "path";
import { describe, it, expect, vi } from "vitest";

import * as commands from ".";

vi.mock("vscode", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TreeItem: class {},
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Uri: {
    from: () => "",
  },
}));

describe("commands", () => {
  const packageJSON = JSON.parse(
    readFileSync(join(__dirname, "../../package.json"), "utf-8")
  );

  // Check if every commands are declared in package.json
  Object.values(commands).forEach((command) => {
    const contributeCommand = packageJSON.contributes.commands.find(
      (c: { command: string; icon?: string; title: string }) =>
        c.command === `xata.${command.id}`
    );

    it(`should have "xata.${command.id}" declared in package.json:contributes:commands`, () => {
      expect(contributeCommand).toBeDefined();
    });

    if (command.type !== "standAlone" && command.icon) {
      it(`should have the "${command.icon}" icon for "${command.id}"`, () => {
        expect(contributeCommand.icon).toEqual(`$(${command.icon})`);
      });
    }

    if (command.type === "treeItem") {
      it(`should have "${command.id}" not part of the commandPalette`, () => {
        expect(
          packageJSON.contributes.menus.commandPalette.find(
            (c: { command: string }) => c.command === `xata.${command.id}`
          )
        ).toEqual({
          command: `xata.${command.id}`,
          when: "false",
        });
      });

      it(`should have "${command.id}" declared as a view/item/context`, () => {
        const viewMatcher =
          command.views.length === 1 && command.views[0] === "xataExplorer"
            ? "view == xataExplorer"
            : command.views.length === 1 && command.views[0] === "xataWorkspace"
            ? "view == xataWorkspace"
            : "view in xata.treeViews";

        const commandDeclarations = packageJSON.contributes.menus[
          "view/item/context"
        ].filter(
          (c: { command: string }) => c.command === `xata.${command.id}`
        );

        if (commandDeclarations.length > 0) {
          // Complex cases as `xata.addTable`
          return;
        }

        expect(commandDeclarations[0].when).toMatch(
          new RegExp(`${viewMatcher} && viewItem == `)
        );
      });
    }

    if (command.type === "global") {
      if (command.inPalette) {
        it(`should start with "Xata:" prefix (${command.id})`, () => {
          expect(
            packageJSON.contributes.commands
              .find(
                (c: { command: string }) =>
                  c.command === `xata.palette.${command.id}`
              )
              .title.startsWith("Xata: ")
          ).toBe(true);
        });
      } else {
        it(`should not start with "Xata:" prefix (${command.id})`, () => {
          expect(
            packageJSON.contributes.commands
              .find(
                (c: { command: string }) => c.command === `xata.${command.id}`
              )
              .title.startsWith("Xata: ")
          ).toBe(false);
        });
      }
    }
  });
});
