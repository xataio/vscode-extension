import { readFileSync } from "fs";
import { join } from "path";
import { describe, it, expect, vi } from "vitest";

import * as commands from ".";

vi.mock("vscode", () => ({}));

describe("commands", () => {
  const packageJSON = JSON.parse(
    readFileSync(join(__dirname, "../../package.json"), "utf-8")
  );

  const contributesCommands: string[] = packageJSON.contributes.commands.map(
    (c: { command: string }) => c.command
  );

  const activationEvents: string[] = packageJSON.activationEvents;

  // Check if every commands are declared in package.json
  Object.values(commands).forEach((command) => {
    it(`should have "${command.id}" declared in package.json:contributes:commands`, () => {
      expect(contributesCommands.includes(command.id)).toBe(true);
    });

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
    }

    if (command.type === "global") {
      it(`should start with "Xata:" prefix (${command.id})`, () => {
        expect(
          packageJSON.contributes.commands
            .find((c: { command: string }) => c.command === command.id)
            .title.startsWith("Xata: ")
        ).toBe(true);
      });
    }
  });
});
