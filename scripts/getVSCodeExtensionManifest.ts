import { Command, StandAloneCommand } from "../src/types";
import { Codicon } from "./codicon";
import { TreeItem } from "../src/views/treeItems/TreeItem";
import { VSCodeExtensionsManifest } from "./vscodeExtensionsManifest";

/**
 * Get all VS Code extension manifest for the `package.json`
 *
 * @doc https://code.visualstudio.com/api/references/contribution-points
 *
 * The idea of this helper is to take all the commands definitions from `src/commands` and generate contribution points ready to be inject into `package.json`.
 */
export function getVSCodeExtensionManifest(
  commands: Commands
): VSCodeExtensionsManifest {
  const contributesCommands: ContributesCommands = [];
  const contributeMenusCommandPalette: MenuCommandPalette = [];
  const contributeMenusItemContext: MenuItemContext = [];

  const hideFromPalette = (commandId: string) => {
    contributeMenusCommandPalette.push({
      command: commandId,
      when: "false",
    });
  };

  commands.forEach((command) => {
    // Global command
    if (command.type === "global") {
      const globalCommand: ContributesCommands[-1] = {
        command: `xata.${command.id}`,
        title: command.title,
      };

      if (command.icon) globalCommand.icon = `$(${command.icon})`;

      contributesCommands.push(globalCommand);
      hideFromPalette(`xata.${command.id}`);

      if (command.inPalette) {
        const commandId = `xata.palette.${command.id}`;
        const paletteCommand: ContributesCommands[-1] = {
          command: commandId,
          title: `Xata: ${command.title}`,
        };

        if (command.icon) paletteCommand.icon = `$(${command.icon})`;

        contributesCommands.push(paletteCommand);
        if (command.paletteCondition) {
          switch (command.paletteCondition) {
            case "isLogged":
              contributeMenusCommandPalette.push({
                command: commandId,
                when: "xata.isLogged",
              });
              break;
            case "isNotLogged":
              contributeMenusCommandPalette.push({
                command: commandId,
                when: "!xata.isLogged",
              });
              break;
            default:
              throw new Error("this condition is not handled");
          }
        }
      }
    }

    // StandAlone command
    if (command.type === "standAlone") {
      contributesCommands.push({
        command: `xata.${command.id}`,
        title: command.title,
      });
      hideFromPalette(`xata.${command.id}`);
    }

    // TreeItem command
    if (command.type === "treeItem") {
      const commandId = `xata.${command.id}`;
      const treeItemCommand: ContributesCommands[-1] = {
        command: commandId,
        title: command.title,
      };

      if (command.icon) treeItemCommand.icon = `$(${command.icon})`;

      contributesCommands.push(treeItemCommand);
      hideFromPalette(`xata.${command.id}`);

      command.contexts.forEach((context) => {
        if (context.item === "workspaceNavigationItem") return;

        const menuItem: MenuItemContext[-1] = {
          command: commandId,
          when: `view == ${context.view} && viewItem == ${context.item}`,
        };

        if (context.group) menuItem.group = context.group;

        contributeMenusItemContext.push(menuItem);
      });
    }
  });

  return {
    contributes: {
      commands: contributesCommands,
      menus: {
        commandPalette: contributeMenusCommandPalette,
        "view/item/context": contributeMenusItemContext,
        "view/title": [
          {
            command: "xata.refresh",
            when: "view in xata.treeViews",
            group: "navigation",
          },
          {
            command: "xata.addWorkspace",
            when: "view == xataExplorer && xata.isLogged",
          },
          {
            command: "xata.logout",
            when: "view == xataExplorer && xata.isLogged",
          },
          {
            command: "xata.login",
            when: "view == xataExplorer && !xata.isLogged",
          },
          {
            command: "xata.addTable",
            when: "view == xataProject && workspaceFolderCount == 1 && xata.configState == logged",
            group: "navigation",
          },
          {
            command: "xata.createBranch",
            when: "view == xataProject && workspaceFolderCount == 1 && xata.configState == logged",
            group: "navigation",
          },
        ],
      },
    },
  };
}

export type Commands = Array<
  | Command<any>
  | {
      type: "treeItem";
      id: string;
      title: string;
      icon: Codicon;
      contexts: Array<
        | {
            item: TreeItem["contextValue"];
            view: "xataExplorer" | "xataProject";
            group?: "inline" | "1_actions" | "5_templates";
          }
        | { item: "workspaceNavigationItem" }
      >;
    }
  | StandAloneCommand<any, any>
>;

type ContributesCommands = ArrayOnly<
  Required<Required<VSCodeExtensionsManifest>["contributes"]>["commands"]
>;

type MenuCommandPalette = Required<
  Required<Required<VSCodeExtensionsManifest>["contributes"]>["menus"]
>["commandPalette"];

type MenuItemContext = Required<
  Required<Required<VSCodeExtensionsManifest>["contributes"]>["menus"]
>["view/item/context"];

type ArrayOnly<T> = T extends Array<any> ? T : never;
