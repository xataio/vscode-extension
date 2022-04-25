import { readFileSync } from "fs";
import { join } from "path";
import { describe, it, expect, vi } from "vitest";

import * as commands from ".";

vi.mock("vscode", () => ({}));

describe("commands", () => {
  const packageJSON = JSON.parse(
    readFileSync(join(__dirname, "../../package.json"), "utf-8")
  );

  // Check if every commands are declared in package.json
  Object.values(commands).forEach((command) => {
    const contributeCommand = packageJSON.contributes.commands.find(
      (c: { command: string; icon?: string; title: string }) =>
        c.command === command.id
    );

    it(`should have "${command.id}" declared in package.json:contributes:commands`, () => {
      expect(contributeCommand).toBeDefined();
    });

    if (command.icon) {
      it(`should have the "${command.icon}" icon for "${command.id}"`, () => {
        expect(contributeCommand.icon).toEqual(`$(${command.icon})`);
      });
    }

    if (command.type === "treeItem") {
      it(`should have "${command.id}" not part of the commandPalette`, () => {
        expect(
          packageJSON.contributes.menus.commandPalette.find(
            (c: { command: string }) => c.command === command.id
          )
        ).toEqual({
          command: command.id,
          when: "false",
        });
      });

      it(`should have "${command.id}" declared as a view/item/context`, () => {
        expect(
          packageJSON.contributes.menus["view/item/context"].find(
            (c: { command: string }) => c.command === command.id
          )?.when
        ).toMatch(/view == xataExplorer && viewItem == /);
      });
    }

    if (command.type === "global") {
      if (command.hideFromCommandPalette) {
        it(`should not start with "Xata:" prefix (${command.id})`, () => {
          expect(
            packageJSON.contributes.commands
              .find((c: { command: string }) => c.command === command.id)
              .title.startsWith("Xata: ")
          ).toBe(false);
        });
      } else {
        it(`should start with "Xata:" prefix (${command.id})`, () => {
          expect(
            packageJSON.contributes.commands
              .find((c: { command: string }) => c.command === command.id)
              .title.startsWith("Xata: ")
          ).toBe(true);
        });
      }
    }
  });
});
