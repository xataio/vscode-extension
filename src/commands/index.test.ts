import { readFileSync } from "fs";
import { join } from "path";
import { describe, it, expect, vi } from "vitest";

import * as commands from ".";

vi.mock("vscode", () => ({
  window: {
    showInformationMessage(message: string) {},
  },
}));

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

    it(`should have "${command.id}" declared in package.json:activationEvents`, () => {
      expect(activationEvents.includes(`onCommand:${command.id}`)).toBe(true);
    });
  });

  // Check if every command starts with "Xata: " prefix
  packageJSON.contributes.commands.forEach(
    (command: { title: string; command: string }) => {
      it(`should start with "Xata:" prefix (${command.command})`, () => {
        expect(command.title.startsWith("Xata: ")).toBe(true);
      });
    }
  );
});
