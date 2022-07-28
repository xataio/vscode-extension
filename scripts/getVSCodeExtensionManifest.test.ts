/* eslint-disable @typescript-eslint/naming-convention */
import assert from "assert";
import { describe, expect, it, vi } from "vitest";
import {
  Commands,
  getVSCodeExtensionManifest,
} from "./getVSCodeExtensionManifest";
import { VSCodeExtensionsManifest } from "./vscodeExtensionsManifest";
import { writeFileSync, readFileSync } from "fs";

import * as registeredCommands from "../src/commands";
import { createTreeItemCommand } from "../src/types";

vi.mock("vscode", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TreeItem: class {},
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Uri: {
    from: () => "",
  },
}));

describe("getVSCodeExtensionManifest", () => {
  /**
   * We are using vitest as runner for this task.
   *
   * Why? Because `vscode` module is not defined outside of vscode instance, so we need to mock it
   *
   * Another option will be to use webpack for this (mocking the `vscode` module), but this solution is most straight forward and also run in CI.
   */
  it("should be sync with package.json", () => {
    const packageJson = JSON.parse(readFileSync("package.json", "utf-8"));
    const manifest = getVSCodeExtensionManifest(
      Object.values(registeredCommands)
    );

    const updatedPackageJson = {
      ...packageJson,
      contributes: {
        ...packageJson.contributes,
        ...manifest.contributes,
      },
    };

    try {
      expect(updatedPackageJson).toEqual(packageJson);
    } catch (e) {
      // This will be executed in watch mode ONCE!
      // So we don't have infinity loop due to the file watching mechanism
      writeFileSync(
        "package.json",
        JSON.stringify(updatedPackageJson, null, 2),
        "utf-8"
      );
      throw e; // Make sure we don't miss a test failure
    }
  });

  it("should generate a `xata.commandId` in contributes:commands", () => {
    const commands: Commands = [
      {
        type: "global",
        id: "commandId",
        title: "My command",
        action: () => () => {},
      },
    ];
    const expected: VSCodeExtensionsManifest = {
      contributes: {
        commands: [
          {
            command: "xata.commandId",
            title: "My command",
          },
        ],
      },
    };
    expectCommands(getVSCodeExtensionManifest(commands), expected);
  });

  it("should generate a `xata.commandId` with an icon", () => {
    const commands: Commands = [
      {
        type: "global",
        id: "commandId",
        icon: "rocket",
        title: "My command",
        action: () => () => {},
      },
    ];
    const expected: VSCodeExtensionsManifest = {
      contributes: {
        commands: [
          {
            command: "xata.commandId",
            title: "My command",
            icon: "$(rocket)",
          },
        ],
      },
    };
    expectCommands(getVSCodeExtensionManifest(commands), expected);
  });

  it("should generate a `xata.palette.commandId` with an icon", () => {
    const commands: Commands = [
      {
        type: "global",
        id: "commandId",
        icon: "rocket",
        inPalette: true,
        title: "My command",
        action: () => () => {},
      },
    ];
    const expected: VSCodeExtensionsManifest = {
      contributes: {
        commands: [
          {
            command: "xata.commandId",
            title: "My command", // No prefix in the xata context
            icon: "$(rocket)",
          },
          {
            command: "xata.palette.commandId",
            title: "Xata: My command", // Always prefix in the palette
            icon: "$(rocket)",
          },
        ],
      },
    };
    expectCommands(getVSCodeExtensionManifest(commands), expected);
  });

  it("should generate a stand-alone command", () => {
    const commands: Commands = [
      {
        type: "standAlone",
        id: "commandId",
        title: "My command",
        action: () => async () => {},
      },
    ];
    const expected: VSCodeExtensionsManifest = {
      contributes: {
        commands: [
          {
            command: "xata.commandId",
            title: "My command", // Always prefix when stand-alone
          },
        ],
      },
    };
    expectCommands(getVSCodeExtensionManifest(commands), expected);
  });

  it("should generate a tree-item command", () => {
    const commands: Commands = [
      {
        type: "treeItem",
        id: "commandId",
        icon: "account",
        contexts: [{ item: "branch", view: "xataExplorer" }],
        title: "My command",
      },
    ];
    const expected: VSCodeExtensionsManifest = {
      contributes: {
        commands: [
          {
            command: "xata.commandId",
            title: "My command", // No prefix in the xata context
            icon: "$(account)",
          },
        ],
      },
    };
    expectCommands(getVSCodeExtensionManifest(commands), expected);
  });

  it("should generate an item in the context menu for tree item (xataExplorer)", () => {
    const command = createTreeItemCommand({
      id: "commandId",
      contexts: [{ item: "branch", view: "xataExplorer" }],
      icon: "account",
      title: "My command",
      action: () => async () => {},
    });

    const expected: VSCodeExtensionsManifest = {
      contributes: {
        menus: {
          "view/item/context": [
            {
              command: "xata.commandId",
              when: "view == xataExplorer && viewItem == branch",
            },
          ],
        },
      },
    };
    expectMenuItemContext(getVSCodeExtensionManifest([command]), expected);
  });

  it("should generate an item in the context menu for tree item (xataWorkspace)", () => {
    const command = createTreeItemCommand({
      id: "commandId",
      contexts: [
        { item: "branch", view: "xataWorkspace" },
        { item: "column", view: "xataWorkspace" },
      ],
      icon: "account",
      title: "My command",
      action: () => async () => {},
    });

    const expected: VSCodeExtensionsManifest = {
      contributes: {
        menus: {
          "view/item/context": [
            {
              command: "xata.commandId",
              when: "view == xataWorkspace && viewItem == branch",
            },
            {
              command: "xata.commandId",
              when: "view == xataWorkspace && viewItem == column",
            },
          ],
        },
      },
    };
    expectMenuItemContext(getVSCodeExtensionManifest([command]), expected);
  });

  it("should generate an item in the context menu for tree item (xataWorkspace & xataExplorer)", () => {
    const command = createTreeItemCommand({
      id: "commandId",
      contexts: [
        { item: "branch", view: "xataExplorer", group: "inline" },
        { item: "column", view: "xataExplorer", group: "inline" },
        { item: "branch", view: "xataWorkspace", group: "inline" },
        { item: "column", view: "xataWorkspace", group: "inline" },
      ],
      icon: "account",
      title: "My command",
      action: () => async () => {},
    });

    const expected: VSCodeExtensionsManifest = {
      contributes: {
        menus: {
          "view/item/context": [
            {
              command: "xata.commandId",
              when: "view == xataExplorer && viewItem == branch",
              group: "inline",
            },
            {
              command: "xata.commandId",
              when: "view == xataExplorer && viewItem == column",
              group: "inline",
            },
            {
              command: "xata.commandId",
              when: "view == xataWorkspace && viewItem == branch",
              group: "inline",
            },
            {
              command: "xata.commandId",
              when: "view == xataWorkspace && viewItem == column",
              group: "inline",
            },
          ],
        },
      },
    };
    expectMenuItemContext(getVSCodeExtensionManifest([command]), expected);
  });
});

/**
 * Helpers to isolate `contributes.commands` expectation.
 */
function expectCommands(
  a: VSCodeExtensionsManifest,
  b: VSCodeExtensionsManifest
) {
  assert(a.contributes?.commands);
  assert(b.contributes?.commands);

  expect(a.contributes.commands).toEqual(b.contributes.commands);
}

/**
 * Helpers to isolate `contributes.menus.view/item/context` expectation.
 */
function expectMenuItemContext(
  a: VSCodeExtensionsManifest,
  b: VSCodeExtensionsManifest
) {
  assert(a.contributes?.menus?.["view/item/context"]);
  assert(b.contributes?.menus?.["view/item/context"]);

  expect(a.contributes?.menus?.["view/item/context"]).toEqual(
    b.contributes?.menus?.["view/item/context"]
  );
}
