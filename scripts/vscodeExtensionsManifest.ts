// Generated types from `vscode://schemas/vscode-extensions`

export type VSCodeExtensionsManifest = {
  /*
   * Engine compatibility.
   */
  engines?: {
    /*
     * For VS Code extensions, specifies the VS Code version that the extension is compatible with. Cannot be *. For example: ^0.10.5 indicates compatibility with a minimum VS Code version of 0.10.5.
     *
     * @default ^1.22.0
     */
    vscode?: string;
  };
  /*
   * The publisher of the VS Code extension.
   */
  publisher?: string;
  /*
   * The display name for the extension used in the VS Code gallery.
   */
  displayName?: string;
  /*
   * The categories used by the VS Code gallery to categorize the extension.
   *
   * @uniqueItems true
   */
  categories?: (
    | (
        | "Azure"
        | "Data Science"
        | "Debuggers"
        | "Extension Packs"
        | "Education"
        | "Formatters"
        | "Keymaps"
        | "Language Packs"
        | "Linters"
        | "Machine Learning"
        | "Notebooks"
        | "Programming Languages"
        | "SCM Providers"
        | "Snippets"
        | "Testing"
        | "Themes"
        | "Visualization"
        | "Other"
      )
    | string
  )[];
  /*
   * Banner used in the VS Code marketplace.
   */
  galleryBanner?: {
    /*
     * The banner color on the VS Code marketplace page header.
     */
    color?: string;
    /*
     * The color theme for the font used in the banner.
     */
    theme?: "dark" | "light";
  };
  /*
   * All contributions of the VS Code extension represented by this package.
   *
   * @default {}
   */
  contributes?: {
    /*
     * Contributes configuration settings.
     */
    configuration?:
      | {
          /*
           * A title for the current category of settings. This label will be rendered in the Settings editor as a subheading. If the title is the same as the extension display name, then the category will be grouped under the main extension heading.
           */
          title?: string;
          /*
           * When specified, gives the order of this category of settings relative to other categories.
           */
          order?: number;
          /*
           * Description of the configuration properties.
           */
          properties?: {
            [key: string]: {
              isExecutable?: boolean;
              /*
               * @default window
               */
              scope?:
                | "application"
                | "machine"
                | "window"
                | "resource"
                | "language-overridable"
                | "machine-overridable";
              /*
               * Descriptions for enum values
               */
              enumDescriptions?: string[];
              /*
               * Descriptions for enum values in the markdown format.
               */
              markdownEnumDescriptions?: string[];
              /*
               * The description in the markdown format.
               */
              markdownDescription?: string;
              /*
               * If set, the property is marked as deprecated and the given message is shown as an explanation.
               */
              deprecationMessage?: string;
              /*
               * If set, the property is marked as deprecated and the given message is shown as an explanation in the markdown format.
               */
              markdownDeprecationMessage?: string;
              /*
               * When specified, controls the presentation format of the string setting.
               *
               * @default singlelineText
               */
              editPresentation?: "singlelineText" | "multilineText";
              /*
               * When specified, gives the order of this setting relative to other settings within the same category. Settings with an order property will be placed before settings without this property set.
               */
              order?: number;
            };
          };
        }
      | {
          /*
           * A title for the current category of settings. This label will be rendered in the Settings editor as a subheading. If the title is the same as the extension display name, then the category will be grouped under the main extension heading.
           */
          title?: string;
          /*
           * When specified, gives the order of this category of settings relative to other categories.
           */
          order?: number;
          /*
           * Description of the configuration properties.
           */
          properties?: {
            [key: string]: {
              isExecutable?: boolean;
              /*
               * @default window
               */
              scope?:
                | "application"
                | "machine"
                | "window"
                | "resource"
                | "language-overridable"
                | "machine-overridable";
              /*
               * Descriptions for enum values
               */
              enumDescriptions?: string[];
              /*
               * Descriptions for enum values in the markdown format.
               */
              markdownEnumDescriptions?: string[];
              /*
               * The description in the markdown format.
               */
              markdownDescription?: string;
              /*
               * If set, the property is marked as deprecated and the given message is shown as an explanation.
               */
              deprecationMessage?: string;
              /*
               * If set, the property is marked as deprecated and the given message is shown as an explanation in the markdown format.
               */
              markdownDeprecationMessage?: string;
              /*
               * When specified, controls the presentation format of the string setting.
               *
               * @default singlelineText
               */
              editPresentation?: "singlelineText" | "multilineText";
              /*
               * When specified, gives the order of this setting relative to other settings within the same category. Settings with an order property will be placed before settings without this property set.
               */
              order?: number;
            };
          };
        }[];
    /*
     * Contributes json schema configuration.
     */
    jsonValidation?: {
      /*
       * The file pattern (or an array of patterns) to match, for example "package.json" or "*.launch". Exclusion patterns start with '!'
       */
      fileMatch?: void;
      /*
       * A schema URL ('http:', 'https:') or relative path to the extension folder ('./').
       */
      url?: string;
    }[];
    /*
     * Contributes debug adapters.
     */
    debuggers?: {
      /*
       * Unique identifier for this debug adapter.
       */
      type?: string;
      /*
       * Display name for this debug adapter.
       */
      label?: string;
      /*
       * Path to the debug adapter program. Path is either absolute or relative to the extension folder.
       */
      program?: string;
      /*
       * Optional arguments to pass to the adapter.
       */
      args?: any[];
      /*
       * Optional runtime in case the program attribute is not an executable but requires a runtime.
       */
      runtime?: string;
      /*
       * Optional runtime arguments.
       */
      runtimeArgs?: any[];
      /*
       * Mapping from interactive variables (e.g. ${action.pickProcess}) in `launch.json` to a command.
       */
      variables?: Record<string, any>;
      /*
       * Configurations for generating the initial 'launch.json'.
       */
      initialConfigurations?: void;
      /*
       * List of languages for which the debug extension could be considered the "default debugger".
       */
      languages?: any[];
      /*
       * Snippets for adding new configurations in 'launch.json'.
       */
      configurationSnippets?: any[];
      /*
       * JSON schema configurations for validating 'launch.json'.
       */
      configurationAttributes?: Record<string, any>;
      /*
       * Condition which must be true to enable this type of debugger. Consider using 'shellExecutionSupported', 'virtualWorkspace', 'resourceScheme' or an extension-defined context key as appropriate for this.
       *
       * @default
       */
      when?: string;
      /*
       * Optional message to mark this debug type as being deprecated.
       *
       * @default
       */
      deprecated?: string;
      /*
       * Windows specific settings.
       */
      windows?: {
        /*
         * Runtime used for Windows.
         */
        runtime?: string;
      };
      /*
       * macOS specific settings.
       */
      osx?: {
        /*
         * Runtime used for macOS.
         */
        runtime?: string;
      };
      /*
       * Linux specific settings.
       */
      linux?: {
        /*
         * Runtime used for Linux.
         */
        runtime?: string;
      };
    }[];
    /*
     * Contributes breakpoints.
     */
    breakpoints?: {
      /*
       * Allow breakpoints for this language.
       */
      language?: string;
      /*
       * Condition which must be true to enable breakpoints in this language. Consider matching this to the debugger when clause as appropriate.
       *
       * @default
       */
      when?: string;
    }[];
    /*
     * Contributes notebook document provider.
     */
    notebooks?: {
      /*
       * Type of the notebook.
       */
      type: string;
      /*
       * Human readable name of the notebook.
       */
      displayName: string;
      /*
       * Set of globs that the notebook is for.
       */
      selector: {
        /*
         * Glob that the notebook is enabled for.
         */
        filenamePattern?: string;
        /*
         * Glob that the notebook is disabled for.
         */
        excludeFileNamePattern?: string;
      }[];
      /*
       * @default default
       */
      priority?: "default" | "option";
    }[];
    /*
     * Contributes notebook output renderer provider.
     */
    notebookRenderer?: (
      | {
          /*
           * Set of globs that the notebook is for.
           */
          mimeTypes: string[];
          /*
           * File to load in the webview to render the extension.
           */
          entrypoint: string;
        }
      | {
          /*
           * File to load in the webview to render the extension.
           */
          entrypoint: {
            /*
             * Existing renderer that this one extends.
             */
            ["extends"]: string;
            /*
             * File to load in the webview to render the extension.
             */
            path: string;
          };
        }
    )[];
    /*
     * Contributes problem patterns
     */
    problemPatterns?: (
      | {
          /*
           * The regular expression to find an error, warning or info in the output.
           */
          regexp?: string;
          /*
           * whether the pattern matches a location (file and line) or only a file.
           */
          kind?: string;
          /*
           * The match group index of the filename. If omitted 1 is used.
           */
          file?: number;
          /*
           * The match group index of the problem's location. Valid location patterns are: (line), (line,column) and (startLine,startColumn,endLine,endColumn). If omitted (line,column) is assumed.
           */
          location?: number;
          /*
           * The match group index of the problem's line. Defaults to 2
           */
          line?: number;
          /*
           * The match group index of the problem's line character. Defaults to 3
           */
          column?: number;
          /*
           * The match group index of the problem's end line. Defaults to undefined
           */
          endLine?: number;
          /*
           * The match group index of the problem's end line character. Defaults to undefined
           */
          endColumn?: number;
          /*
           * The match group index of the problem's severity. Defaults to undefined
           */
          severity?: number;
          /*
           * The match group index of the problem's code. Defaults to undefined
           */
          code?: number;
          /*
           * The match group index of the message. If omitted it defaults to 4 if location is specified. Otherwise it defaults to 5.
           */
          message?: number;
          /*
           * In a multi line matcher loop indicated whether this pattern is executed in a loop as long as it matches. Can only specified on a last pattern in a multi line pattern.
           */
          loop?: boolean;
          /*
           * The name of the problem pattern.
           */
          name?: string;
        }
      | {
          /*
           * The name of the problem multi line problem pattern.
           */
          name?: string;
          /*
           * The actual patterns.
           */
          patterns?: {
            /*
             * The regular expression to find an error, warning or info in the output.
             */
            regexp?: string;
            /*
             * whether the pattern matches a location (file and line) or only a file.
             */
            kind?: string;
            /*
             * The match group index of the filename. If omitted 1 is used.
             */
            file?: number;
            /*
             * The match group index of the problem's location. Valid location patterns are: (line), (line,column) and (startLine,startColumn,endLine,endColumn). If omitted (line,column) is assumed.
             */
            location?: number;
            /*
             * The match group index of the problem's line. Defaults to 2
             */
            line?: number;
            /*
             * The match group index of the problem's line character. Defaults to 3
             */
            column?: number;
            /*
             * The match group index of the problem's end line. Defaults to undefined
             */
            endLine?: number;
            /*
             * The match group index of the problem's end line character. Defaults to undefined
             */
            endColumn?: number;
            /*
             * The match group index of the problem's severity. Defaults to undefined
             */
            severity?: number;
            /*
             * The match group index of the problem's code. Defaults to undefined
             */
            code?: number;
            /*
             * The match group index of the message. If omitted it defaults to 4 if location is specified. Otherwise it defaults to 5.
             */
            message?: number;
            /*
             * In a multi line matcher loop indicated whether this pattern is executed in a loop as long as it matches. Can only specified on a last pattern in a multi line pattern.
             */
            loop?: boolean;
          }[];
        }
    )[];
    /*
     * Contributes problem matchers
     */
    problemMatchers?: {
      /*
       * The name of a base problem matcher to use.
       */
      base?: string;
      /*
       * The owner of the problem inside Code. Can be omitted if base is specified. Defaults to 'external' if omitted and base is not specified.
       */
      owner?: string;
      /*
       * A human-readable string describing the source of this diagnostic, e.g. 'typescript' or 'super lint'.
       */
      source?: string;
      /*
       * The default severity for captures problems. Is used if the pattern doesn't define a match group for severity.
       */
      severity?: "error" | "warning" | "info";
      /*
       * Controls if a problem reported on a text document is applied only to open, closed or all documents.
       */
      applyTo?: "allDocuments" | "openDocuments" | "closedDocuments";
      /*
       * A problem pattern or the name of a contributed or predefined problem pattern. Can be omitted if base is specified.
       */
      pattern?:
        | string
        | {
            /*
             * The regular expression to find an error, warning or info in the output.
             */
            regexp?: string;
            /*
             * whether the pattern matches a location (file and line) or only a file.
             */
            kind?: string;
            /*
             * The match group index of the filename. If omitted 1 is used.
             */
            file?: number;
            /*
             * The match group index of the problem's location. Valid location patterns are: (line), (line,column) and (startLine,startColumn,endLine,endColumn). If omitted (line,column) is assumed.
             */
            location?: number;
            /*
             * The match group index of the problem's line. Defaults to 2
             */
            line?: number;
            /*
             * The match group index of the problem's line character. Defaults to 3
             */
            column?: number;
            /*
             * The match group index of the problem's end line. Defaults to undefined
             */
            endLine?: number;
            /*
             * The match group index of the problem's end line character. Defaults to undefined
             */
            endColumn?: number;
            /*
             * The match group index of the problem's severity. Defaults to undefined
             */
            severity?: number;
            /*
             * The match group index of the problem's code. Defaults to undefined
             */
            code?: number;
            /*
             * The match group index of the message. If omitted it defaults to 4 if location is specified. Otherwise it defaults to 5.
             */
            message?: number;
            /*
             * In a multi line matcher loop indicated whether this pattern is executed in a loop as long as it matches. Can only specified on a last pattern in a multi line pattern.
             */
            loop?: boolean;
          }
        | {
            /*
             * The regular expression to find an error, warning or info in the output.
             */
            regexp?: string;
            /*
             * whether the pattern matches a location (file and line) or only a file.
             */
            kind?: string;
            /*
             * The match group index of the filename. If omitted 1 is used.
             */
            file?: number;
            /*
             * The match group index of the problem's location. Valid location patterns are: (line), (line,column) and (startLine,startColumn,endLine,endColumn). If omitted (line,column) is assumed.
             */
            location?: number;
            /*
             * The match group index of the problem's line. Defaults to 2
             */
            line?: number;
            /*
             * The match group index of the problem's line character. Defaults to 3
             */
            column?: number;
            /*
             * The match group index of the problem's end line. Defaults to undefined
             */
            endLine?: number;
            /*
             * The match group index of the problem's end line character. Defaults to undefined
             */
            endColumn?: number;
            /*
             * The match group index of the problem's severity. Defaults to undefined
             */
            severity?: number;
            /*
             * The match group index of the problem's code. Defaults to undefined
             */
            code?: number;
            /*
             * The match group index of the message. If omitted it defaults to 4 if location is specified. Otherwise it defaults to 5.
             */
            message?: number;
            /*
             * In a multi line matcher loop indicated whether this pattern is executed in a loop as long as it matches. Can only specified on a last pattern in a multi line pattern.
             */
            loop?: boolean;
          }[];
      /*
       * Defines how file names reported in a problem pattern should be interpreted. A relative fileLocation may be an array, where the second element of the array is the path the relative file location.
       */
      fileLocation?: ("absolute" | "relative" | "autoDetect") | string[];
      /*
       * Patterns to track the begin and end of a matcher active on a background task.
       */
      background?: {
        /*
         * If set to true the background monitor is in active mode when the task starts. This is equals of issuing a line that matches the beginsPattern
         */
        activeOnStart?: boolean;
        /*
         * If matched in the output the start of a background task is signaled.
         */
        beginsPattern?:
          | string
          | {
              /*
               * The regular expression to detect the begin or end of a background task.
               */
              regexp?: string;
              /*
               * The match group index of the filename. Can be omitted.
               */
              file?: number;
            };
        /*
         * If matched in the output the end of a background task is signaled.
         */
        endsPattern?:
          | string
          | {
              /*
               * The regular expression to detect the begin or end of a background task.
               */
              regexp?: string;
              /*
               * The match group index of the filename. Can be omitted.
               */
              file?: number;
            };
      };
      /*
       * Patterns to track the begin and end of a watching matcher.
       */
      watching?: {
        /*
         * If set to true the watcher is in active mode when the task starts. This is equals of issuing a line that matches the beginPattern
         */
        activeOnStart?: boolean;
        /*
         * If matched in the output the start of a watching task is signaled.
         */
        beginsPattern?:
          | string
          | {
              /*
               * The regular expression to detect the begin or end of a background task.
               */
              regexp?: string;
              /*
               * The match group index of the filename. Can be omitted.
               */
              file?: number;
            };
        /*
         * If matched in the output the end of a watching task is signaled.
         */
        endsPattern?:
          | string
          | {
              /*
               * The regular expression to detect the begin or end of a background task.
               */
              regexp?: string;
              /*
               * The match group index of the filename. Can be omitted.
               */
              file?: number;
            };
      };
      /*
       * The name of the problem matcher used to refer to it.
       */
      name?: string;
      /*
       * A human readable label of the problem matcher.
       */
      label?: string;
    }[];
    /*
     * Contributes commands to the command palette.
     */
    commands?:
      | {
          /*
           * Identifier of the command to execute
           */
          command: string;
          /*
           * Title by which the command is represented in the UI
           */
          title: string;
          shortTitle?: string;
          /*
           * (Optional) Category string by which the command is grouped in the UI
           */
          category?: string;
          /*
           * (Optional) Condition which must be true to enable the command in the UI (menu and keybindings). Does not prevent executing the command by other means, like the `executeCommand`-api.
           */
          enablement?: string;
          /*
           * (Optional) Icon which is used to represent the command in the UI. Either a file path, an object with file paths for dark and light themes, or a theme icon references, like `\$(zap)`
           */
          icon?:
            | string
            | {
                /*
                 * Icon path when a light theme is used
                 */
                light?: string;
                /*
                 * Icon path when a dark theme is used
                 */
                dark?: string;
              };
        }
      | {
          /*
           * Identifier of the command to execute
           */
          command: string;
          /*
           * Title by which the command is represented in the UI
           */
          title: string;
          shortTitle?: string;
          /*
           * (Optional) Category string by which the command is grouped in the UI
           */
          category?: string;
          /*
           * (Optional) Condition which must be true to enable the command in the UI (menu and keybindings). Does not prevent executing the command by other means, like the `executeCommand`-api.
           */
          enablement?: string;
          /*
           * (Optional) Icon which is used to represent the command in the UI. Either a file path, an object with file paths for dark and light themes, or a theme icon references, like `\$(zap)`
           */
          icon?:
            | string
            | {
                /*
                 * Icon path when a light theme is used
                 */
                light?: string;
                /*
                 * Icon path when a dark theme is used
                 */
                dark?: string;
              };
        }[];
    /*
     * Contributes submenu items to the editor
     */
    submenus?: {
      /*
       * Identifier of the menu to display as a submenu.
       */
      id: string;
      /*
       * The label of the menu item which leads to this submenu.
       */
      label: string;
      /*
       * (Optional) Icon which is used to represent the submenu in the UI. Either a file path, an object with file paths for dark and light themes, or a theme icon references, like `\$(zap)`
       */
      icon?:
        | string
        | {
            /*
             * Icon path when a light theme is used
             */
            light?: string;
            /*
             * Icon path when a dark theme is used
             */
            dark?: string;
          };
    }[];
    /*
     * Contributes menu items to the editor
     */
    menus?: {
      commandPalette?: {
        /*
         * Identifier of the command to execute. The command must be declared in the 'commands'-section
         */
        command: string;
        /*
         * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
         */
        alt?: string;
        /*
         * Condition which must be true to show this item
         */
        when?: string;
        /*
         * Group into which this item belongs
         */
        group?: string;
      }[];
      touchBar?: {
        /*
         * Identifier of the command to execute. The command must be declared in the 'commands'-section
         */
        command: string;
        /*
         * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
         */
        alt?: string;
        /*
         * Condition which must be true to show this item
         */
        when?: string;
        /*
         * Group into which this item belongs
         */
        group?: string;
      }[];
      ["editor/title"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["editor/title/run"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["editor/context"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["editor/context/copy"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["editor/context/share"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["explorer/context"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["editor/title/context"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["debug/callstack/context"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["debug/variables/context"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["debug/toolBar"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["menuBar/home"]?: {
        /*
         * Identifier of the command to execute. The command must be declared in the 'commands'-section
         */
        command: string;
        /*
         * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
         */
        alt?: string;
        /*
         * Condition which must be true to show this item
         */
        when?: string;
        /*
         * Group into which this item belongs
         */
        group?: string;
      }[];
      ["menuBar/edit/copy"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["scm/title"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["scm/sourceControl"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["scm/resourceState/context"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["scm/resourceFolder/context"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["scm/resourceGroup/context"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["scm/change/title"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["statusBar/remoteIndicator"]?: {
        /*
         * Identifier of the command to execute. The command must be declared in the 'commands'-section
         */
        command: string;
        /*
         * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
         */
        alt?: string;
        /*
         * Condition which must be true to show this item
         */
        when?: string;
        /*
         * Group into which this item belongs
         */
        group?: string;
      }[];
      ["view/title"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["view/item/context"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["comments/commentThread/title"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["comments/commentThread/context"]?: {
        /*
         * Identifier of the command to execute. The command must be declared in the 'commands'-section
         */
        command: string;
        /*
         * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
         */
        alt?: string;
        /*
         * Condition which must be true to show this item
         */
        when?: string;
        /*
         * Group into which this item belongs
         */
        group?: string;
      }[];
      ["comments/comment/title"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["comments/comment/context"]?: {
        /*
         * Identifier of the command to execute. The command must be declared in the 'commands'-section
         */
        command: string;
        /*
         * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
         */
        alt?: string;
        /*
         * Condition which must be true to show this item
         */
        when?: string;
        /*
         * Group into which this item belongs
         */
        group?: string;
      }[];
      ["notebook/toolbar"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["notebook/kernelSource"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["notebook/cell/title"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["notebook/cell/execute"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["notebook/cell/executePrimary"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["interactive/toolbar"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["interactive/cell/title"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["testing/item/context"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["testing/item/gutter"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["extension/context"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["timeline/title"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["timeline/item/context"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["ports/item/context"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["ports/item/origin/inline"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["ports/item/port/inline"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["file/newFile"]?: {
        /*
         * Identifier of the command to execute. The command must be declared in the 'commands'-section
         */
        command: string;
        /*
         * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
         */
        alt?: string;
        /*
         * Condition which must be true to show this item
         */
        when?: string;
        /*
         * Group into which this item belongs
         */
        group?: string;
      }[];
      ["file/share"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
      ["editor/inlineCompletions/actions"]?: {
        /*
         * Identifier of the command to execute. The command must be declared in the 'commands'-section
         */
        command: string;
        /*
         * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
         */
        alt?: string;
        /*
         * Condition which must be true to show this item
         */
        when?: string;
        /*
         * Group into which this item belongs
         */
        group?: string;
      }[];
      ["merge/toolbar"]?: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
    } & {
      [key: string]: (
        | {
            /*
             * Identifier of the command to execute. The command must be declared in the 'commands'-section
             */
            command: string;
            /*
             * Identifier of an alternative command to execute. The command must be declared in the 'commands'-section
             */
            alt?: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
        | {
            /*
             * Identifier of the submenu to display in this item.
             */
            submenu: string;
            /*
             * Condition which must be true to show this item
             */
            when?: string;
            /*
             * Group into which this item belongs
             */
            group?: string;
          }
      )[];
    };
    /*
     * Contributes language declarations.
     */
    languages?: {
      /*
       * ID of the language.
       */
      id?: string;
      /*
       * Name aliases for the language.
       */
      aliases?: string[];
      /*
       * File extensions associated to the language.
       *
       * @default .foo
       */
      extensions?: string[];
      /*
       * File names associated to the language.
       */
      filenames?: string[];
      /*
       * File name glob patterns associated to the language.
       */
      filenamePatterns?: string[];
      /*
       * Mime types associated to the language.
       */
      mimetypes?: string[];
      /*
       * A regular expression matching the first line of a file of the language.
       */
      firstLine?: string;
      /*
       * A relative path to a file containing configuration options for the language.
       *
       * @default ./language-configuration.json
       */
      configuration?: string;
      /*
       * A icon to use as file icon, if no icon theme provides one for the language.
       */
      icon?: {
        /*
         * Icon path when a light theme is used
         */
        light?: string;
        /*
         * Icon path when a dark theme is used
         */
        dark?: string;
      };
    }[];
    /*
     * Contributed custom editors.
     */
    customEditors?: {
      viewType: string;
      /*
       * Human readable name of the custom editor. This is displayed to users when selecting which editor to use.
       */
      displayName: string;
      /*
       * Set of globs that the custom editor is enabled for.
       */
      selector: {
        /*
         * Glob that the custom editor is enabled for.
         */
        filenamePattern?: string;
      }[];
      /*
       * @default default
       */
      priority?: "default" | "option";
    }[];
    codeActions?: {
      /*
       * Language modes that the code actions are enabled for.
       */
      languages: string[];
      actions: {
        kind: string;
        /*
         * Label for the code action used in the UI.
         */
        title: string;
        /*
         * Description of what the code action does.
         */
        description?: string;
      };
    }[];
    /*
     * Contributed documentation.
     */
    documentation?: {
      /*
       * Contributed documentation for refactorings.
       */
      refactoring?: {
        /*
         * Label for the documentation used in the UI.
         */
        title: string;
        /*
         * When clause.
         */
        when: string;
        /*
         * Command executed.
         */
        command: string;
      }[];
    };
    /*
     * Contributed views welcome content. Welcome content will be rendered in tree based views whenever they have no meaningful content to display, ie. the File Explorer when no folder is open. Such content is useful as in-product documentation to drive users to use certain features before they are available. A good example would be a `Clone Repository` button in the File Explorer welcome view.
     */
    viewsWelcome?: {
      view: string | ("explorer" | "debug" | "scm" | "testing");
      /*
       * Welcome content to be displayed. The format of the contents is a subset of Markdown, with support for links only.
       */
      contents: string;
      /*
       * Condition when the welcome content should be displayed.
       */
      when?: string;
      /*
       * Group to which this welcome content belongs. Proposed API.
       */
      group?: string;
      /*
       * Condition when the welcome content buttons and command links should be enabled.
       */
      enablement?: string;
    }[];
    /*
     * Contributes authentication
     */
    authentication?: {
      /*
       * The id of the authentication provider.
       */
      id?: string;
      /*
       * The human readable name of the authentication provider.
       */
      label?: string;
    }[];
    /*
     * Contributes resource label formatting rules.
     */
    resourceLabelFormatters?: {
      /*
       * URI scheme on which to match the formatter on. For example "file". Simple glob patterns are supported.
       */
      scheme: string;
      /*
       * URI authority on which to match the formatter on. Simple glob patterns are supported.
       */
      authority?: string;
      /*
       * Rules for formatting uri resource labels.
       */
      formatting: {
        /*
         * Label rules to display. For example: myLabel:/${path}. ${path}, ${scheme}, ${authority} and ${authoritySuffix} are supported as variables.
         */
        label?: string;
        /*
         * Separator to be used in the uri label display. '/' or '' as an example.
         */
        separator?: string;
        /*
         * Controls whether `${path}` substitutions should have starting separator characters stripped.
         */
        stripPathStartingSeparator?: boolean;
        /*
         * Controls if the start of the uri label should be tildified when possible.
         */
        tildify?: boolean;
        /*
         * Suffix appended to the workspace label.
         */
        workspaceSuffix?: string;
      };
    }[];
    /*
     * Contributes options for continuing the current edit session in a different environment
     */
    continueEditSession?: {
      /*
       * Identifier of the command to execute. The command must be declared in the 'commands'-section and return a URI representing a different environment where the current edit session can be continued.
       */
      command: string;
      /*
       * Group into which this item belongs.
       */
      group?: string;
      /*
       * Condition which must be true to show this item.
       */
      when?: string;
    }[];
    /*
     * Contributes textmate tokenizers.
     */
    grammars?: {
      /*
       * Language identifier for which this syntax is contributed to.
       */
      language?: string;
      /*
       * Textmate scope name used by the tmLanguage file.
       */
      scopeName: string;
      /*
       * Path of the tmLanguage file. The path is relative to the extension folder and typically starts with './syntaxes/'.
       */
      path: string;
      /*
       * A map of scope name to language id if this grammar contains embedded languages.
       */
      embeddedLanguages?: Record<string, any>;
      /*
       * A map of scope name to token types.
       */
      tokenTypes?: {
        [key: string]: "string" | "comment" | "other";
      };
      /*
       * List of language scope names to which this grammar is injected to.
       */
      injectTo?: string[];
      /*
       * Defines which scope names contain balanced brackets.
       *
       * @default *
       */
      balancedBracketScopes?: string[];
      /*
       * Defines which scope names do not contain balanced brackets.
       */
      unbalancedBracketScopes?: string[];
    }[];
    /*
     * Contributes localizations to the editor
     */
    localizations?: {
      /*
       * Id of the language into which the display strings are translated.
       */
      languageId: string;
      /*
       * Name of the language in English.
       */
      languageName?: string;
      /*
       * Name of the language in contributed language.
       */
      localizedLanguageName?: string;
      /*
       * List of translations associated to the language.
       *
       * @default {"id":"vscode","path":""}
       */
      translations: {
        /*
         * Id of VS Code or Extension for which this translation is contributed to. Id of VS Code is always `vscode` and of extension should be in format `publisherId.extensionName`.
         *
         * @pattern ^((vscode)|([a-z0-9A-Z][a-z0-9A-Z-]*)\.([a-z0-9A-Z][a-z0-9A-Z-]*))$
         */
        id: string;
        /*
         * A relative path to a file containing translations for the language.
         */
        path: string;
      }[];
    }[];
    /*
     * Contributes extension defined themable colors
     */
    colors?: {
      /*
       * The identifier of the themable color
       *
       * @pattern ^\w+[.\w+]*$
       */
      id?: string;
      /*
       * The description of the themable color
       */
      description?: string;
      defaults?: {
        /*
         * The default color for light themes. Either a color value in hex (#RRGGBB[AA]) or the identifier of a themable color which provides the default.
         */
        light:
          | (
              | "foreground"
              | "disabledForeground"
              | "errorForeground"
              | "descriptionForeground"
              | "icon.foreground"
              | "focusBorder"
              | "contrastBorder"
              | "contrastActiveBorder"
              | "selection.background"
              | "textSeparator.foreground"
              | "textLink.foreground"
              | "textLink.activeForeground"
              | "textPreformat.foreground"
              | "textBlockQuote.background"
              | "textBlockQuote.border"
              | "textCodeBlock.background"
              | "widget.shadow"
              | "input.background"
              | "input.foreground"
              | "input.border"
              | "inputOption.activeBorder"
              | "inputOption.hoverBackground"
              | "inputOption.activeBackground"
              | "inputOption.activeForeground"
              | "input.placeholderForeground"
              | "inputValidation.infoBackground"
              | "inputValidation.infoForeground"
              | "inputValidation.infoBorder"
              | "inputValidation.warningBackground"
              | "inputValidation.warningForeground"
              | "inputValidation.warningBorder"
              | "inputValidation.errorBackground"
              | "inputValidation.errorForeground"
              | "inputValidation.errorBorder"
              | "dropdown.background"
              | "dropdown.listBackground"
              | "dropdown.foreground"
              | "dropdown.border"
              | "checkbox.background"
              | "checkbox.foreground"
              | "checkbox.border"
              | "button.foreground"
              | "button.background"
              | "button.hoverBackground"
              | "button.border"
              | "button.secondaryForeground"
              | "button.secondaryBackground"
              | "button.secondaryHoverBackground"
              | "badge.background"
              | "badge.foreground"
              | "scrollbar.shadow"
              | "scrollbarSlider.background"
              | "scrollbarSlider.hoverBackground"
              | "scrollbarSlider.activeBackground"
              | "progressBar.background"
              | "editorError.background"
              | "editorError.foreground"
              | "editorError.border"
              | "editorWarning.background"
              | "editorWarning.foreground"
              | "editorWarning.border"
              | "editorInfo.background"
              | "editorInfo.foreground"
              | "editorInfo.border"
              | "editorHint.foreground"
              | "editorHint.border"
              | "sash.hoverBorder"
              | "editor.background"
              | "editor.foreground"
              | "editorWidget.background"
              | "editorWidget.foreground"
              | "editorWidget.border"
              | "editorWidget.resizeBorder"
              | "quickInput.background"
              | "quickInput.foreground"
              | "quickInputTitle.background"
              | "pickerGroup.foreground"
              | "pickerGroup.border"
              | "keybindingLabel.background"
              | "keybindingLabel.foreground"
              | "keybindingLabel.border"
              | "keybindingLabel.bottomBorder"
              | "editor.selectionBackground"
              | "editor.selectionForeground"
              | "editor.inactiveSelectionBackground"
              | "editor.selectionHighlightBackground"
              | "editor.selectionHighlightBorder"
              | "editor.findMatchBackground"
              | "editor.findMatchHighlightBackground"
              | "editor.findRangeHighlightBackground"
              | "editor.findMatchBorder"
              | "editor.findMatchHighlightBorder"
              | "editor.findRangeHighlightBorder"
              | "searchEditor.findMatchBackground"
              | "searchEditor.findMatchBorder"
              | "editor.hoverHighlightBackground"
              | "editorHoverWidget.background"
              | "editorHoverWidget.foreground"
              | "editorHoverWidget.border"
              | "editorHoverWidget.statusBarBackground"
              | "editorLink.activeForeground"
              | "editorInlayHint.foreground"
              | "editorInlayHint.background"
              | "editorInlayHint.typeForeground"
              | "editorInlayHint.typeBackground"
              | "editorInlayHint.parameterForeground"
              | "editorInlayHint.parameterBackground"
              | "editorLightBulb.foreground"
              | "editorLightBulbAutoFix.foreground"
              | "diffEditor.insertedTextBackground"
              | "diffEditor.removedTextBackground"
              | "diffEditor.insertedLineBackground"
              | "diffEditor.removedLineBackground"
              | "diffEditorGutter.insertedLineBackground"
              | "diffEditorGutter.removedLineBackground"
              | "diffEditorOverview.insertedForeground"
              | "diffEditorOverview.removedForeground"
              | "diffEditor.insertedTextBorder"
              | "diffEditor.removedTextBorder"
              | "diffEditor.border"
              | "diffEditor.diagonalFill"
              | "list.focusBackground"
              | "list.focusForeground"
              | "list.focusOutline"
              | "list.focusAndSelectionOutline"
              | "list.activeSelectionBackground"
              | "list.activeSelectionForeground"
              | "list.activeSelectionIconForeground"
              | "list.inactiveSelectionBackground"
              | "list.inactiveSelectionForeground"
              | "list.inactiveSelectionIconForeground"
              | "list.inactiveFocusBackground"
              | "list.inactiveFocusOutline"
              | "list.hoverBackground"
              | "list.hoverForeground"
              | "list.dropBackground"
              | "list.highlightForeground"
              | "list.focusHighlightForeground"
              | "list.invalidItemForeground"
              | "list.errorForeground"
              | "list.warningForeground"
              | "listFilterWidget.background"
              | "listFilterWidget.outline"
              | "listFilterWidget.noMatchesOutline"
              | "list.filterMatchBackground"
              | "list.filterMatchBorder"
              | "tree.indentGuidesStroke"
              | "tree.tableColumnsBorder"
              | "tree.tableOddRowsBackground"
              | "list.deemphasizedForeground"
              | "quickInput.list.focusBackground"
              | "quickInputList.focusForeground"
              | "quickInputList.focusIconForeground"
              | "quickInputList.focusBackground"
              | "menu.border"
              | "menu.foreground"
              | "menu.background"
              | "menu.selectionForeground"
              | "menu.selectionBackground"
              | "menu.selectionBorder"
              | "menu.separatorBackground"
              | "toolbar.hoverBackground"
              | "toolbar.hoverOutline"
              | "toolbar.activeBackground"
              | "editor.snippetTabstopHighlightBackground"
              | "editor.snippetTabstopHighlightBorder"
              | "editor.snippetFinalTabstopHighlightBackground"
              | "editor.snippetFinalTabstopHighlightBorder"
              | "breadcrumb.foreground"
              | "breadcrumb.background"
              | "breadcrumb.focusForeground"
              | "breadcrumb.activeSelectionForeground"
              | "breadcrumbPicker.background"
              | "merge.currentHeaderBackground"
              | "merge.currentContentBackground"
              | "merge.incomingHeaderBackground"
              | "merge.incomingContentBackground"
              | "merge.commonHeaderBackground"
              | "merge.commonContentBackground"
              | "merge.border"
              | "editorOverviewRuler.currentContentForeground"
              | "editorOverviewRuler.incomingContentForeground"
              | "editorOverviewRuler.commonContentForeground"
              | "editorOverviewRuler.findMatchForeground"
              | "editorOverviewRuler.selectionHighlightForeground"
              | "minimap.findMatchHighlight"
              | "minimap.selectionOccurrenceHighlight"
              | "minimap.selectionHighlight"
              | "minimap.errorHighlight"
              | "minimap.warningHighlight"
              | "minimap.background"
              | "minimap.foregroundOpacity"
              | "minimapSlider.background"
              | "minimapSlider.hoverBackground"
              | "minimapSlider.activeBackground"
              | "problemsErrorIcon.foreground"
              | "problemsWarningIcon.foreground"
              | "problemsInfoIcon.foreground"
              | "charts.foreground"
              | "charts.lines"
              | "charts.red"
              | "charts.blue"
              | "charts.yellow"
              | "charts.orange"
              | "charts.green"
              | "charts.purple"
              | "editor.lineHighlightBackground"
              | "editor.lineHighlightBorder"
              | "editor.rangeHighlightBackground"
              | "editor.rangeHighlightBorder"
              | "editor.symbolHighlightBackground"
              | "editor.symbolHighlightBorder"
              | "editorCursor.foreground"
              | "editorCursor.background"
              | "editorWhitespace.foreground"
              | "editorIndentGuide.background"
              | "editorIndentGuide.activeBackground"
              | "editorLineNumber.foreground"
              | "editorActiveLineNumber.foreground"
              | "editorLineNumber.activeForeground"
              | "editorRuler.foreground"
              | "editorCodeLens.foreground"
              | "editorBracketMatch.background"
              | "editorBracketMatch.border"
              | "editorOverviewRuler.border"
              | "editorOverviewRuler.background"
              | "editorGutter.background"
              | "editorUnnecessaryCode.border"
              | "editorUnnecessaryCode.opacity"
              | "editorGhostText.border"
              | "editorGhostText.foreground"
              | "editorGhostText.background"
              | "editorOverviewRuler.rangeHighlightForeground"
              | "editorOverviewRuler.errorForeground"
              | "editorOverviewRuler.warningForeground"
              | "editorOverviewRuler.infoForeground"
              | "editorBracketHighlight.foreground1"
              | "editorBracketHighlight.foreground2"
              | "editorBracketHighlight.foreground3"
              | "editorBracketHighlight.foreground4"
              | "editorBracketHighlight.foreground5"
              | "editorBracketHighlight.foreground6"
              | "editorBracketHighlight.unexpectedBracket.foreground"
              | "editorBracketPairGuide.background1"
              | "editorBracketPairGuide.background2"
              | "editorBracketPairGuide.background3"
              | "editorBracketPairGuide.background4"
              | "editorBracketPairGuide.background5"
              | "editorBracketPairGuide.background6"
              | "editorBracketPairGuide.activeBackground1"
              | "editorBracketPairGuide.activeBackground2"
              | "editorBracketPairGuide.activeBackground3"
              | "editorBracketPairGuide.activeBackground4"
              | "editorBracketPairGuide.activeBackground5"
              | "editorBracketPairGuide.activeBackground6"
              | "editorUnicodeHighlight.border"
              | "editorUnicodeHighlight.background"
              | "symbolIcon.arrayForeground"
              | "symbolIcon.booleanForeground"
              | "symbolIcon.classForeground"
              | "symbolIcon.colorForeground"
              | "symbolIcon.constantForeground"
              | "symbolIcon.constructorForeground"
              | "symbolIcon.enumeratorForeground"
              | "symbolIcon.enumeratorMemberForeground"
              | "symbolIcon.eventForeground"
              | "symbolIcon.fieldForeground"
              | "symbolIcon.fileForeground"
              | "symbolIcon.folderForeground"
              | "symbolIcon.functionForeground"
              | "symbolIcon.interfaceForeground"
              | "symbolIcon.keyForeground"
              | "symbolIcon.keywordForeground"
              | "symbolIcon.methodForeground"
              | "symbolIcon.moduleForeground"
              | "symbolIcon.namespaceForeground"
              | "symbolIcon.nullForeground"
              | "symbolIcon.numberForeground"
              | "symbolIcon.objectForeground"
              | "symbolIcon.operatorForeground"
              | "symbolIcon.packageForeground"
              | "symbolIcon.propertyForeground"
              | "symbolIcon.referenceForeground"
              | "symbolIcon.snippetForeground"
              | "symbolIcon.stringForeground"
              | "symbolIcon.structForeground"
              | "symbolIcon.textForeground"
              | "symbolIcon.typeParameterForeground"
              | "symbolIcon.unitForeground"
              | "symbolIcon.variableForeground"
              | "editorHoverWidget.highlightForeground"
              | "editorOverviewRuler.bracketMatchForeground"
              | "editor.foldBackground"
              | "editorGutter.foldingControlForeground"
              | "editor.linkedEditingBackground"
              | "editor.wordHighlightBackground"
              | "editor.wordHighlightStrongBackground"
              | "editor.wordHighlightBorder"
              | "editor.wordHighlightStrongBorder"
              | "editorOverviewRuler.wordHighlightForeground"
              | "editorOverviewRuler.wordHighlightStrongForeground"
              | "peekViewTitle.background"
              | "peekViewTitleLabel.foreground"
              | "peekViewTitleDescription.foreground"
              | "peekView.border"
              | "peekViewResult.background"
              | "peekViewResult.lineForeground"
              | "peekViewResult.fileForeground"
              | "peekViewResult.selectionBackground"
              | "peekViewResult.selectionForeground"
              | "peekViewEditor.background"
              | "peekViewEditorGutter.background"
              | "peekViewResult.matchHighlightBackground"
              | "peekViewEditor.matchHighlightBackground"
              | "peekViewEditor.matchHighlightBorder"
              | "editorMarkerNavigationError.background"
              | "editorMarkerNavigationError.headerBackground"
              | "editorMarkerNavigationWarning.background"
              | "editorMarkerNavigationWarning.headerBackground"
              | "editorMarkerNavigationInfo.background"
              | "editorMarkerNavigationInfo.headerBackground"
              | "editorMarkerNavigation.background"
              | "editorSuggestWidget.background"
              | "editorSuggestWidget.border"
              | "editorSuggestWidget.foreground"
              | "editorSuggestWidget.selectedForeground"
              | "editorSuggestWidget.selectedIconForeground"
              | "editorSuggestWidget.selectedBackground"
              | "editorSuggestWidget.highlightForeground"
              | "editorSuggestWidget.focusHighlightForeground"
              | "editorSuggestWidgetStatus.foreground"
              | "tab.activeBackground"
              | "tab.unfocusedActiveBackground"
              | "tab.inactiveBackground"
              | "tab.unfocusedInactiveBackground"
              | "tab.activeForeground"
              | "tab.inactiveForeground"
              | "tab.unfocusedActiveForeground"
              | "tab.unfocusedInactiveForeground"
              | "tab.hoverBackground"
              | "tab.unfocusedHoverBackground"
              | "tab.hoverForeground"
              | "tab.unfocusedHoverForeground"
              | "tab.border"
              | "tab.lastPinnedBorder"
              | "tab.activeBorder"
              | "tab.unfocusedActiveBorder"
              | "tab.activeBorderTop"
              | "tab.unfocusedActiveBorderTop"
              | "tab.hoverBorder"
              | "tab.unfocusedHoverBorder"
              | "tab.activeModifiedBorder"
              | "tab.inactiveModifiedBorder"
              | "tab.unfocusedActiveModifiedBorder"
              | "tab.unfocusedInactiveModifiedBorder"
              | "editorPane.background"
              | "editorGroup.emptyBackground"
              | "editorGroup.focusedEmptyBorder"
              | "editorGroupHeader.tabsBackground"
              | "editorGroupHeader.tabsBorder"
              | "editorGroupHeader.noTabsBackground"
              | "editorGroupHeader.border"
              | "editorGroup.border"
              | "editorGroup.dropBackground"
              | "editorGroup.dropIntoPromptForeground"
              | "editorGroup.dropIntoPromptBackground"
              | "editorGroup.dropIntoPromptBorder"
              | "sideBySideEditor.horizontalBorder"
              | "sideBySideEditor.verticalBorder"
              | "panel.background"
              | "panel.border"
              | "panelTitle.activeForeground"
              | "panelTitle.inactiveForeground"
              | "panelTitle.activeBorder"
              | "panelInput.border"
              | "panel.dropBorder"
              | "panelSection.dropBackground"
              | "panelSectionHeader.background"
              | "panelSectionHeader.foreground"
              | "panelSectionHeader.border"
              | "panelSection.border"
              | "banner.background"
              | "banner.foreground"
              | "banner.iconForeground"
              | "statusBar.foreground"
              | "statusBar.noFolderForeground"
              | "statusBar.background"
              | "statusBar.noFolderBackground"
              | "statusBar.border"
              | "statusBar.focusBorder"
              | "statusBar.noFolderBorder"
              | "statusBarItem.activeBackground"
              | "statusBarItem.focusBorder"
              | "statusBarItem.hoverBackground"
              | "statusBarItem.compactHoverBackground"
              | "statusBarItem.prominentForeground"
              | "statusBarItem.prominentBackground"
              | "statusBarItem.prominentHoverBackground"
              | "statusBarItem.errorBackground"
              | "statusBarItem.errorForeground"
              | "statusBarItem.warningBackground"
              | "statusBarItem.warningForeground"
              | "activityBar.background"
              | "activityBar.foreground"
              | "activityBar.inactiveForeground"
              | "activityBar.border"
              | "activityBar.activeBorder"
              | "activityBar.activeFocusBorder"
              | "activityBar.activeBackground"
              | "activityBar.dropBorder"
              | "activityBarBadge.background"
              | "activityBarBadge.foreground"
              | "statusBarItem.remoteBackground"
              | "statusBarItem.remoteForeground"
              | "extensionBadge.remoteBackground"
              | "extensionBadge.remoteForeground"
              | "sideBar.background"
              | "sideBar.foreground"
              | "sideBar.border"
              | "sideBarTitle.foreground"
              | "sideBar.dropBackground"
              | "sideBarSectionHeader.background"
              | "sideBarSectionHeader.foreground"
              | "sideBarSectionHeader.border"
              | "titleBar.activeForeground"
              | "titleBar.inactiveForeground"
              | "titleBar.activeBackground"
              | "titleBar.inactiveBackground"
              | "titleBar.border"
              | "menubar.selectionForeground"
              | "menubar.selectionBackground"
              | "menubar.selectionBorder"
              | "notificationCenter.border"
              | "notificationToast.border"
              | "notifications.foreground"
              | "notifications.background"
              | "notificationLink.foreground"
              | "notificationCenterHeader.foreground"
              | "notificationCenterHeader.background"
              | "notifications.border"
              | "notificationsErrorIcon.foreground"
              | "notificationsWarningIcon.foreground"
              | "notificationsInfoIcon.foreground"
              | "window.activeBorder"
              | "window.inactiveBorder"
              | "commandCenter.foreground"
              | "commandCenter.activeForeground"
              | "commandCenter.background"
              | "commandCenter.activeBackground"
              | "commandCenter.border"
              | "editorCommentsWidget.resolvedBorder"
              | "editorCommentsWidget.unresolvedBorder"
              | "editorCommentsWidget.rangeBackground"
              | "editorCommentsWidget.rangeBorder"
              | "editorCommentsWidget.rangeActiveBackground"
              | "editorCommentsWidget.rangeActiveBorder"
              | "editorGutter.commentRangeForeground"
              | "debugToolBar.background"
              | "debugToolBar.border"
              | "debugIcon.startForeground"
              | "editor.stackFrameHighlightBackground"
              | "editor.focusedStackFrameHighlightBackground"
              | "mergeEditor.change.background"
              | "mergeEditor.change.word.background"
              | "mergeEditor.conflict.unhandledUnfocused.border"
              | "mergeEditor.conflict.unhandledFocused.border"
              | "mergeEditor.conflict.handledUnfocused.border"
              | "mergeEditor.conflict.handledFocused.border"
              | "mergeEditor.conflict.handled.minimapOverViewRuler"
              | "mergeEditor.conflict.unhandled.minimapOverViewRuler"
              | "settings.headerForeground"
              | "settings.modifiedItemIndicator"
              | "settings.headerBorder"
              | "settings.sashBorder"
              | "settings.dropdownBackground"
              | "settings.dropdownForeground"
              | "settings.dropdownBorder"
              | "settings.dropdownListBorder"
              | "settings.checkboxBackground"
              | "settings.checkboxForeground"
              | "settings.checkboxBorder"
              | "settings.textInputBackground"
              | "settings.textInputForeground"
              | "settings.textInputBorder"
              | "settings.numberInputBackground"
              | "settings.numberInputForeground"
              | "settings.numberInputBorder"
              | "settings.focusedRowBackground"
              | "settings.rowHoverBackground"
              | "settings.focusedRowBorder"
              | "terminal.background"
              | "terminal.foreground"
              | "terminalCursor.foreground"
              | "terminalCursor.background"
              | "terminal.selectionBackground"
              | "terminal.selectionForeground"
              | "terminalCommandDecoration.defaultBackground"
              | "terminalCommandDecoration.successBackground"
              | "terminalCommandDecoration.errorBackground"
              | "terminalOverviewRuler.cursorForeground"
              | "terminal.border"
              | "terminal.findMatchBackground"
              | "terminal.findMatchBorder"
              | "terminal.findMatchHighlightBackground"
              | "terminal.findMatchHighlightBorder"
              | "terminalOverviewRuler.findMatchForeground"
              | "terminal.dropBackground"
              | "terminal.tab.activeBorder"
              | "testing.iconFailed"
              | "testing.iconErrored"
              | "testing.iconPassed"
              | "testing.runAction"
              | "testing.iconQueued"
              | "testing.iconUnset"
              | "testing.iconSkipped"
              | "testing.peekBorder"
              | "testing.peekHeaderBackground"
              | "testing.message.error.decorationForeground"
              | "testing.message.error.lineBackground"
              | "testing.message.info.decorationForeground"
              | "testing.message.info.lineBackground"
              | "welcomePage.background"
              | "welcomePage.tileBackground"
              | "welcomePage.tileHoverBackground"
              | "welcomePage.tileShadow"
              | "welcomePage.progress.background"
              | "welcomePage.progress.foreground"
              | "walkThrough.embeddedEditorBackground"
              | "debugExceptionWidget.border"
              | "debugExceptionWidget.background"
              | "ports.iconRunningProcessForeground"
              | "statusBar.debuggingBackground"
              | "statusBar.debuggingForeground"
              | "statusBar.debuggingBorder"
              | "editor.inlineValuesForeground"
              | "editor.inlineValuesBackground"
              | "editorGutter.modifiedBackground"
              | "editorGutter.addedBackground"
              | "editorGutter.deletedBackground"
              | "minimapGutter.modifiedBackground"
              | "minimapGutter.addedBackground"
              | "minimapGutter.deletedBackground"
              | "editorOverviewRuler.modifiedForeground"
              | "editorOverviewRuler.addedForeground"
              | "editorOverviewRuler.deletedForeground"
              | "debugIcon.breakpointForeground"
              | "debugIcon.breakpointDisabledForeground"
              | "debugIcon.breakpointUnverifiedForeground"
              | "debugIcon.breakpointCurrentStackframeForeground"
              | "debugIcon.breakpointStackframeForeground"
              | "notebook.cellBorderColor"
              | "notebook.focusedEditorBorder"
              | "notebookStatusSuccessIcon.foreground"
              | "notebookStatusErrorIcon.foreground"
              | "notebookStatusRunningIcon.foreground"
              | "notebook.outputContainerBorderColor"
              | "notebook.outputContainerBackgroundColor"
              | "notebook.cellToolbarSeparator"
              | "notebook.focusedCellBackground"
              | "notebook.selectedCellBackground"
              | "notebook.cellHoverBackground"
              | "notebook.selectedCellBorder"
              | "notebook.inactiveSelectedCellBorder"
              | "notebook.focusedCellBorder"
              | "notebook.inactiveFocusedCellBorder"
              | "notebook.cellStatusBarItemHoverBackground"
              | "notebook.cellInsertionIndicator"
              | "notebookScrollbarSlider.background"
              | "notebookScrollbarSlider.hoverBackground"
              | "notebookScrollbarSlider.activeBackground"
              | "notebook.symbolHighlightBackground"
              | "notebook.cellEditorBackground"
              | "notebook.editorBackground"
              | "statusBarItem.settingsProfilesForeground"
              | "statusBarItem.settingsProfilesBackground"
              | "keybindingTable.headerBackground"
              | "keybindingTable.rowsBackground"
              | "scm.providerBorder"
              | "searchEditor.textInputBorder"
              | "debugTokenExpression.name"
              | "debugTokenExpression.value"
              | "debugTokenExpression.string"
              | "debugTokenExpression.boolean"
              | "debugTokenExpression.number"
              | "debugTokenExpression.error"
              | "debugView.exceptionLabelForeground"
              | "debugView.exceptionLabelBackground"
              | "debugView.stateLabelForeground"
              | "debugView.stateLabelBackground"
              | "debugView.valueChangedHighlight"
              | "debugConsole.infoForeground"
              | "debugConsole.warningForeground"
              | "debugConsole.errorForeground"
              | "debugConsole.sourceForeground"
              | "debugConsoleInputIcon.foreground"
              | "debugIcon.pauseForeground"
              | "debugIcon.stopForeground"
              | "debugIcon.disconnectForeground"
              | "debugIcon.restartForeground"
              | "debugIcon.stepOverForeground"
              | "debugIcon.stepIntoForeground"
              | "debugIcon.stepOutForeground"
              | "debugIcon.continueForeground"
              | "debugIcon.stepBackForeground"
              | "extensionButton.prominentBackground"
              | "extensionButton.prominentForeground"
              | "extensionButton.prominentHoverBackground"
              | "extensionIcon.starForeground"
              | "extensionIcon.verifiedForeground"
              | "extensionIcon.preReleaseForeground"
              | "extensionIcon.sponsorForeground"
              | "terminal.ansiBlack"
              | "terminal.ansiRed"
              | "terminal.ansiGreen"
              | "terminal.ansiYellow"
              | "terminal.ansiBlue"
              | "terminal.ansiMagenta"
              | "terminal.ansiCyan"
              | "terminal.ansiWhite"
              | "terminal.ansiBrightBlack"
              | "terminal.ansiBrightRed"
              | "terminal.ansiBrightGreen"
              | "terminal.ansiBrightYellow"
              | "terminal.ansiBrightBlue"
              | "terminal.ansiBrightMagenta"
              | "terminal.ansiBrightCyan"
              | "terminal.ansiBrightWhite"
              | "interactive.activeCodeBorder"
              | "interactive.inactiveCodeBorder"
              | "interactive.activeCodeBorder"
              | "interactive.inactiveCodeBorder"
              | "gitDecoration.addedResourceForeground"
              | "gitDecoration.modifiedResourceForeground"
              | "gitDecoration.deletedResourceForeground"
              | "gitDecoration.renamedResourceForeground"
              | "gitDecoration.untrackedResourceForeground"
              | "gitDecoration.ignoredResourceForeground"
              | "gitDecoration.stageModifiedResourceForeground"
              | "gitDecoration.stageDeletedResourceForeground"
              | "gitDecoration.conflictingResourceForeground"
              | "gitDecoration.submoduleResourceForeground"
              | "interactive.activeCodeBorder"
              | "interactive.inactiveCodeBorder"
            )
          | string;
        /*
         * The default color for dark themes. Either a color value in hex (#RRGGBB[AA]) or the identifier of a themable color which provides the default.
         */
        dark:
          | (
              | "foreground"
              | "disabledForeground"
              | "errorForeground"
              | "descriptionForeground"
              | "icon.foreground"
              | "focusBorder"
              | "contrastBorder"
              | "contrastActiveBorder"
              | "selection.background"
              | "textSeparator.foreground"
              | "textLink.foreground"
              | "textLink.activeForeground"
              | "textPreformat.foreground"
              | "textBlockQuote.background"
              | "textBlockQuote.border"
              | "textCodeBlock.background"
              | "widget.shadow"
              | "input.background"
              | "input.foreground"
              | "input.border"
              | "inputOption.activeBorder"
              | "inputOption.hoverBackground"
              | "inputOption.activeBackground"
              | "inputOption.activeForeground"
              | "input.placeholderForeground"
              | "inputValidation.infoBackground"
              | "inputValidation.infoForeground"
              | "inputValidation.infoBorder"
              | "inputValidation.warningBackground"
              | "inputValidation.warningForeground"
              | "inputValidation.warningBorder"
              | "inputValidation.errorBackground"
              | "inputValidation.errorForeground"
              | "inputValidation.errorBorder"
              | "dropdown.background"
              | "dropdown.listBackground"
              | "dropdown.foreground"
              | "dropdown.border"
              | "checkbox.background"
              | "checkbox.foreground"
              | "checkbox.border"
              | "button.foreground"
              | "button.background"
              | "button.hoverBackground"
              | "button.border"
              | "button.secondaryForeground"
              | "button.secondaryBackground"
              | "button.secondaryHoverBackground"
              | "badge.background"
              | "badge.foreground"
              | "scrollbar.shadow"
              | "scrollbarSlider.background"
              | "scrollbarSlider.hoverBackground"
              | "scrollbarSlider.activeBackground"
              | "progressBar.background"
              | "editorError.background"
              | "editorError.foreground"
              | "editorError.border"
              | "editorWarning.background"
              | "editorWarning.foreground"
              | "editorWarning.border"
              | "editorInfo.background"
              | "editorInfo.foreground"
              | "editorInfo.border"
              | "editorHint.foreground"
              | "editorHint.border"
              | "sash.hoverBorder"
              | "editor.background"
              | "editor.foreground"
              | "editorWidget.background"
              | "editorWidget.foreground"
              | "editorWidget.border"
              | "editorWidget.resizeBorder"
              | "quickInput.background"
              | "quickInput.foreground"
              | "quickInputTitle.background"
              | "pickerGroup.foreground"
              | "pickerGroup.border"
              | "keybindingLabel.background"
              | "keybindingLabel.foreground"
              | "keybindingLabel.border"
              | "keybindingLabel.bottomBorder"
              | "editor.selectionBackground"
              | "editor.selectionForeground"
              | "editor.inactiveSelectionBackground"
              | "editor.selectionHighlightBackground"
              | "editor.selectionHighlightBorder"
              | "editor.findMatchBackground"
              | "editor.findMatchHighlightBackground"
              | "editor.findRangeHighlightBackground"
              | "editor.findMatchBorder"
              | "editor.findMatchHighlightBorder"
              | "editor.findRangeHighlightBorder"
              | "searchEditor.findMatchBackground"
              | "searchEditor.findMatchBorder"
              | "editor.hoverHighlightBackground"
              | "editorHoverWidget.background"
              | "editorHoverWidget.foreground"
              | "editorHoverWidget.border"
              | "editorHoverWidget.statusBarBackground"
              | "editorLink.activeForeground"
              | "editorInlayHint.foreground"
              | "editorInlayHint.background"
              | "editorInlayHint.typeForeground"
              | "editorInlayHint.typeBackground"
              | "editorInlayHint.parameterForeground"
              | "editorInlayHint.parameterBackground"
              | "editorLightBulb.foreground"
              | "editorLightBulbAutoFix.foreground"
              | "diffEditor.insertedTextBackground"
              | "diffEditor.removedTextBackground"
              | "diffEditor.insertedLineBackground"
              | "diffEditor.removedLineBackground"
              | "diffEditorGutter.insertedLineBackground"
              | "diffEditorGutter.removedLineBackground"
              | "diffEditorOverview.insertedForeground"
              | "diffEditorOverview.removedForeground"
              | "diffEditor.insertedTextBorder"
              | "diffEditor.removedTextBorder"
              | "diffEditor.border"
              | "diffEditor.diagonalFill"
              | "list.focusBackground"
              | "list.focusForeground"
              | "list.focusOutline"
              | "list.focusAndSelectionOutline"
              | "list.activeSelectionBackground"
              | "list.activeSelectionForeground"
              | "list.activeSelectionIconForeground"
              | "list.inactiveSelectionBackground"
              | "list.inactiveSelectionForeground"
              | "list.inactiveSelectionIconForeground"
              | "list.inactiveFocusBackground"
              | "list.inactiveFocusOutline"
              | "list.hoverBackground"
              | "list.hoverForeground"
              | "list.dropBackground"
              | "list.highlightForeground"
              | "list.focusHighlightForeground"
              | "list.invalidItemForeground"
              | "list.errorForeground"
              | "list.warningForeground"
              | "listFilterWidget.background"
              | "listFilterWidget.outline"
              | "listFilterWidget.noMatchesOutline"
              | "list.filterMatchBackground"
              | "list.filterMatchBorder"
              | "tree.indentGuidesStroke"
              | "tree.tableColumnsBorder"
              | "tree.tableOddRowsBackground"
              | "list.deemphasizedForeground"
              | "quickInput.list.focusBackground"
              | "quickInputList.focusForeground"
              | "quickInputList.focusIconForeground"
              | "quickInputList.focusBackground"
              | "menu.border"
              | "menu.foreground"
              | "menu.background"
              | "menu.selectionForeground"
              | "menu.selectionBackground"
              | "menu.selectionBorder"
              | "menu.separatorBackground"
              | "toolbar.hoverBackground"
              | "toolbar.hoverOutline"
              | "toolbar.activeBackground"
              | "editor.snippetTabstopHighlightBackground"
              | "editor.snippetTabstopHighlightBorder"
              | "editor.snippetFinalTabstopHighlightBackground"
              | "editor.snippetFinalTabstopHighlightBorder"
              | "breadcrumb.foreground"
              | "breadcrumb.background"
              | "breadcrumb.focusForeground"
              | "breadcrumb.activeSelectionForeground"
              | "breadcrumbPicker.background"
              | "merge.currentHeaderBackground"
              | "merge.currentContentBackground"
              | "merge.incomingHeaderBackground"
              | "merge.incomingContentBackground"
              | "merge.commonHeaderBackground"
              | "merge.commonContentBackground"
              | "merge.border"
              | "editorOverviewRuler.currentContentForeground"
              | "editorOverviewRuler.incomingContentForeground"
              | "editorOverviewRuler.commonContentForeground"
              | "editorOverviewRuler.findMatchForeground"
              | "editorOverviewRuler.selectionHighlightForeground"
              | "minimap.findMatchHighlight"
              | "minimap.selectionOccurrenceHighlight"
              | "minimap.selectionHighlight"
              | "minimap.errorHighlight"
              | "minimap.warningHighlight"
              | "minimap.background"
              | "minimap.foregroundOpacity"
              | "minimapSlider.background"
              | "minimapSlider.hoverBackground"
              | "minimapSlider.activeBackground"
              | "problemsErrorIcon.foreground"
              | "problemsWarningIcon.foreground"
              | "problemsInfoIcon.foreground"
              | "charts.foreground"
              | "charts.lines"
              | "charts.red"
              | "charts.blue"
              | "charts.yellow"
              | "charts.orange"
              | "charts.green"
              | "charts.purple"
              | "editor.lineHighlightBackground"
              | "editor.lineHighlightBorder"
              | "editor.rangeHighlightBackground"
              | "editor.rangeHighlightBorder"
              | "editor.symbolHighlightBackground"
              | "editor.symbolHighlightBorder"
              | "editorCursor.foreground"
              | "editorCursor.background"
              | "editorWhitespace.foreground"
              | "editorIndentGuide.background"
              | "editorIndentGuide.activeBackground"
              | "editorLineNumber.foreground"
              | "editorActiveLineNumber.foreground"
              | "editorLineNumber.activeForeground"
              | "editorRuler.foreground"
              | "editorCodeLens.foreground"
              | "editorBracketMatch.background"
              | "editorBracketMatch.border"
              | "editorOverviewRuler.border"
              | "editorOverviewRuler.background"
              | "editorGutter.background"
              | "editorUnnecessaryCode.border"
              | "editorUnnecessaryCode.opacity"
              | "editorGhostText.border"
              | "editorGhostText.foreground"
              | "editorGhostText.background"
              | "editorOverviewRuler.rangeHighlightForeground"
              | "editorOverviewRuler.errorForeground"
              | "editorOverviewRuler.warningForeground"
              | "editorOverviewRuler.infoForeground"
              | "editorBracketHighlight.foreground1"
              | "editorBracketHighlight.foreground2"
              | "editorBracketHighlight.foreground3"
              | "editorBracketHighlight.foreground4"
              | "editorBracketHighlight.foreground5"
              | "editorBracketHighlight.foreground6"
              | "editorBracketHighlight.unexpectedBracket.foreground"
              | "editorBracketPairGuide.background1"
              | "editorBracketPairGuide.background2"
              | "editorBracketPairGuide.background3"
              | "editorBracketPairGuide.background4"
              | "editorBracketPairGuide.background5"
              | "editorBracketPairGuide.background6"
              | "editorBracketPairGuide.activeBackground1"
              | "editorBracketPairGuide.activeBackground2"
              | "editorBracketPairGuide.activeBackground3"
              | "editorBracketPairGuide.activeBackground4"
              | "editorBracketPairGuide.activeBackground5"
              | "editorBracketPairGuide.activeBackground6"
              | "editorUnicodeHighlight.border"
              | "editorUnicodeHighlight.background"
              | "symbolIcon.arrayForeground"
              | "symbolIcon.booleanForeground"
              | "symbolIcon.classForeground"
              | "symbolIcon.colorForeground"
              | "symbolIcon.constantForeground"
              | "symbolIcon.constructorForeground"
              | "symbolIcon.enumeratorForeground"
              | "symbolIcon.enumeratorMemberForeground"
              | "symbolIcon.eventForeground"
              | "symbolIcon.fieldForeground"
              | "symbolIcon.fileForeground"
              | "symbolIcon.folderForeground"
              | "symbolIcon.functionForeground"
              | "symbolIcon.interfaceForeground"
              | "symbolIcon.keyForeground"
              | "symbolIcon.keywordForeground"
              | "symbolIcon.methodForeground"
              | "symbolIcon.moduleForeground"
              | "symbolIcon.namespaceForeground"
              | "symbolIcon.nullForeground"
              | "symbolIcon.numberForeground"
              | "symbolIcon.objectForeground"
              | "symbolIcon.operatorForeground"
              | "symbolIcon.packageForeground"
              | "symbolIcon.propertyForeground"
              | "symbolIcon.referenceForeground"
              | "symbolIcon.snippetForeground"
              | "symbolIcon.stringForeground"
              | "symbolIcon.structForeground"
              | "symbolIcon.textForeground"
              | "symbolIcon.typeParameterForeground"
              | "symbolIcon.unitForeground"
              | "symbolIcon.variableForeground"
              | "editorHoverWidget.highlightForeground"
              | "editorOverviewRuler.bracketMatchForeground"
              | "editor.foldBackground"
              | "editorGutter.foldingControlForeground"
              | "editor.linkedEditingBackground"
              | "editor.wordHighlightBackground"
              | "editor.wordHighlightStrongBackground"
              | "editor.wordHighlightBorder"
              | "editor.wordHighlightStrongBorder"
              | "editorOverviewRuler.wordHighlightForeground"
              | "editorOverviewRuler.wordHighlightStrongForeground"
              | "peekViewTitle.background"
              | "peekViewTitleLabel.foreground"
              | "peekViewTitleDescription.foreground"
              | "peekView.border"
              | "peekViewResult.background"
              | "peekViewResult.lineForeground"
              | "peekViewResult.fileForeground"
              | "peekViewResult.selectionBackground"
              | "peekViewResult.selectionForeground"
              | "peekViewEditor.background"
              | "peekViewEditorGutter.background"
              | "peekViewResult.matchHighlightBackground"
              | "peekViewEditor.matchHighlightBackground"
              | "peekViewEditor.matchHighlightBorder"
              | "editorMarkerNavigationError.background"
              | "editorMarkerNavigationError.headerBackground"
              | "editorMarkerNavigationWarning.background"
              | "editorMarkerNavigationWarning.headerBackground"
              | "editorMarkerNavigationInfo.background"
              | "editorMarkerNavigationInfo.headerBackground"
              | "editorMarkerNavigation.background"
              | "editorSuggestWidget.background"
              | "editorSuggestWidget.border"
              | "editorSuggestWidget.foreground"
              | "editorSuggestWidget.selectedForeground"
              | "editorSuggestWidget.selectedIconForeground"
              | "editorSuggestWidget.selectedBackground"
              | "editorSuggestWidget.highlightForeground"
              | "editorSuggestWidget.focusHighlightForeground"
              | "editorSuggestWidgetStatus.foreground"
              | "tab.activeBackground"
              | "tab.unfocusedActiveBackground"
              | "tab.inactiveBackground"
              | "tab.unfocusedInactiveBackground"
              | "tab.activeForeground"
              | "tab.inactiveForeground"
              | "tab.unfocusedActiveForeground"
              | "tab.unfocusedInactiveForeground"
              | "tab.hoverBackground"
              | "tab.unfocusedHoverBackground"
              | "tab.hoverForeground"
              | "tab.unfocusedHoverForeground"
              | "tab.border"
              | "tab.lastPinnedBorder"
              | "tab.activeBorder"
              | "tab.unfocusedActiveBorder"
              | "tab.activeBorderTop"
              | "tab.unfocusedActiveBorderTop"
              | "tab.hoverBorder"
              | "tab.unfocusedHoverBorder"
              | "tab.activeModifiedBorder"
              | "tab.inactiveModifiedBorder"
              | "tab.unfocusedActiveModifiedBorder"
              | "tab.unfocusedInactiveModifiedBorder"
              | "editorPane.background"
              | "editorGroup.emptyBackground"
              | "editorGroup.focusedEmptyBorder"
              | "editorGroupHeader.tabsBackground"
              | "editorGroupHeader.tabsBorder"
              | "editorGroupHeader.noTabsBackground"
              | "editorGroupHeader.border"
              | "editorGroup.border"
              | "editorGroup.dropBackground"
              | "editorGroup.dropIntoPromptForeground"
              | "editorGroup.dropIntoPromptBackground"
              | "editorGroup.dropIntoPromptBorder"
              | "sideBySideEditor.horizontalBorder"
              | "sideBySideEditor.verticalBorder"
              | "panel.background"
              | "panel.border"
              | "panelTitle.activeForeground"
              | "panelTitle.inactiveForeground"
              | "panelTitle.activeBorder"
              | "panelInput.border"
              | "panel.dropBorder"
              | "panelSection.dropBackground"
              | "panelSectionHeader.background"
              | "panelSectionHeader.foreground"
              | "panelSectionHeader.border"
              | "panelSection.border"
              | "banner.background"
              | "banner.foreground"
              | "banner.iconForeground"
              | "statusBar.foreground"
              | "statusBar.noFolderForeground"
              | "statusBar.background"
              | "statusBar.noFolderBackground"
              | "statusBar.border"
              | "statusBar.focusBorder"
              | "statusBar.noFolderBorder"
              | "statusBarItem.activeBackground"
              | "statusBarItem.focusBorder"
              | "statusBarItem.hoverBackground"
              | "statusBarItem.compactHoverBackground"
              | "statusBarItem.prominentForeground"
              | "statusBarItem.prominentBackground"
              | "statusBarItem.prominentHoverBackground"
              | "statusBarItem.errorBackground"
              | "statusBarItem.errorForeground"
              | "statusBarItem.warningBackground"
              | "statusBarItem.warningForeground"
              | "activityBar.background"
              | "activityBar.foreground"
              | "activityBar.inactiveForeground"
              | "activityBar.border"
              | "activityBar.activeBorder"
              | "activityBar.activeFocusBorder"
              | "activityBar.activeBackground"
              | "activityBar.dropBorder"
              | "activityBarBadge.background"
              | "activityBarBadge.foreground"
              | "statusBarItem.remoteBackground"
              | "statusBarItem.remoteForeground"
              | "extensionBadge.remoteBackground"
              | "extensionBadge.remoteForeground"
              | "sideBar.background"
              | "sideBar.foreground"
              | "sideBar.border"
              | "sideBarTitle.foreground"
              | "sideBar.dropBackground"
              | "sideBarSectionHeader.background"
              | "sideBarSectionHeader.foreground"
              | "sideBarSectionHeader.border"
              | "titleBar.activeForeground"
              | "titleBar.inactiveForeground"
              | "titleBar.activeBackground"
              | "titleBar.inactiveBackground"
              | "titleBar.border"
              | "menubar.selectionForeground"
              | "menubar.selectionBackground"
              | "menubar.selectionBorder"
              | "notificationCenter.border"
              | "notificationToast.border"
              | "notifications.foreground"
              | "notifications.background"
              | "notificationLink.foreground"
              | "notificationCenterHeader.foreground"
              | "notificationCenterHeader.background"
              | "notifications.border"
              | "notificationsErrorIcon.foreground"
              | "notificationsWarningIcon.foreground"
              | "notificationsInfoIcon.foreground"
              | "window.activeBorder"
              | "window.inactiveBorder"
              | "commandCenter.foreground"
              | "commandCenter.activeForeground"
              | "commandCenter.background"
              | "commandCenter.activeBackground"
              | "commandCenter.border"
              | "editorCommentsWidget.resolvedBorder"
              | "editorCommentsWidget.unresolvedBorder"
              | "editorCommentsWidget.rangeBackground"
              | "editorCommentsWidget.rangeBorder"
              | "editorCommentsWidget.rangeActiveBackground"
              | "editorCommentsWidget.rangeActiveBorder"
              | "editorGutter.commentRangeForeground"
              | "debugToolBar.background"
              | "debugToolBar.border"
              | "debugIcon.startForeground"
              | "editor.stackFrameHighlightBackground"
              | "editor.focusedStackFrameHighlightBackground"
              | "mergeEditor.change.background"
              | "mergeEditor.change.word.background"
              | "mergeEditor.conflict.unhandledUnfocused.border"
              | "mergeEditor.conflict.unhandledFocused.border"
              | "mergeEditor.conflict.handledUnfocused.border"
              | "mergeEditor.conflict.handledFocused.border"
              | "mergeEditor.conflict.handled.minimapOverViewRuler"
              | "mergeEditor.conflict.unhandled.minimapOverViewRuler"
              | "settings.headerForeground"
              | "settings.modifiedItemIndicator"
              | "settings.headerBorder"
              | "settings.sashBorder"
              | "settings.dropdownBackground"
              | "settings.dropdownForeground"
              | "settings.dropdownBorder"
              | "settings.dropdownListBorder"
              | "settings.checkboxBackground"
              | "settings.checkboxForeground"
              | "settings.checkboxBorder"
              | "settings.textInputBackground"
              | "settings.textInputForeground"
              | "settings.textInputBorder"
              | "settings.numberInputBackground"
              | "settings.numberInputForeground"
              | "settings.numberInputBorder"
              | "settings.focusedRowBackground"
              | "settings.rowHoverBackground"
              | "settings.focusedRowBorder"
              | "terminal.background"
              | "terminal.foreground"
              | "terminalCursor.foreground"
              | "terminalCursor.background"
              | "terminal.selectionBackground"
              | "terminal.selectionForeground"
              | "terminalCommandDecoration.defaultBackground"
              | "terminalCommandDecoration.successBackground"
              | "terminalCommandDecoration.errorBackground"
              | "terminalOverviewRuler.cursorForeground"
              | "terminal.border"
              | "terminal.findMatchBackground"
              | "terminal.findMatchBorder"
              | "terminal.findMatchHighlightBackground"
              | "terminal.findMatchHighlightBorder"
              | "terminalOverviewRuler.findMatchForeground"
              | "terminal.dropBackground"
              | "terminal.tab.activeBorder"
              | "testing.iconFailed"
              | "testing.iconErrored"
              | "testing.iconPassed"
              | "testing.runAction"
              | "testing.iconQueued"
              | "testing.iconUnset"
              | "testing.iconSkipped"
              | "testing.peekBorder"
              | "testing.peekHeaderBackground"
              | "testing.message.error.decorationForeground"
              | "testing.message.error.lineBackground"
              | "testing.message.info.decorationForeground"
              | "testing.message.info.lineBackground"
              | "welcomePage.background"
              | "welcomePage.tileBackground"
              | "welcomePage.tileHoverBackground"
              | "welcomePage.tileShadow"
              | "welcomePage.progress.background"
              | "welcomePage.progress.foreground"
              | "walkThrough.embeddedEditorBackground"
              | "debugExceptionWidget.border"
              | "debugExceptionWidget.background"
              | "ports.iconRunningProcessForeground"
              | "statusBar.debuggingBackground"
              | "statusBar.debuggingForeground"
              | "statusBar.debuggingBorder"
              | "editor.inlineValuesForeground"
              | "editor.inlineValuesBackground"
              | "editorGutter.modifiedBackground"
              | "editorGutter.addedBackground"
              | "editorGutter.deletedBackground"
              | "minimapGutter.modifiedBackground"
              | "minimapGutter.addedBackground"
              | "minimapGutter.deletedBackground"
              | "editorOverviewRuler.modifiedForeground"
              | "editorOverviewRuler.addedForeground"
              | "editorOverviewRuler.deletedForeground"
              | "debugIcon.breakpointForeground"
              | "debugIcon.breakpointDisabledForeground"
              | "debugIcon.breakpointUnverifiedForeground"
              | "debugIcon.breakpointCurrentStackframeForeground"
              | "debugIcon.breakpointStackframeForeground"
              | "notebook.cellBorderColor"
              | "notebook.focusedEditorBorder"
              | "notebookStatusSuccessIcon.foreground"
              | "notebookStatusErrorIcon.foreground"
              | "notebookStatusRunningIcon.foreground"
              | "notebook.outputContainerBorderColor"
              | "notebook.outputContainerBackgroundColor"
              | "notebook.cellToolbarSeparator"
              | "notebook.focusedCellBackground"
              | "notebook.selectedCellBackground"
              | "notebook.cellHoverBackground"
              | "notebook.selectedCellBorder"
              | "notebook.inactiveSelectedCellBorder"
              | "notebook.focusedCellBorder"
              | "notebook.inactiveFocusedCellBorder"
              | "notebook.cellStatusBarItemHoverBackground"
              | "notebook.cellInsertionIndicator"
              | "notebookScrollbarSlider.background"
              | "notebookScrollbarSlider.hoverBackground"
              | "notebookScrollbarSlider.activeBackground"
              | "notebook.symbolHighlightBackground"
              | "notebook.cellEditorBackground"
              | "notebook.editorBackground"
              | "statusBarItem.settingsProfilesForeground"
              | "statusBarItem.settingsProfilesBackground"
              | "keybindingTable.headerBackground"
              | "keybindingTable.rowsBackground"
              | "scm.providerBorder"
              | "searchEditor.textInputBorder"
              | "debugTokenExpression.name"
              | "debugTokenExpression.value"
              | "debugTokenExpression.string"
              | "debugTokenExpression.boolean"
              | "debugTokenExpression.number"
              | "debugTokenExpression.error"
              | "debugView.exceptionLabelForeground"
              | "debugView.exceptionLabelBackground"
              | "debugView.stateLabelForeground"
              | "debugView.stateLabelBackground"
              | "debugView.valueChangedHighlight"
              | "debugConsole.infoForeground"
              | "debugConsole.warningForeground"
              | "debugConsole.errorForeground"
              | "debugConsole.sourceForeground"
              | "debugConsoleInputIcon.foreground"
              | "debugIcon.pauseForeground"
              | "debugIcon.stopForeground"
              | "debugIcon.disconnectForeground"
              | "debugIcon.restartForeground"
              | "debugIcon.stepOverForeground"
              | "debugIcon.stepIntoForeground"
              | "debugIcon.stepOutForeground"
              | "debugIcon.continueForeground"
              | "debugIcon.stepBackForeground"
              | "extensionButton.prominentBackground"
              | "extensionButton.prominentForeground"
              | "extensionButton.prominentHoverBackground"
              | "extensionIcon.starForeground"
              | "extensionIcon.verifiedForeground"
              | "extensionIcon.preReleaseForeground"
              | "extensionIcon.sponsorForeground"
              | "terminal.ansiBlack"
              | "terminal.ansiRed"
              | "terminal.ansiGreen"
              | "terminal.ansiYellow"
              | "terminal.ansiBlue"
              | "terminal.ansiMagenta"
              | "terminal.ansiCyan"
              | "terminal.ansiWhite"
              | "terminal.ansiBrightBlack"
              | "terminal.ansiBrightRed"
              | "terminal.ansiBrightGreen"
              | "terminal.ansiBrightYellow"
              | "terminal.ansiBrightBlue"
              | "terminal.ansiBrightMagenta"
              | "terminal.ansiBrightCyan"
              | "terminal.ansiBrightWhite"
              | "interactive.activeCodeBorder"
              | "interactive.inactiveCodeBorder"
              | "interactive.activeCodeBorder"
              | "interactive.inactiveCodeBorder"
              | "gitDecoration.addedResourceForeground"
              | "gitDecoration.modifiedResourceForeground"
              | "gitDecoration.deletedResourceForeground"
              | "gitDecoration.renamedResourceForeground"
              | "gitDecoration.untrackedResourceForeground"
              | "gitDecoration.ignoredResourceForeground"
              | "gitDecoration.stageModifiedResourceForeground"
              | "gitDecoration.stageDeletedResourceForeground"
              | "gitDecoration.conflictingResourceForeground"
              | "gitDecoration.submoduleResourceForeground"
              | "interactive.activeCodeBorder"
              | "interactive.inactiveCodeBorder"
            )
          | string;
        /*
         * The default color for high contrast dark themes. Either a color value in hex (#RRGGBB[AA]) or the identifier of a themable color which provides the default. If not provided, the `dark` color is used as default for high contrast dark themes.
         */
        highContrast?:
          | (
              | "foreground"
              | "disabledForeground"
              | "errorForeground"
              | "descriptionForeground"
              | "icon.foreground"
              | "focusBorder"
              | "contrastBorder"
              | "contrastActiveBorder"
              | "selection.background"
              | "textSeparator.foreground"
              | "textLink.foreground"
              | "textLink.activeForeground"
              | "textPreformat.foreground"
              | "textBlockQuote.background"
              | "textBlockQuote.border"
              | "textCodeBlock.background"
              | "widget.shadow"
              | "input.background"
              | "input.foreground"
              | "input.border"
              | "inputOption.activeBorder"
              | "inputOption.hoverBackground"
              | "inputOption.activeBackground"
              | "inputOption.activeForeground"
              | "input.placeholderForeground"
              | "inputValidation.infoBackground"
              | "inputValidation.infoForeground"
              | "inputValidation.infoBorder"
              | "inputValidation.warningBackground"
              | "inputValidation.warningForeground"
              | "inputValidation.warningBorder"
              | "inputValidation.errorBackground"
              | "inputValidation.errorForeground"
              | "inputValidation.errorBorder"
              | "dropdown.background"
              | "dropdown.listBackground"
              | "dropdown.foreground"
              | "dropdown.border"
              | "checkbox.background"
              | "checkbox.foreground"
              | "checkbox.border"
              | "button.foreground"
              | "button.background"
              | "button.hoverBackground"
              | "button.border"
              | "button.secondaryForeground"
              | "button.secondaryBackground"
              | "button.secondaryHoverBackground"
              | "badge.background"
              | "badge.foreground"
              | "scrollbar.shadow"
              | "scrollbarSlider.background"
              | "scrollbarSlider.hoverBackground"
              | "scrollbarSlider.activeBackground"
              | "progressBar.background"
              | "editorError.background"
              | "editorError.foreground"
              | "editorError.border"
              | "editorWarning.background"
              | "editorWarning.foreground"
              | "editorWarning.border"
              | "editorInfo.background"
              | "editorInfo.foreground"
              | "editorInfo.border"
              | "editorHint.foreground"
              | "editorHint.border"
              | "sash.hoverBorder"
              | "editor.background"
              | "editor.foreground"
              | "editorWidget.background"
              | "editorWidget.foreground"
              | "editorWidget.border"
              | "editorWidget.resizeBorder"
              | "quickInput.background"
              | "quickInput.foreground"
              | "quickInputTitle.background"
              | "pickerGroup.foreground"
              | "pickerGroup.border"
              | "keybindingLabel.background"
              | "keybindingLabel.foreground"
              | "keybindingLabel.border"
              | "keybindingLabel.bottomBorder"
              | "editor.selectionBackground"
              | "editor.selectionForeground"
              | "editor.inactiveSelectionBackground"
              | "editor.selectionHighlightBackground"
              | "editor.selectionHighlightBorder"
              | "editor.findMatchBackground"
              | "editor.findMatchHighlightBackground"
              | "editor.findRangeHighlightBackground"
              | "editor.findMatchBorder"
              | "editor.findMatchHighlightBorder"
              | "editor.findRangeHighlightBorder"
              | "searchEditor.findMatchBackground"
              | "searchEditor.findMatchBorder"
              | "editor.hoverHighlightBackground"
              | "editorHoverWidget.background"
              | "editorHoverWidget.foreground"
              | "editorHoverWidget.border"
              | "editorHoverWidget.statusBarBackground"
              | "editorLink.activeForeground"
              | "editorInlayHint.foreground"
              | "editorInlayHint.background"
              | "editorInlayHint.typeForeground"
              | "editorInlayHint.typeBackground"
              | "editorInlayHint.parameterForeground"
              | "editorInlayHint.parameterBackground"
              | "editorLightBulb.foreground"
              | "editorLightBulbAutoFix.foreground"
              | "diffEditor.insertedTextBackground"
              | "diffEditor.removedTextBackground"
              | "diffEditor.insertedLineBackground"
              | "diffEditor.removedLineBackground"
              | "diffEditorGutter.insertedLineBackground"
              | "diffEditorGutter.removedLineBackground"
              | "diffEditorOverview.insertedForeground"
              | "diffEditorOverview.removedForeground"
              | "diffEditor.insertedTextBorder"
              | "diffEditor.removedTextBorder"
              | "diffEditor.border"
              | "diffEditor.diagonalFill"
              | "list.focusBackground"
              | "list.focusForeground"
              | "list.focusOutline"
              | "list.focusAndSelectionOutline"
              | "list.activeSelectionBackground"
              | "list.activeSelectionForeground"
              | "list.activeSelectionIconForeground"
              | "list.inactiveSelectionBackground"
              | "list.inactiveSelectionForeground"
              | "list.inactiveSelectionIconForeground"
              | "list.inactiveFocusBackground"
              | "list.inactiveFocusOutline"
              | "list.hoverBackground"
              | "list.hoverForeground"
              | "list.dropBackground"
              | "list.highlightForeground"
              | "list.focusHighlightForeground"
              | "list.invalidItemForeground"
              | "list.errorForeground"
              | "list.warningForeground"
              | "listFilterWidget.background"
              | "listFilterWidget.outline"
              | "listFilterWidget.noMatchesOutline"
              | "list.filterMatchBackground"
              | "list.filterMatchBorder"
              | "tree.indentGuidesStroke"
              | "tree.tableColumnsBorder"
              | "tree.tableOddRowsBackground"
              | "list.deemphasizedForeground"
              | "quickInput.list.focusBackground"
              | "quickInputList.focusForeground"
              | "quickInputList.focusIconForeground"
              | "quickInputList.focusBackground"
              | "menu.border"
              | "menu.foreground"
              | "menu.background"
              | "menu.selectionForeground"
              | "menu.selectionBackground"
              | "menu.selectionBorder"
              | "menu.separatorBackground"
              | "toolbar.hoverBackground"
              | "toolbar.hoverOutline"
              | "toolbar.activeBackground"
              | "editor.snippetTabstopHighlightBackground"
              | "editor.snippetTabstopHighlightBorder"
              | "editor.snippetFinalTabstopHighlightBackground"
              | "editor.snippetFinalTabstopHighlightBorder"
              | "breadcrumb.foreground"
              | "breadcrumb.background"
              | "breadcrumb.focusForeground"
              | "breadcrumb.activeSelectionForeground"
              | "breadcrumbPicker.background"
              | "merge.currentHeaderBackground"
              | "merge.currentContentBackground"
              | "merge.incomingHeaderBackground"
              | "merge.incomingContentBackground"
              | "merge.commonHeaderBackground"
              | "merge.commonContentBackground"
              | "merge.border"
              | "editorOverviewRuler.currentContentForeground"
              | "editorOverviewRuler.incomingContentForeground"
              | "editorOverviewRuler.commonContentForeground"
              | "editorOverviewRuler.findMatchForeground"
              | "editorOverviewRuler.selectionHighlightForeground"
              | "minimap.findMatchHighlight"
              | "minimap.selectionOccurrenceHighlight"
              | "minimap.selectionHighlight"
              | "minimap.errorHighlight"
              | "minimap.warningHighlight"
              | "minimap.background"
              | "minimap.foregroundOpacity"
              | "minimapSlider.background"
              | "minimapSlider.hoverBackground"
              | "minimapSlider.activeBackground"
              | "problemsErrorIcon.foreground"
              | "problemsWarningIcon.foreground"
              | "problemsInfoIcon.foreground"
              | "charts.foreground"
              | "charts.lines"
              | "charts.red"
              | "charts.blue"
              | "charts.yellow"
              | "charts.orange"
              | "charts.green"
              | "charts.purple"
              | "editor.lineHighlightBackground"
              | "editor.lineHighlightBorder"
              | "editor.rangeHighlightBackground"
              | "editor.rangeHighlightBorder"
              | "editor.symbolHighlightBackground"
              | "editor.symbolHighlightBorder"
              | "editorCursor.foreground"
              | "editorCursor.background"
              | "editorWhitespace.foreground"
              | "editorIndentGuide.background"
              | "editorIndentGuide.activeBackground"
              | "editorLineNumber.foreground"
              | "editorActiveLineNumber.foreground"
              | "editorLineNumber.activeForeground"
              | "editorRuler.foreground"
              | "editorCodeLens.foreground"
              | "editorBracketMatch.background"
              | "editorBracketMatch.border"
              | "editorOverviewRuler.border"
              | "editorOverviewRuler.background"
              | "editorGutter.background"
              | "editorUnnecessaryCode.border"
              | "editorUnnecessaryCode.opacity"
              | "editorGhostText.border"
              | "editorGhostText.foreground"
              | "editorGhostText.background"
              | "editorOverviewRuler.rangeHighlightForeground"
              | "editorOverviewRuler.errorForeground"
              | "editorOverviewRuler.warningForeground"
              | "editorOverviewRuler.infoForeground"
              | "editorBracketHighlight.foreground1"
              | "editorBracketHighlight.foreground2"
              | "editorBracketHighlight.foreground3"
              | "editorBracketHighlight.foreground4"
              | "editorBracketHighlight.foreground5"
              | "editorBracketHighlight.foreground6"
              | "editorBracketHighlight.unexpectedBracket.foreground"
              | "editorBracketPairGuide.background1"
              | "editorBracketPairGuide.background2"
              | "editorBracketPairGuide.background3"
              | "editorBracketPairGuide.background4"
              | "editorBracketPairGuide.background5"
              | "editorBracketPairGuide.background6"
              | "editorBracketPairGuide.activeBackground1"
              | "editorBracketPairGuide.activeBackground2"
              | "editorBracketPairGuide.activeBackground3"
              | "editorBracketPairGuide.activeBackground4"
              | "editorBracketPairGuide.activeBackground5"
              | "editorBracketPairGuide.activeBackground6"
              | "editorUnicodeHighlight.border"
              | "editorUnicodeHighlight.background"
              | "symbolIcon.arrayForeground"
              | "symbolIcon.booleanForeground"
              | "symbolIcon.classForeground"
              | "symbolIcon.colorForeground"
              | "symbolIcon.constantForeground"
              | "symbolIcon.constructorForeground"
              | "symbolIcon.enumeratorForeground"
              | "symbolIcon.enumeratorMemberForeground"
              | "symbolIcon.eventForeground"
              | "symbolIcon.fieldForeground"
              | "symbolIcon.fileForeground"
              | "symbolIcon.folderForeground"
              | "symbolIcon.functionForeground"
              | "symbolIcon.interfaceForeground"
              | "symbolIcon.keyForeground"
              | "symbolIcon.keywordForeground"
              | "symbolIcon.methodForeground"
              | "symbolIcon.moduleForeground"
              | "symbolIcon.namespaceForeground"
              | "symbolIcon.nullForeground"
              | "symbolIcon.numberForeground"
              | "symbolIcon.objectForeground"
              | "symbolIcon.operatorForeground"
              | "symbolIcon.packageForeground"
              | "symbolIcon.propertyForeground"
              | "symbolIcon.referenceForeground"
              | "symbolIcon.snippetForeground"
              | "symbolIcon.stringForeground"
              | "symbolIcon.structForeground"
              | "symbolIcon.textForeground"
              | "symbolIcon.typeParameterForeground"
              | "symbolIcon.unitForeground"
              | "symbolIcon.variableForeground"
              | "editorHoverWidget.highlightForeground"
              | "editorOverviewRuler.bracketMatchForeground"
              | "editor.foldBackground"
              | "editorGutter.foldingControlForeground"
              | "editor.linkedEditingBackground"
              | "editor.wordHighlightBackground"
              | "editor.wordHighlightStrongBackground"
              | "editor.wordHighlightBorder"
              | "editor.wordHighlightStrongBorder"
              | "editorOverviewRuler.wordHighlightForeground"
              | "editorOverviewRuler.wordHighlightStrongForeground"
              | "peekViewTitle.background"
              | "peekViewTitleLabel.foreground"
              | "peekViewTitleDescription.foreground"
              | "peekView.border"
              | "peekViewResult.background"
              | "peekViewResult.lineForeground"
              | "peekViewResult.fileForeground"
              | "peekViewResult.selectionBackground"
              | "peekViewResult.selectionForeground"
              | "peekViewEditor.background"
              | "peekViewEditorGutter.background"
              | "peekViewResult.matchHighlightBackground"
              | "peekViewEditor.matchHighlightBackground"
              | "peekViewEditor.matchHighlightBorder"
              | "editorMarkerNavigationError.background"
              | "editorMarkerNavigationError.headerBackground"
              | "editorMarkerNavigationWarning.background"
              | "editorMarkerNavigationWarning.headerBackground"
              | "editorMarkerNavigationInfo.background"
              | "editorMarkerNavigationInfo.headerBackground"
              | "editorMarkerNavigation.background"
              | "editorSuggestWidget.background"
              | "editorSuggestWidget.border"
              | "editorSuggestWidget.foreground"
              | "editorSuggestWidget.selectedForeground"
              | "editorSuggestWidget.selectedIconForeground"
              | "editorSuggestWidget.selectedBackground"
              | "editorSuggestWidget.highlightForeground"
              | "editorSuggestWidget.focusHighlightForeground"
              | "editorSuggestWidgetStatus.foreground"
              | "tab.activeBackground"
              | "tab.unfocusedActiveBackground"
              | "tab.inactiveBackground"
              | "tab.unfocusedInactiveBackground"
              | "tab.activeForeground"
              | "tab.inactiveForeground"
              | "tab.unfocusedActiveForeground"
              | "tab.unfocusedInactiveForeground"
              | "tab.hoverBackground"
              | "tab.unfocusedHoverBackground"
              | "tab.hoverForeground"
              | "tab.unfocusedHoverForeground"
              | "tab.border"
              | "tab.lastPinnedBorder"
              | "tab.activeBorder"
              | "tab.unfocusedActiveBorder"
              | "tab.activeBorderTop"
              | "tab.unfocusedActiveBorderTop"
              | "tab.hoverBorder"
              | "tab.unfocusedHoverBorder"
              | "tab.activeModifiedBorder"
              | "tab.inactiveModifiedBorder"
              | "tab.unfocusedActiveModifiedBorder"
              | "tab.unfocusedInactiveModifiedBorder"
              | "editorPane.background"
              | "editorGroup.emptyBackground"
              | "editorGroup.focusedEmptyBorder"
              | "editorGroupHeader.tabsBackground"
              | "editorGroupHeader.tabsBorder"
              | "editorGroupHeader.noTabsBackground"
              | "editorGroupHeader.border"
              | "editorGroup.border"
              | "editorGroup.dropBackground"
              | "editorGroup.dropIntoPromptForeground"
              | "editorGroup.dropIntoPromptBackground"
              | "editorGroup.dropIntoPromptBorder"
              | "sideBySideEditor.horizontalBorder"
              | "sideBySideEditor.verticalBorder"
              | "panel.background"
              | "panel.border"
              | "panelTitle.activeForeground"
              | "panelTitle.inactiveForeground"
              | "panelTitle.activeBorder"
              | "panelInput.border"
              | "panel.dropBorder"
              | "panelSection.dropBackground"
              | "panelSectionHeader.background"
              | "panelSectionHeader.foreground"
              | "panelSectionHeader.border"
              | "panelSection.border"
              | "banner.background"
              | "banner.foreground"
              | "banner.iconForeground"
              | "statusBar.foreground"
              | "statusBar.noFolderForeground"
              | "statusBar.background"
              | "statusBar.noFolderBackground"
              | "statusBar.border"
              | "statusBar.focusBorder"
              | "statusBar.noFolderBorder"
              | "statusBarItem.activeBackground"
              | "statusBarItem.focusBorder"
              | "statusBarItem.hoverBackground"
              | "statusBarItem.compactHoverBackground"
              | "statusBarItem.prominentForeground"
              | "statusBarItem.prominentBackground"
              | "statusBarItem.prominentHoverBackground"
              | "statusBarItem.errorBackground"
              | "statusBarItem.errorForeground"
              | "statusBarItem.warningBackground"
              | "statusBarItem.warningForeground"
              | "activityBar.background"
              | "activityBar.foreground"
              | "activityBar.inactiveForeground"
              | "activityBar.border"
              | "activityBar.activeBorder"
              | "activityBar.activeFocusBorder"
              | "activityBar.activeBackground"
              | "activityBar.dropBorder"
              | "activityBarBadge.background"
              | "activityBarBadge.foreground"
              | "statusBarItem.remoteBackground"
              | "statusBarItem.remoteForeground"
              | "extensionBadge.remoteBackground"
              | "extensionBadge.remoteForeground"
              | "sideBar.background"
              | "sideBar.foreground"
              | "sideBar.border"
              | "sideBarTitle.foreground"
              | "sideBar.dropBackground"
              | "sideBarSectionHeader.background"
              | "sideBarSectionHeader.foreground"
              | "sideBarSectionHeader.border"
              | "titleBar.activeForeground"
              | "titleBar.inactiveForeground"
              | "titleBar.activeBackground"
              | "titleBar.inactiveBackground"
              | "titleBar.border"
              | "menubar.selectionForeground"
              | "menubar.selectionBackground"
              | "menubar.selectionBorder"
              | "notificationCenter.border"
              | "notificationToast.border"
              | "notifications.foreground"
              | "notifications.background"
              | "notificationLink.foreground"
              | "notificationCenterHeader.foreground"
              | "notificationCenterHeader.background"
              | "notifications.border"
              | "notificationsErrorIcon.foreground"
              | "notificationsWarningIcon.foreground"
              | "notificationsInfoIcon.foreground"
              | "window.activeBorder"
              | "window.inactiveBorder"
              | "commandCenter.foreground"
              | "commandCenter.activeForeground"
              | "commandCenter.background"
              | "commandCenter.activeBackground"
              | "commandCenter.border"
              | "editorCommentsWidget.resolvedBorder"
              | "editorCommentsWidget.unresolvedBorder"
              | "editorCommentsWidget.rangeBackground"
              | "editorCommentsWidget.rangeBorder"
              | "editorCommentsWidget.rangeActiveBackground"
              | "editorCommentsWidget.rangeActiveBorder"
              | "editorGutter.commentRangeForeground"
              | "debugToolBar.background"
              | "debugToolBar.border"
              | "debugIcon.startForeground"
              | "editor.stackFrameHighlightBackground"
              | "editor.focusedStackFrameHighlightBackground"
              | "mergeEditor.change.background"
              | "mergeEditor.change.word.background"
              | "mergeEditor.conflict.unhandledUnfocused.border"
              | "mergeEditor.conflict.unhandledFocused.border"
              | "mergeEditor.conflict.handledUnfocused.border"
              | "mergeEditor.conflict.handledFocused.border"
              | "mergeEditor.conflict.handled.minimapOverViewRuler"
              | "mergeEditor.conflict.unhandled.minimapOverViewRuler"
              | "settings.headerForeground"
              | "settings.modifiedItemIndicator"
              | "settings.headerBorder"
              | "settings.sashBorder"
              | "settings.dropdownBackground"
              | "settings.dropdownForeground"
              | "settings.dropdownBorder"
              | "settings.dropdownListBorder"
              | "settings.checkboxBackground"
              | "settings.checkboxForeground"
              | "settings.checkboxBorder"
              | "settings.textInputBackground"
              | "settings.textInputForeground"
              | "settings.textInputBorder"
              | "settings.numberInputBackground"
              | "settings.numberInputForeground"
              | "settings.numberInputBorder"
              | "settings.focusedRowBackground"
              | "settings.rowHoverBackground"
              | "settings.focusedRowBorder"
              | "terminal.background"
              | "terminal.foreground"
              | "terminalCursor.foreground"
              | "terminalCursor.background"
              | "terminal.selectionBackground"
              | "terminal.selectionForeground"
              | "terminalCommandDecoration.defaultBackground"
              | "terminalCommandDecoration.successBackground"
              | "terminalCommandDecoration.errorBackground"
              | "terminalOverviewRuler.cursorForeground"
              | "terminal.border"
              | "terminal.findMatchBackground"
              | "terminal.findMatchBorder"
              | "terminal.findMatchHighlightBackground"
              | "terminal.findMatchHighlightBorder"
              | "terminalOverviewRuler.findMatchForeground"
              | "terminal.dropBackground"
              | "terminal.tab.activeBorder"
              | "testing.iconFailed"
              | "testing.iconErrored"
              | "testing.iconPassed"
              | "testing.runAction"
              | "testing.iconQueued"
              | "testing.iconUnset"
              | "testing.iconSkipped"
              | "testing.peekBorder"
              | "testing.peekHeaderBackground"
              | "testing.message.error.decorationForeground"
              | "testing.message.error.lineBackground"
              | "testing.message.info.decorationForeground"
              | "testing.message.info.lineBackground"
              | "welcomePage.background"
              | "welcomePage.tileBackground"
              | "welcomePage.tileHoverBackground"
              | "welcomePage.tileShadow"
              | "welcomePage.progress.background"
              | "welcomePage.progress.foreground"
              | "walkThrough.embeddedEditorBackground"
              | "debugExceptionWidget.border"
              | "debugExceptionWidget.background"
              | "ports.iconRunningProcessForeground"
              | "statusBar.debuggingBackground"
              | "statusBar.debuggingForeground"
              | "statusBar.debuggingBorder"
              | "editor.inlineValuesForeground"
              | "editor.inlineValuesBackground"
              | "editorGutter.modifiedBackground"
              | "editorGutter.addedBackground"
              | "editorGutter.deletedBackground"
              | "minimapGutter.modifiedBackground"
              | "minimapGutter.addedBackground"
              | "minimapGutter.deletedBackground"
              | "editorOverviewRuler.modifiedForeground"
              | "editorOverviewRuler.addedForeground"
              | "editorOverviewRuler.deletedForeground"
              | "debugIcon.breakpointForeground"
              | "debugIcon.breakpointDisabledForeground"
              | "debugIcon.breakpointUnverifiedForeground"
              | "debugIcon.breakpointCurrentStackframeForeground"
              | "debugIcon.breakpointStackframeForeground"
              | "notebook.cellBorderColor"
              | "notebook.focusedEditorBorder"
              | "notebookStatusSuccessIcon.foreground"
              | "notebookStatusErrorIcon.foreground"
              | "notebookStatusRunningIcon.foreground"
              | "notebook.outputContainerBorderColor"
              | "notebook.outputContainerBackgroundColor"
              | "notebook.cellToolbarSeparator"
              | "notebook.focusedCellBackground"
              | "notebook.selectedCellBackground"
              | "notebook.cellHoverBackground"
              | "notebook.selectedCellBorder"
              | "notebook.inactiveSelectedCellBorder"
              | "notebook.focusedCellBorder"
              | "notebook.inactiveFocusedCellBorder"
              | "notebook.cellStatusBarItemHoverBackground"
              | "notebook.cellInsertionIndicator"
              | "notebookScrollbarSlider.background"
              | "notebookScrollbarSlider.hoverBackground"
              | "notebookScrollbarSlider.activeBackground"
              | "notebook.symbolHighlightBackground"
              | "notebook.cellEditorBackground"
              | "notebook.editorBackground"
              | "statusBarItem.settingsProfilesForeground"
              | "statusBarItem.settingsProfilesBackground"
              | "keybindingTable.headerBackground"
              | "keybindingTable.rowsBackground"
              | "scm.providerBorder"
              | "searchEditor.textInputBorder"
              | "debugTokenExpression.name"
              | "debugTokenExpression.value"
              | "debugTokenExpression.string"
              | "debugTokenExpression.boolean"
              | "debugTokenExpression.number"
              | "debugTokenExpression.error"
              | "debugView.exceptionLabelForeground"
              | "debugView.exceptionLabelBackground"
              | "debugView.stateLabelForeground"
              | "debugView.stateLabelBackground"
              | "debugView.valueChangedHighlight"
              | "debugConsole.infoForeground"
              | "debugConsole.warningForeground"
              | "debugConsole.errorForeground"
              | "debugConsole.sourceForeground"
              | "debugConsoleInputIcon.foreground"
              | "debugIcon.pauseForeground"
              | "debugIcon.stopForeground"
              | "debugIcon.disconnectForeground"
              | "debugIcon.restartForeground"
              | "debugIcon.stepOverForeground"
              | "debugIcon.stepIntoForeground"
              | "debugIcon.stepOutForeground"
              | "debugIcon.continueForeground"
              | "debugIcon.stepBackForeground"
              | "extensionButton.prominentBackground"
              | "extensionButton.prominentForeground"
              | "extensionButton.prominentHoverBackground"
              | "extensionIcon.starForeground"
              | "extensionIcon.verifiedForeground"
              | "extensionIcon.preReleaseForeground"
              | "extensionIcon.sponsorForeground"
              | "terminal.ansiBlack"
              | "terminal.ansiRed"
              | "terminal.ansiGreen"
              | "terminal.ansiYellow"
              | "terminal.ansiBlue"
              | "terminal.ansiMagenta"
              | "terminal.ansiCyan"
              | "terminal.ansiWhite"
              | "terminal.ansiBrightBlack"
              | "terminal.ansiBrightRed"
              | "terminal.ansiBrightGreen"
              | "terminal.ansiBrightYellow"
              | "terminal.ansiBrightBlue"
              | "terminal.ansiBrightMagenta"
              | "terminal.ansiBrightCyan"
              | "terminal.ansiBrightWhite"
              | "interactive.activeCodeBorder"
              | "interactive.inactiveCodeBorder"
              | "interactive.activeCodeBorder"
              | "interactive.inactiveCodeBorder"
              | "gitDecoration.addedResourceForeground"
              | "gitDecoration.modifiedResourceForeground"
              | "gitDecoration.deletedResourceForeground"
              | "gitDecoration.renamedResourceForeground"
              | "gitDecoration.untrackedResourceForeground"
              | "gitDecoration.ignoredResourceForeground"
              | "gitDecoration.stageModifiedResourceForeground"
              | "gitDecoration.stageDeletedResourceForeground"
              | "gitDecoration.conflictingResourceForeground"
              | "gitDecoration.submoduleResourceForeground"
              | "interactive.activeCodeBorder"
              | "interactive.inactiveCodeBorder"
            )
          | string;
        /*
         * The default color for high contrast light themes. Either a color value in hex (#RRGGBB[AA]) or the identifier of a themable color which provides the default. If not provided, the `light` color is used as default for high contrast light themes.
         */
        highContrastLight?:
          | (
              | "foreground"
              | "disabledForeground"
              | "errorForeground"
              | "descriptionForeground"
              | "icon.foreground"
              | "focusBorder"
              | "contrastBorder"
              | "contrastActiveBorder"
              | "selection.background"
              | "textSeparator.foreground"
              | "textLink.foreground"
              | "textLink.activeForeground"
              | "textPreformat.foreground"
              | "textBlockQuote.background"
              | "textBlockQuote.border"
              | "textCodeBlock.background"
              | "widget.shadow"
              | "input.background"
              | "input.foreground"
              | "input.border"
              | "inputOption.activeBorder"
              | "inputOption.hoverBackground"
              | "inputOption.activeBackground"
              | "inputOption.activeForeground"
              | "input.placeholderForeground"
              | "inputValidation.infoBackground"
              | "inputValidation.infoForeground"
              | "inputValidation.infoBorder"
              | "inputValidation.warningBackground"
              | "inputValidation.warningForeground"
              | "inputValidation.warningBorder"
              | "inputValidation.errorBackground"
              | "inputValidation.errorForeground"
              | "inputValidation.errorBorder"
              | "dropdown.background"
              | "dropdown.listBackground"
              | "dropdown.foreground"
              | "dropdown.border"
              | "checkbox.background"
              | "checkbox.foreground"
              | "checkbox.border"
              | "button.foreground"
              | "button.background"
              | "button.hoverBackground"
              | "button.border"
              | "button.secondaryForeground"
              | "button.secondaryBackground"
              | "button.secondaryHoverBackground"
              | "badge.background"
              | "badge.foreground"
              | "scrollbar.shadow"
              | "scrollbarSlider.background"
              | "scrollbarSlider.hoverBackground"
              | "scrollbarSlider.activeBackground"
              | "progressBar.background"
              | "editorError.background"
              | "editorError.foreground"
              | "editorError.border"
              | "editorWarning.background"
              | "editorWarning.foreground"
              | "editorWarning.border"
              | "editorInfo.background"
              | "editorInfo.foreground"
              | "editorInfo.border"
              | "editorHint.foreground"
              | "editorHint.border"
              | "sash.hoverBorder"
              | "editor.background"
              | "editor.foreground"
              | "editorWidget.background"
              | "editorWidget.foreground"
              | "editorWidget.border"
              | "editorWidget.resizeBorder"
              | "quickInput.background"
              | "quickInput.foreground"
              | "quickInputTitle.background"
              | "pickerGroup.foreground"
              | "pickerGroup.border"
              | "keybindingLabel.background"
              | "keybindingLabel.foreground"
              | "keybindingLabel.border"
              | "keybindingLabel.bottomBorder"
              | "editor.selectionBackground"
              | "editor.selectionForeground"
              | "editor.inactiveSelectionBackground"
              | "editor.selectionHighlightBackground"
              | "editor.selectionHighlightBorder"
              | "editor.findMatchBackground"
              | "editor.findMatchHighlightBackground"
              | "editor.findRangeHighlightBackground"
              | "editor.findMatchBorder"
              | "editor.findMatchHighlightBorder"
              | "editor.findRangeHighlightBorder"
              | "searchEditor.findMatchBackground"
              | "searchEditor.findMatchBorder"
              | "editor.hoverHighlightBackground"
              | "editorHoverWidget.background"
              | "editorHoverWidget.foreground"
              | "editorHoverWidget.border"
              | "editorHoverWidget.statusBarBackground"
              | "editorLink.activeForeground"
              | "editorInlayHint.foreground"
              | "editorInlayHint.background"
              | "editorInlayHint.typeForeground"
              | "editorInlayHint.typeBackground"
              | "editorInlayHint.parameterForeground"
              | "editorInlayHint.parameterBackground"
              | "editorLightBulb.foreground"
              | "editorLightBulbAutoFix.foreground"
              | "diffEditor.insertedTextBackground"
              | "diffEditor.removedTextBackground"
              | "diffEditor.insertedLineBackground"
              | "diffEditor.removedLineBackground"
              | "diffEditorGutter.insertedLineBackground"
              | "diffEditorGutter.removedLineBackground"
              | "diffEditorOverview.insertedForeground"
              | "diffEditorOverview.removedForeground"
              | "diffEditor.insertedTextBorder"
              | "diffEditor.removedTextBorder"
              | "diffEditor.border"
              | "diffEditor.diagonalFill"
              | "list.focusBackground"
              | "list.focusForeground"
              | "list.focusOutline"
              | "list.focusAndSelectionOutline"
              | "list.activeSelectionBackground"
              | "list.activeSelectionForeground"
              | "list.activeSelectionIconForeground"
              | "list.inactiveSelectionBackground"
              | "list.inactiveSelectionForeground"
              | "list.inactiveSelectionIconForeground"
              | "list.inactiveFocusBackground"
              | "list.inactiveFocusOutline"
              | "list.hoverBackground"
              | "list.hoverForeground"
              | "list.dropBackground"
              | "list.highlightForeground"
              | "list.focusHighlightForeground"
              | "list.invalidItemForeground"
              | "list.errorForeground"
              | "list.warningForeground"
              | "listFilterWidget.background"
              | "listFilterWidget.outline"
              | "listFilterWidget.noMatchesOutline"
              | "list.filterMatchBackground"
              | "list.filterMatchBorder"
              | "tree.indentGuidesStroke"
              | "tree.tableColumnsBorder"
              | "tree.tableOddRowsBackground"
              | "list.deemphasizedForeground"
              | "quickInput.list.focusBackground"
              | "quickInputList.focusForeground"
              | "quickInputList.focusIconForeground"
              | "quickInputList.focusBackground"
              | "menu.border"
              | "menu.foreground"
              | "menu.background"
              | "menu.selectionForeground"
              | "menu.selectionBackground"
              | "menu.selectionBorder"
              | "menu.separatorBackground"
              | "toolbar.hoverBackground"
              | "toolbar.hoverOutline"
              | "toolbar.activeBackground"
              | "editor.snippetTabstopHighlightBackground"
              | "editor.snippetTabstopHighlightBorder"
              | "editor.snippetFinalTabstopHighlightBackground"
              | "editor.snippetFinalTabstopHighlightBorder"
              | "breadcrumb.foreground"
              | "breadcrumb.background"
              | "breadcrumb.focusForeground"
              | "breadcrumb.activeSelectionForeground"
              | "breadcrumbPicker.background"
              | "merge.currentHeaderBackground"
              | "merge.currentContentBackground"
              | "merge.incomingHeaderBackground"
              | "merge.incomingContentBackground"
              | "merge.commonHeaderBackground"
              | "merge.commonContentBackground"
              | "merge.border"
              | "editorOverviewRuler.currentContentForeground"
              | "editorOverviewRuler.incomingContentForeground"
              | "editorOverviewRuler.commonContentForeground"
              | "editorOverviewRuler.findMatchForeground"
              | "editorOverviewRuler.selectionHighlightForeground"
              | "minimap.findMatchHighlight"
              | "minimap.selectionOccurrenceHighlight"
              | "minimap.selectionHighlight"
              | "minimap.errorHighlight"
              | "minimap.warningHighlight"
              | "minimap.background"
              | "minimap.foregroundOpacity"
              | "minimapSlider.background"
              | "minimapSlider.hoverBackground"
              | "minimapSlider.activeBackground"
              | "problemsErrorIcon.foreground"
              | "problemsWarningIcon.foreground"
              | "problemsInfoIcon.foreground"
              | "charts.foreground"
              | "charts.lines"
              | "charts.red"
              | "charts.blue"
              | "charts.yellow"
              | "charts.orange"
              | "charts.green"
              | "charts.purple"
              | "editor.lineHighlightBackground"
              | "editor.lineHighlightBorder"
              | "editor.rangeHighlightBackground"
              | "editor.rangeHighlightBorder"
              | "editor.symbolHighlightBackground"
              | "editor.symbolHighlightBorder"
              | "editorCursor.foreground"
              | "editorCursor.background"
              | "editorWhitespace.foreground"
              | "editorIndentGuide.background"
              | "editorIndentGuide.activeBackground"
              | "editorLineNumber.foreground"
              | "editorActiveLineNumber.foreground"
              | "editorLineNumber.activeForeground"
              | "editorRuler.foreground"
              | "editorCodeLens.foreground"
              | "editorBracketMatch.background"
              | "editorBracketMatch.border"
              | "editorOverviewRuler.border"
              | "editorOverviewRuler.background"
              | "editorGutter.background"
              | "editorUnnecessaryCode.border"
              | "editorUnnecessaryCode.opacity"
              | "editorGhostText.border"
              | "editorGhostText.foreground"
              | "editorGhostText.background"
              | "editorOverviewRuler.rangeHighlightForeground"
              | "editorOverviewRuler.errorForeground"
              | "editorOverviewRuler.warningForeground"
              | "editorOverviewRuler.infoForeground"
              | "editorBracketHighlight.foreground1"
              | "editorBracketHighlight.foreground2"
              | "editorBracketHighlight.foreground3"
              | "editorBracketHighlight.foreground4"
              | "editorBracketHighlight.foreground5"
              | "editorBracketHighlight.foreground6"
              | "editorBracketHighlight.unexpectedBracket.foreground"
              | "editorBracketPairGuide.background1"
              | "editorBracketPairGuide.background2"
              | "editorBracketPairGuide.background3"
              | "editorBracketPairGuide.background4"
              | "editorBracketPairGuide.background5"
              | "editorBracketPairGuide.background6"
              | "editorBracketPairGuide.activeBackground1"
              | "editorBracketPairGuide.activeBackground2"
              | "editorBracketPairGuide.activeBackground3"
              | "editorBracketPairGuide.activeBackground4"
              | "editorBracketPairGuide.activeBackground5"
              | "editorBracketPairGuide.activeBackground6"
              | "editorUnicodeHighlight.border"
              | "editorUnicodeHighlight.background"
              | "symbolIcon.arrayForeground"
              | "symbolIcon.booleanForeground"
              | "symbolIcon.classForeground"
              | "symbolIcon.colorForeground"
              | "symbolIcon.constantForeground"
              | "symbolIcon.constructorForeground"
              | "symbolIcon.enumeratorForeground"
              | "symbolIcon.enumeratorMemberForeground"
              | "symbolIcon.eventForeground"
              | "symbolIcon.fieldForeground"
              | "symbolIcon.fileForeground"
              | "symbolIcon.folderForeground"
              | "symbolIcon.functionForeground"
              | "symbolIcon.interfaceForeground"
              | "symbolIcon.keyForeground"
              | "symbolIcon.keywordForeground"
              | "symbolIcon.methodForeground"
              | "symbolIcon.moduleForeground"
              | "symbolIcon.namespaceForeground"
              | "symbolIcon.nullForeground"
              | "symbolIcon.numberForeground"
              | "symbolIcon.objectForeground"
              | "symbolIcon.operatorForeground"
              | "symbolIcon.packageForeground"
              | "symbolIcon.propertyForeground"
              | "symbolIcon.referenceForeground"
              | "symbolIcon.snippetForeground"
              | "symbolIcon.stringForeground"
              | "symbolIcon.structForeground"
              | "symbolIcon.textForeground"
              | "symbolIcon.typeParameterForeground"
              | "symbolIcon.unitForeground"
              | "symbolIcon.variableForeground"
              | "editorHoverWidget.highlightForeground"
              | "editorOverviewRuler.bracketMatchForeground"
              | "editor.foldBackground"
              | "editorGutter.foldingControlForeground"
              | "editor.linkedEditingBackground"
              | "editor.wordHighlightBackground"
              | "editor.wordHighlightStrongBackground"
              | "editor.wordHighlightBorder"
              | "editor.wordHighlightStrongBorder"
              | "editorOverviewRuler.wordHighlightForeground"
              | "editorOverviewRuler.wordHighlightStrongForeground"
              | "peekViewTitle.background"
              | "peekViewTitleLabel.foreground"
              | "peekViewTitleDescription.foreground"
              | "peekView.border"
              | "peekViewResult.background"
              | "peekViewResult.lineForeground"
              | "peekViewResult.fileForeground"
              | "peekViewResult.selectionBackground"
              | "peekViewResult.selectionForeground"
              | "peekViewEditor.background"
              | "peekViewEditorGutter.background"
              | "peekViewResult.matchHighlightBackground"
              | "peekViewEditor.matchHighlightBackground"
              | "peekViewEditor.matchHighlightBorder"
              | "editorMarkerNavigationError.background"
              | "editorMarkerNavigationError.headerBackground"
              | "editorMarkerNavigationWarning.background"
              | "editorMarkerNavigationWarning.headerBackground"
              | "editorMarkerNavigationInfo.background"
              | "editorMarkerNavigationInfo.headerBackground"
              | "editorMarkerNavigation.background"
              | "editorSuggestWidget.background"
              | "editorSuggestWidget.border"
              | "editorSuggestWidget.foreground"
              | "editorSuggestWidget.selectedForeground"
              | "editorSuggestWidget.selectedIconForeground"
              | "editorSuggestWidget.selectedBackground"
              | "editorSuggestWidget.highlightForeground"
              | "editorSuggestWidget.focusHighlightForeground"
              | "editorSuggestWidgetStatus.foreground"
              | "tab.activeBackground"
              | "tab.unfocusedActiveBackground"
              | "tab.inactiveBackground"
              | "tab.unfocusedInactiveBackground"
              | "tab.activeForeground"
              | "tab.inactiveForeground"
              | "tab.unfocusedActiveForeground"
              | "tab.unfocusedInactiveForeground"
              | "tab.hoverBackground"
              | "tab.unfocusedHoverBackground"
              | "tab.hoverForeground"
              | "tab.unfocusedHoverForeground"
              | "tab.border"
              | "tab.lastPinnedBorder"
              | "tab.activeBorder"
              | "tab.unfocusedActiveBorder"
              | "tab.activeBorderTop"
              | "tab.unfocusedActiveBorderTop"
              | "tab.hoverBorder"
              | "tab.unfocusedHoverBorder"
              | "tab.activeModifiedBorder"
              | "tab.inactiveModifiedBorder"
              | "tab.unfocusedActiveModifiedBorder"
              | "tab.unfocusedInactiveModifiedBorder"
              | "editorPane.background"
              | "editorGroup.emptyBackground"
              | "editorGroup.focusedEmptyBorder"
              | "editorGroupHeader.tabsBackground"
              | "editorGroupHeader.tabsBorder"
              | "editorGroupHeader.noTabsBackground"
              | "editorGroupHeader.border"
              | "editorGroup.border"
              | "editorGroup.dropBackground"
              | "editorGroup.dropIntoPromptForeground"
              | "editorGroup.dropIntoPromptBackground"
              | "editorGroup.dropIntoPromptBorder"
              | "sideBySideEditor.horizontalBorder"
              | "sideBySideEditor.verticalBorder"
              | "panel.background"
              | "panel.border"
              | "panelTitle.activeForeground"
              | "panelTitle.inactiveForeground"
              | "panelTitle.activeBorder"
              | "panelInput.border"
              | "panel.dropBorder"
              | "panelSection.dropBackground"
              | "panelSectionHeader.background"
              | "panelSectionHeader.foreground"
              | "panelSectionHeader.border"
              | "panelSection.border"
              | "banner.background"
              | "banner.foreground"
              | "banner.iconForeground"
              | "statusBar.foreground"
              | "statusBar.noFolderForeground"
              | "statusBar.background"
              | "statusBar.noFolderBackground"
              | "statusBar.border"
              | "statusBar.focusBorder"
              | "statusBar.noFolderBorder"
              | "statusBarItem.activeBackground"
              | "statusBarItem.focusBorder"
              | "statusBarItem.hoverBackground"
              | "statusBarItem.compactHoverBackground"
              | "statusBarItem.prominentForeground"
              | "statusBarItem.prominentBackground"
              | "statusBarItem.prominentHoverBackground"
              | "statusBarItem.errorBackground"
              | "statusBarItem.errorForeground"
              | "statusBarItem.warningBackground"
              | "statusBarItem.warningForeground"
              | "activityBar.background"
              | "activityBar.foreground"
              | "activityBar.inactiveForeground"
              | "activityBar.border"
              | "activityBar.activeBorder"
              | "activityBar.activeFocusBorder"
              | "activityBar.activeBackground"
              | "activityBar.dropBorder"
              | "activityBarBadge.background"
              | "activityBarBadge.foreground"
              | "statusBarItem.remoteBackground"
              | "statusBarItem.remoteForeground"
              | "extensionBadge.remoteBackground"
              | "extensionBadge.remoteForeground"
              | "sideBar.background"
              | "sideBar.foreground"
              | "sideBar.border"
              | "sideBarTitle.foreground"
              | "sideBar.dropBackground"
              | "sideBarSectionHeader.background"
              | "sideBarSectionHeader.foreground"
              | "sideBarSectionHeader.border"
              | "titleBar.activeForeground"
              | "titleBar.inactiveForeground"
              | "titleBar.activeBackground"
              | "titleBar.inactiveBackground"
              | "titleBar.border"
              | "menubar.selectionForeground"
              | "menubar.selectionBackground"
              | "menubar.selectionBorder"
              | "notificationCenter.border"
              | "notificationToast.border"
              | "notifications.foreground"
              | "notifications.background"
              | "notificationLink.foreground"
              | "notificationCenterHeader.foreground"
              | "notificationCenterHeader.background"
              | "notifications.border"
              | "notificationsErrorIcon.foreground"
              | "notificationsWarningIcon.foreground"
              | "notificationsInfoIcon.foreground"
              | "window.activeBorder"
              | "window.inactiveBorder"
              | "commandCenter.foreground"
              | "commandCenter.activeForeground"
              | "commandCenter.background"
              | "commandCenter.activeBackground"
              | "commandCenter.border"
              | "editorCommentsWidget.resolvedBorder"
              | "editorCommentsWidget.unresolvedBorder"
              | "editorCommentsWidget.rangeBackground"
              | "editorCommentsWidget.rangeBorder"
              | "editorCommentsWidget.rangeActiveBackground"
              | "editorCommentsWidget.rangeActiveBorder"
              | "editorGutter.commentRangeForeground"
              | "debugToolBar.background"
              | "debugToolBar.border"
              | "debugIcon.startForeground"
              | "editor.stackFrameHighlightBackground"
              | "editor.focusedStackFrameHighlightBackground"
              | "mergeEditor.change.background"
              | "mergeEditor.change.word.background"
              | "mergeEditor.conflict.unhandledUnfocused.border"
              | "mergeEditor.conflict.unhandledFocused.border"
              | "mergeEditor.conflict.handledUnfocused.border"
              | "mergeEditor.conflict.handledFocused.border"
              | "mergeEditor.conflict.handled.minimapOverViewRuler"
              | "mergeEditor.conflict.unhandled.minimapOverViewRuler"
              | "settings.headerForeground"
              | "settings.modifiedItemIndicator"
              | "settings.headerBorder"
              | "settings.sashBorder"
              | "settings.dropdownBackground"
              | "settings.dropdownForeground"
              | "settings.dropdownBorder"
              | "settings.dropdownListBorder"
              | "settings.checkboxBackground"
              | "settings.checkboxForeground"
              | "settings.checkboxBorder"
              | "settings.textInputBackground"
              | "settings.textInputForeground"
              | "settings.textInputBorder"
              | "settings.numberInputBackground"
              | "settings.numberInputForeground"
              | "settings.numberInputBorder"
              | "settings.focusedRowBackground"
              | "settings.rowHoverBackground"
              | "settings.focusedRowBorder"
              | "terminal.background"
              | "terminal.foreground"
              | "terminalCursor.foreground"
              | "terminalCursor.background"
              | "terminal.selectionBackground"
              | "terminal.selectionForeground"
              | "terminalCommandDecoration.defaultBackground"
              | "terminalCommandDecoration.successBackground"
              | "terminalCommandDecoration.errorBackground"
              | "terminalOverviewRuler.cursorForeground"
              | "terminal.border"
              | "terminal.findMatchBackground"
              | "terminal.findMatchBorder"
              | "terminal.findMatchHighlightBackground"
              | "terminal.findMatchHighlightBorder"
              | "terminalOverviewRuler.findMatchForeground"
              | "terminal.dropBackground"
              | "terminal.tab.activeBorder"
              | "testing.iconFailed"
              | "testing.iconErrored"
              | "testing.iconPassed"
              | "testing.runAction"
              | "testing.iconQueued"
              | "testing.iconUnset"
              | "testing.iconSkipped"
              | "testing.peekBorder"
              | "testing.peekHeaderBackground"
              | "testing.message.error.decorationForeground"
              | "testing.message.error.lineBackground"
              | "testing.message.info.decorationForeground"
              | "testing.message.info.lineBackground"
              | "welcomePage.background"
              | "welcomePage.tileBackground"
              | "welcomePage.tileHoverBackground"
              | "welcomePage.tileShadow"
              | "welcomePage.progress.background"
              | "welcomePage.progress.foreground"
              | "walkThrough.embeddedEditorBackground"
              | "debugExceptionWidget.border"
              | "debugExceptionWidget.background"
              | "ports.iconRunningProcessForeground"
              | "statusBar.debuggingBackground"
              | "statusBar.debuggingForeground"
              | "statusBar.debuggingBorder"
              | "editor.inlineValuesForeground"
              | "editor.inlineValuesBackground"
              | "editorGutter.modifiedBackground"
              | "editorGutter.addedBackground"
              | "editorGutter.deletedBackground"
              | "minimapGutter.modifiedBackground"
              | "minimapGutter.addedBackground"
              | "minimapGutter.deletedBackground"
              | "editorOverviewRuler.modifiedForeground"
              | "editorOverviewRuler.addedForeground"
              | "editorOverviewRuler.deletedForeground"
              | "debugIcon.breakpointForeground"
              | "debugIcon.breakpointDisabledForeground"
              | "debugIcon.breakpointUnverifiedForeground"
              | "debugIcon.breakpointCurrentStackframeForeground"
              | "debugIcon.breakpointStackframeForeground"
              | "notebook.cellBorderColor"
              | "notebook.focusedEditorBorder"
              | "notebookStatusSuccessIcon.foreground"
              | "notebookStatusErrorIcon.foreground"
              | "notebookStatusRunningIcon.foreground"
              | "notebook.outputContainerBorderColor"
              | "notebook.outputContainerBackgroundColor"
              | "notebook.cellToolbarSeparator"
              | "notebook.focusedCellBackground"
              | "notebook.selectedCellBackground"
              | "notebook.cellHoverBackground"
              | "notebook.selectedCellBorder"
              | "notebook.inactiveSelectedCellBorder"
              | "notebook.focusedCellBorder"
              | "notebook.inactiveFocusedCellBorder"
              | "notebook.cellStatusBarItemHoverBackground"
              | "notebook.cellInsertionIndicator"
              | "notebookScrollbarSlider.background"
              | "notebookScrollbarSlider.hoverBackground"
              | "notebookScrollbarSlider.activeBackground"
              | "notebook.symbolHighlightBackground"
              | "notebook.cellEditorBackground"
              | "notebook.editorBackground"
              | "statusBarItem.settingsProfilesForeground"
              | "statusBarItem.settingsProfilesBackground"
              | "keybindingTable.headerBackground"
              | "keybindingTable.rowsBackground"
              | "scm.providerBorder"
              | "searchEditor.textInputBorder"
              | "debugTokenExpression.name"
              | "debugTokenExpression.value"
              | "debugTokenExpression.string"
              | "debugTokenExpression.boolean"
              | "debugTokenExpression.number"
              | "debugTokenExpression.error"
              | "debugView.exceptionLabelForeground"
              | "debugView.exceptionLabelBackground"
              | "debugView.stateLabelForeground"
              | "debugView.stateLabelBackground"
              | "debugView.valueChangedHighlight"
              | "debugConsole.infoForeground"
              | "debugConsole.warningForeground"
              | "debugConsole.errorForeground"
              | "debugConsole.sourceForeground"
              | "debugConsoleInputIcon.foreground"
              | "debugIcon.pauseForeground"
              | "debugIcon.stopForeground"
              | "debugIcon.disconnectForeground"
              | "debugIcon.restartForeground"
              | "debugIcon.stepOverForeground"
              | "debugIcon.stepIntoForeground"
              | "debugIcon.stepOutForeground"
              | "debugIcon.continueForeground"
              | "debugIcon.stepBackForeground"
              | "extensionButton.prominentBackground"
              | "extensionButton.prominentForeground"
              | "extensionButton.prominentHoverBackground"
              | "extensionIcon.starForeground"
              | "extensionIcon.verifiedForeground"
              | "extensionIcon.preReleaseForeground"
              | "extensionIcon.sponsorForeground"
              | "terminal.ansiBlack"
              | "terminal.ansiRed"
              | "terminal.ansiGreen"
              | "terminal.ansiYellow"
              | "terminal.ansiBlue"
              | "terminal.ansiMagenta"
              | "terminal.ansiCyan"
              | "terminal.ansiWhite"
              | "terminal.ansiBrightBlack"
              | "terminal.ansiBrightRed"
              | "terminal.ansiBrightGreen"
              | "terminal.ansiBrightYellow"
              | "terminal.ansiBrightBlue"
              | "terminal.ansiBrightMagenta"
              | "terminal.ansiBrightCyan"
              | "terminal.ansiBrightWhite"
              | "interactive.activeCodeBorder"
              | "interactive.inactiveCodeBorder"
              | "interactive.activeCodeBorder"
              | "interactive.inactiveCodeBorder"
              | "gitDecoration.addedResourceForeground"
              | "gitDecoration.modifiedResourceForeground"
              | "gitDecoration.deletedResourceForeground"
              | "gitDecoration.renamedResourceForeground"
              | "gitDecoration.untrackedResourceForeground"
              | "gitDecoration.ignoredResourceForeground"
              | "gitDecoration.stageModifiedResourceForeground"
              | "gitDecoration.stageDeletedResourceForeground"
              | "gitDecoration.conflictingResourceForeground"
              | "gitDecoration.submoduleResourceForeground"
              | "interactive.activeCodeBorder"
              | "interactive.inactiveCodeBorder"
            )
          | string;
      };
    }[];
    /*
     * Contributes extension defined themable icons
     */
    icons?: {
      [key: string]: {
        /*
         * The description of the themable icon
         */
        description: string;
        /*
         * The default of the icon. Either a reference to an extisting ThemeIcon or an icon in an icon font.
         */
        ["default"]:
          | (
              | "add"
              | "plus"
              | "gist-new"
              | "repo-create"
              | "lightbulb"
              | "light-bulb"
              | "repo"
              | "repo-delete"
              | "gist-fork"
              | "repo-forked"
              | "git-pull-request"
              | "git-pull-request-abandoned"
              | "record-keys"
              | "keyboard"
              | "tag"
              | "tag-add"
              | "tag-remove"
              | "person"
              | "person-follow"
              | "person-outline"
              | "person-filled"
              | "git-branch"
              | "git-branch-create"
              | "git-branch-delete"
              | "source-control"
              | "mirror"
              | "mirror-public"
              | "star"
              | "star-add"
              | "star-delete"
              | "star-empty"
              | "comment"
              | "comment-add"
              | "alert"
              | "warning"
              | "search"
              | "search-save"
              | "log-out"
              | "sign-out"
              | "log-in"
              | "sign-in"
              | "eye"
              | "eye-unwatch"
              | "eye-watch"
              | "circle-filled"
              | "primitive-dot"
              | "close-dirty"
              | "debug-breakpoint"
              | "debug-breakpoint-disabled"
              | "debug-hint"
              | "primitive-square"
              | "edit"
              | "pencil"
              | "info"
              | "issue-opened"
              | "gist-private"
              | "git-fork-private"
              | "lock"
              | "mirror-private"
              | "close"
              | "remove-close"
              | "x"
              | "repo-sync"
              | "sync"
              | "clone"
              | "desktop-download"
              | "beaker"
              | "microscope"
              | "vm"
              | "device-desktop"
              | "file"
              | "file-text"
              | "more"
              | "ellipsis"
              | "kebab-horizontal"
              | "mail-reply"
              | "reply"
              | "organization"
              | "organization-filled"
              | "organization-outline"
              | "new-file"
              | "file-add"
              | "new-folder"
              | "file-directory-create"
              | "trash"
              | "trashcan"
              | "history"
              | "clock"
              | "folder"
              | "file-directory"
              | "symbol-folder"
              | "logo-github"
              | "mark-github"
              | "github"
              | "terminal"
              | "console"
              | "repl"
              | "zap"
              | "symbol-event"
              | "error"
              | "stop"
              | "variable"
              | "symbol-variable"
              | "array"
              | "symbol-array"
              | "symbol-module"
              | "symbol-package"
              | "symbol-namespace"
              | "symbol-object"
              | "symbol-method"
              | "symbol-function"
              | "symbol-constructor"
              | "symbol-boolean"
              | "symbol-null"
              | "symbol-numeric"
              | "symbol-number"
              | "symbol-structure"
              | "symbol-struct"
              | "symbol-parameter"
              | "symbol-type-parameter"
              | "symbol-key"
              | "symbol-text"
              | "symbol-reference"
              | "go-to-file"
              | "symbol-enum"
              | "symbol-value"
              | "symbol-ruler"
              | "symbol-unit"
              | "activate-breakpoints"
              | "archive"
              | "arrow-both"
              | "arrow-down"
              | "arrow-left"
              | "arrow-right"
              | "arrow-small-down"
              | "arrow-small-left"
              | "arrow-small-right"
              | "arrow-small-up"
              | "arrow-up"
              | "bell"
              | "bold"
              | "book"
              | "bookmark"
              | "debug-breakpoint-conditional-unverified"
              | "debug-breakpoint-conditional"
              | "debug-breakpoint-conditional-disabled"
              | "debug-breakpoint-data-unverified"
              | "debug-breakpoint-data"
              | "debug-breakpoint-data-disabled"
              | "debug-breakpoint-log-unverified"
              | "debug-breakpoint-log"
              | "debug-breakpoint-log-disabled"
              | "briefcase"
              | "broadcast"
              | "browser"
              | "bug"
              | "calendar"
              | "case-sensitive"
              | "check"
              | "checklist"
              | "chevron-down"
              | "drop-down-button"
              | "chevron-left"
              | "chevron-right"
              | "chevron-up"
              | "chrome-close"
              | "chrome-maximize"
              | "chrome-minimize"
              | "chrome-restore"
              | "circle-outline"
              | "debug-breakpoint-unverified"
              | "circle-slash"
              | "circuit-board"
              | "clear-all"
              | "clippy"
              | "close-all"
              | "cloud-download"
              | "cloud-upload"
              | "code"
              | "collapse-all"
              | "color-mode"
              | "comment-discussion"
              | "compare-changes"
              | "credit-card"
              | "dash"
              | "dashboard"
              | "database"
              | "debug-continue"
              | "debug-disconnect"
              | "debug-pause"
              | "debug-restart"
              | "debug-start"
              | "debug-step-into"
              | "debug-step-out"
              | "debug-step-over"
              | "debug-stop"
              | "debug"
              | "device-camera-video"
              | "device-camera"
              | "device-mobile"
              | "diff-added"
              | "diff-ignored"
              | "diff-modified"
              | "diff-removed"
              | "diff-renamed"
              | "diff"
              | "discard"
              | "editor-layout"
              | "empty-window"
              | "exclude"
              | "extensions"
              | "eye-closed"
              | "file-binary"
              | "file-code"
              | "file-media"
              | "file-pdf"
              | "file-submodule"
              | "file-symlink-directory"
              | "file-symlink-file"
              | "file-zip"
              | "files"
              | "filter"
              | "flame"
              | "fold-down"
              | "fold-up"
              | "fold"
              | "folder-active"
              | "folder-opened"
              | "gear"
              | "gift"
              | "gist-secret"
              | "gist"
              | "git-commit"
              | "git-compare"
              | "git-merge"
              | "github-action"
              | "github-alt"
              | "globe"
              | "grabber"
              | "graph"
              | "gripper"
              | "heart"
              | "home"
              | "horizontal-rule"
              | "hubot"
              | "inbox"
              | "issue-closed"
              | "issue-reopened"
              | "issues"
              | "italic"
              | "jersey"
              | "json"
              | "kebab-vertical"
              | "key"
              | "law"
              | "lightbulb-autofix"
              | "link-external"
              | "link"
              | "list-ordered"
              | "list-unordered"
              | "live-share"
              | "loading"
              | "location"
              | "mail-read"
              | "mail"
              | "markdown"
              | "megaphone"
              | "mention"
              | "milestone"
              | "mortar-board"
              | "move"
              | "multiple-windows"
              | "mute"
              | "no-newline"
              | "note"
              | "octoface"
              | "open-preview"
              | "package"
              | "paintcan"
              | "pin"
              | "play"
              | "run"
              | "plug"
              | "preserve-case"
              | "preview"
              | "project"
              | "pulse"
              | "question"
              | "quote"
              | "radio-tower"
              | "reactions"
              | "references"
              | "refresh"
              | "regex"
              | "remote-explorer"
              | "remote"
              | "remove"
              | "replace-all"
              | "replace"
              | "repo-clone"
              | "repo-force-push"
              | "repo-pull"
              | "repo-push"
              | "report"
              | "request-changes"
              | "rocket"
              | "root-folder-opened"
              | "root-folder"
              | "rss"
              | "ruby"
              | "save-all"
              | "save-as"
              | "save"
              | "screen-full"
              | "screen-normal"
              | "search-stop"
              | "server"
              | "settings-gear"
              | "settings"
              | "shield"
              | "smiley"
              | "sort-precedence"
              | "split-horizontal"
              | "split-vertical"
              | "squirrel"
              | "star-full"
              | "star-half"
              | "symbol-class"
              | "symbol-color"
              | "symbol-customcolor"
              | "symbol-constant"
              | "symbol-enum-member"
              | "symbol-field"
              | "symbol-file"
              | "symbol-interface"
              | "symbol-keyword"
              | "symbol-misc"
              | "symbol-operator"
              | "symbol-property"
              | "wrench"
              | "wrench-subaction"
              | "symbol-snippet"
              | "tasklist"
              | "telescope"
              | "text-size"
              | "three-bars"
              | "thumbsdown"
              | "thumbsup"
              | "tools"
              | "triangle-down"
              | "triangle-left"
              | "triangle-right"
              | "triangle-up"
              | "twitter"
              | "unfold"
              | "unlock"
              | "unmute"
              | "unverified"
              | "verified"
              | "versions"
              | "vm-active"
              | "vm-outline"
              | "vm-running"
              | "watch"
              | "whitespace"
              | "whole-word"
              | "window"
              | "word-wrap"
              | "zoom-in"
              | "zoom-out"
              | "list-filter"
              | "list-flat"
              | "list-selection"
              | "selection"
              | "list-tree"
              | "debug-breakpoint-function-unverified"
              | "debug-breakpoint-function"
              | "debug-breakpoint-function-disabled"
              | "debug-stackframe-active"
              | "circle-small-filled"
              | "debug-stackframe-dot"
              | "debug-stackframe"
              | "debug-stackframe-focused"
              | "debug-breakpoint-unsupported"
              | "symbol-string"
              | "debug-reverse-continue"
              | "debug-step-back"
              | "debug-restart-frame"
              | "call-incoming"
              | "call-outgoing"
              | "menu"
              | "expand-all"
              | "feedback"
              | "group-by-ref-type"
              | "ungroup-by-ref-type"
              | "account"
              | "bell-dot"
              | "debug-console"
              | "library"
              | "output"
              | "run-all"
              | "sync-ignored"
              | "pinned"
              | "github-inverted"
              | "debug-alt"
              | "server-process"
              | "server-environment"
              | "pass"
              | "stop-circle"
              | "play-circle"
              | "record"
              | "debug-alt-small"
              | "vm-connect"
              | "cloud"
              | "merge"
              | "export"
              | "graph-left"
              | "magnet"
              | "notebook"
              | "redo"
              | "check-all"
              | "pinned-dirty"
              | "pass-filled"
              | "circle-large-filled"
              | "circle-large-outline"
              | "combine"
              | "gather"
              | "table"
              | "variable-group"
              | "type-hierarchy"
              | "type-hierarchy-sub"
              | "type-hierarchy-super"
              | "git-pull-request-create"
              | "run-above"
              | "run-below"
              | "notebook-template"
              | "debug-rerun"
              | "workspace-trusted"
              | "workspace-untrusted"
              | "workspace-unspecified"
              | "terminal-cmd"
              | "terminal-debian"
              | "terminal-linux"
              | "terminal-powershell"
              | "terminal-tmux"
              | "terminal-ubuntu"
              | "terminal-bash"
              | "arrow-swap"
              | "copy"
              | "person-add"
              | "filter-filled"
              | "wand"
              | "debug-line-by-line"
              | "inspect"
              | "layers"
              | "layers-dot"
              | "layers-active"
              | "compass"
              | "compass-dot"
              | "compass-active"
              | "azure"
              | "issue-draft"
              | "git-pull-request-closed"
              | "git-pull-request-draft"
              | "debug-all"
              | "debug-coverage"
              | "run-errors"
              | "folder-library"
              | "debug-continue-small"
              | "beaker-stop"
              | "graph-line"
              | "graph-scatter"
              | "pie-chart"
              | "bracket"
              | "bracket-dot"
              | "bracket-error"
              | "lock-small"
              | "azure-devops"
              | "verified-filled"
              | "newline"
              | "layout"
              | "layout-activitybar-left"
              | "layout-activitybar-right"
              | "layout-panel-left"
              | "layout-panel-center"
              | "layout-panel-justify"
              | "layout-panel-right"
              | "layout-panel"
              | "layout-sidebar-left"
              | "layout-sidebar-right"
              | "layout-statusbar"
              | "layout-menubar"
              | "layout-centered"
              | "layout-sidebar-right-off"
              | "layout-panel-off"
              | "layout-sidebar-left-off"
              | "target"
              | "indent"
              | "record-small"
              | "error-small"
              | "arrow-circle-down"
              | "arrow-circle-left"
              | "arrow-circle-right"
              | "arrow-circle-up"
              | "heart-filled"
              | "map"
              | "map-filled"
              | "circle-small"
              | "bell-slash"
              | "bell-slash-dot"
              | "dialog-error"
              | "dialog-warning"
              | "dialog-info"
              | "dialog-close"
              | "tree-item-expanded"
              | "tree-filter-on-type-on"
              | "tree-filter-on-type-off"
              | "tree-filter-clear"
              | "tree-item-loading"
              | "menu-selection"
              | "menu-submenu"
              | "menubar-more"
              | "scrollbar-button-left"
              | "scrollbar-button-right"
              | "scrollbar-button-up"
              | "scrollbar-button-down"
              | "toolbar-more"
              | "quick-input-back"
              | "widget-close"
              | "goto-previous-location"
              | "goto-next-location"
              | "diff-review-insert"
              | "diff-review-remove"
              | "diff-review-close"
              | "parameter-hints-next"
              | "parameter-hints-previous"
              | "suggest-more-info"
              | "diff-insert"
              | "diff-remove"
              | "find-selection"
              | "find-collapsed"
              | "find-expanded"
              | "find-replace"
              | "find-replace-all"
              | "find-previous-match"
              | "find-next-match"
              | "folding-expanded"
              | "folding-collapsed"
              | "marker-navigation-next"
              | "marker-navigation-previous"
              | "extensions-warning-message"
              | "notifications-clear"
              | "notifications-clear-all"
              | "notifications-hide"
              | "notifications-expand"
              | "notifications-collapse"
              | "notifications-configure"
              | "notifications-do-not-disturb"
              | "default-view-icon"
              | "review-comment-collapse"
              | "debug-console-view-icon"
              | "run-view-icon"
              | "variables-view-icon"
              | "watch-view-icon"
              | "callstack-view-icon"
              | "breakpoints-view-icon"
              | "loaded-scripts-view-icon"
              | "debug-gripper"
              | "debug-run"
              | "debug-configure"
              | "debug-remove-config"
              | "debug-collapse-all"
              | "callstack-view-session"
              | "debug-console-clear-all"
              | "watch-expressions-remove-all"
              | "watch-expression-remove"
              | "watch-expressions-add"
              | "watch-expressions-add-function-breakpoint"
              | "breakpoints-remove-all"
              | "breakpoints-activate"
              | "debug-console-evaluation-input"
              | "debug-console-evaluation-prompt"
              | "debug-inspect-memory"
              | "extensions-view-icon"
              | "extensions-manage"
              | "extensions-clear-search-results"
              | "extensions-refresh"
              | "extensions-filter"
              | "extensions-install-local-in-remote"
              | "extensions-install-workspace-recommended"
              | "extensions-configure-recommended"
              | "extensions-sync-enabled"
              | "extensions-sync-ignored"
              | "extensions-remote"
              | "extensions-install-count"
              | "extensions-rating"
              | "extensions-verified-publisher"
              | "extensions-pre-release"
              | "extensions-sponsor"
              | "extensions-star-full"
              | "extensions-star-half"
              | "extensions-star-empty"
              | "extensions-error-message"
              | "extensions-info-message"
              | "extension-workspace-trust"
              | "extension-activation-time"
              | "localHistory-icon"
              | "localHistory-restore"
              | "markers-view-filter"
              | "find-filter"
              | "notebook-kernel-configure"
              | "notebook-kernel-select"
              | "notebook-execute"
              | "notebook-execute-above"
              | "notebook-execute-below"
              | "notebook-stop"
              | "notebook-delete-cell"
              | "notebook-execute-all"
              | "notebook-edit"
              | "notebook-stop-edit"
              | "notebook-move-up"
              | "notebook-move-down"
              | "notebook-clear"
              | "notebook-split-cell"
              | "notebook-unfold"
              | "notebook-state-success"
              | "notebook-state-error"
              | "notebook-state-pending"
              | "notebook-state-executing"
              | "notebook-collapsed"
              | "notebook-expanded"
              | "notebook-open-as-text"
              | "notebook-revert"
              | "notebook-render-output"
              | "notebook-mimetype"
              | "settings-group-expanded"
              | "settings-group-collapsed"
              | "settings-folder-dropdown"
              | "settings-more-action"
              | "keybindings-record-keys"
              | "keybindings-sort"
              | "keybindings-edit"
              | "keybindings-add"
              | "settings-edit"
              | "settings-add"
              | "settings-remove"
              | "settings-discard"
              | "preferences-clear-input"
              | "preferences-filter"
              | "preferences-open-settings"
              | "remote-explorer-get-started"
              | "remote-explorer-documentation"
              | "remote-explorer-feedback"
              | "remote-explorer-review-issues"
              | "remote-explorer-report-issues"
              | "remote-explorer-view-icon"
              | "ports-view-icon"
              | "private-ports-view-icon"
              | "ports-forward-icon"
              | "ports-stop-forward-icon"
              | "ports-open-browser-icon"
              | "ports-open-preview-icon"
              | "ports-copy-address-icon"
              | "ports-label-icon"
              | "ports-forwarded-without-process-icon"
              | "ports-forwarded-with-process-icon"
              | "search-details"
              | "search-show-context"
              | "search-hide-replace"
              | "search-show-replace"
              | "search-replace-all"
              | "search-replace"
              | "search-remove"
              | "search-refresh"
              | "search-collapse-results"
              | "search-expand-results"
              | "search-clear-results"
              | "search-view-icon"
              | "search-new-editor"
              | "terminal-view-icon"
              | "terminal-rename"
              | "terminal-kill"
              | "terminal-new"
              | "terminal-configure-profile"
              | "test-view-icon"
              | "testing-run-icon"
              | "testing-run-all-icon"
              | "testing-debug-all-icon"
              | "testing-debug-icon"
              | "testing-cancel-icon"
              | "testing-filter"
              | "testing-hidden"
              | "testing-show-as-list-icon"
              | "testing-update-profiles"
              | "testing-refresh-tests"
              | "testing-cancel-refresh-tests"
              | "testing-error-icon"
              | "testing-failed-icon"
              | "testing-passed-icon"
              | "testing-queued-icon"
              | "testing-skipped-icon"
              | "testing-unset-icon"
              | "getting-started-step-unchecked"
              | "getting-started-step-checked"
              | "getting-started-setup"
              | "getting-started-beginner"
              | "getting-started-intermediate"
              | "callhierarchy-incoming"
              | "callhierarchy-outgoing"
              | "markers-view-multi-line-expanded"
              | "markers-view-multi-line-collapsed"
              | "tasks-list-configure"
              | "tasks-remove"
              | "auxiliarybar-right-layout-icon"
              | "auxiliarybar-right-off-layout-icon"
              | "auxiliarybar-left-layout-icon"
              | "auxiliarybar-left-off-layout-icon"
              | "view-pane-container-expanded"
              | "view-pane-container-collapsed"
              | "breadcrumb-separator"
              | "theme-selection-manage-extension"
              | "settings-sync-view-icon"
              | "timeline-refresh"
              | "timeline-pin"
              | "timeline-unpin"
              | "diff-editor-previous-change"
              | "diff-editor-next-change"
              | "diff-editor-toggle-whitespace"
              | "panel-maximize"
              | "panel-restore"
              | "panel-close"
              | "panel-layout-icon"
              | "panel-layout-icon-off"
              | "menuBar"
              | "activity-bar-left"
              | "activity-bar-right"
              | "panel-left"
              | "panel-left-off"
              | "panel-right"
              | "panel-right-off"
              | "panel-bottom"
              | "statusBar"
              | "panel-align-left"
              | "panel-align-right"
              | "panel-align-center"
              | "panel-align-justify"
              | "fullscreen"
              | "centerLayoutIcon"
              | "zenMode"
              | "configure-layout-icon"
              | "settings-view-bar-icon"
              | "accounts-view-bar-icon"
              | "comments-view-icon"
              | "refactor-preview-view-icon"
              | "explorer-view-icon"
              | "open-editors-view-icon"
              | "markers-view-icon"
              | "outline-view-icon"
              | "output-view-icon"
              | "source-control-view-icon"
              | "timeline-view-icon"
              | "timeline-open"
              | "timeline-filter"
              | "workspace-trust-banner"
              | "workspace-trust-editor-check"
              | "workspace-trust-editor-cross"
              | "workspace-trust-editor-folder-picker"
              | "workspace-trust-editor-edit-folder"
              | "workspace-trust-editor-remove-folder"
            )
          | {
              /*
               * The path of the icon font that defines the icon.
               */
              fontPath: string;
              /*
               * The character for the icon in the icon font.
               */
              fontCharacter: string;
            };
      };
    };
    /*
     * Contributes semantic token types.
     */
    semanticTokenTypes?: {
      /*
       * The identifier of the semantic token type
       *
       * @pattern ^\w+[-_\w+]*$
       */
      id?: string;
      /*
       * The super type of the semantic token type
       *
       * @pattern ^\w+[-_\w+]*$
       */
      superType?: string;
      /*
       * The description of the semantic token type
       */
      description?: string;
    }[];
    /*
     * Contributes semantic token modifiers.
     */
    semanticTokenModifiers?: {
      /*
       * The identifier of the semantic token modifier
       *
       * @pattern ^\w+[-_\w+]*$
       */
      id?: string;
      /*
       * The description of the semantic token modifier
       */
      description?: void;
    }[];
    /*
     * Contributes semantic token scope maps.
     */
    semanticTokenScopes?: {
      /*
       * Lists the languge for which the defaults are.
       */
      language?: string;
      /*
       * Maps a semantic token (described by semantic token selector) to one or more textMate scopes used to represent that token.
       */
      scopes?: {
        [key: string]: string[];
      };
    }[];
    /*
     * Contributes snippets.
     */
    snippets?: {
      /*
       * Language identifier for which this snippet is contributed to.
       */
      language?: string;
      /*
       * Path of the snippets file. The path is relative to the extension folder and typically starts with './snippets/'.
       */
      path?: string;
    }[];
    /*
     * Contributes keybindings.
     */
    keybindings?:
      | {
          /*
           * Identifier of the command to run when keybinding is triggered.
           */
          command?: string;
          /*
           * Arguments to pass to the command to execute.
           */
          args?: void;
          /*
           * Key or key sequence (separate keys with plus-sign and sequences with space, e.g. Ctrl+O and Ctrl+L L for a chord).
           */
          key?: string;
          /*
           * Mac specific key or key sequence.
           */
          mac?: string;
          /*
           * Linux specific key or key sequence.
           */
          linux?: string;
          /*
           * Windows specific key or key sequence.
           */
          win?: string;
          /*
           * Condition when the key is active.
           */
          when?: string;
        }
      | {
          /*
           * Identifier of the command to run when keybinding is triggered.
           */
          command?: string;
          /*
           * Arguments to pass to the command to execute.
           */
          args?: void;
          /*
           * Key or key sequence (separate keys with plus-sign and sequences with space, e.g. Ctrl+O and Ctrl+L L for a chord).
           */
          key?: string;
          /*
           * Mac specific key or key sequence.
           */
          mac?: string;
          /*
           * Linux specific key or key sequence.
           */
          linux?: string;
          /*
           * Windows specific key or key sequence.
           */
          win?: string;
          /*
           * Condition when the key is active.
           */
          when?: string;
        }[];
    /*
     * Contributes textmate color themes.
     */
    themes?: {
      /*
       * Id of the color theme as used in the user settings.
       */
      id?: string;
      /*
       * Label of the color theme as shown in the UI.
       */
      label?: string;
      /*
       * Base theme defining the colors around the editor: 'vs' is the light color theme, 'vs-dark' is the dark color theme. 'hc-black' is the dark high contrast theme, 'hc-light' is the light high contrast theme.
       */
      uiTheme: "vs" | "vs-dark" | "hc-black" | "hc-light";
      /*
       * Path of the tmTheme file. The path is relative to the extension folder and is typically './colorthemes/awesome-color-theme.json'.
       */
      path: string;
    }[];
    /*
     * Contributes file icon themes.
     */
    iconThemes?: {
      /*
       * Id of the file icon theme as used in the user settings.
       */
      id: string;
      /*
       * Label of the file icon theme as shown in the UI.
       */
      label?: string;
      /*
       * Path of the file icon theme definition file. The path is relative to the extension folder and is typically './fileicons/awesome-icon-theme.json'.
       */
      path: string;
    }[];
    /*
     * Contributes product icon themes.
     */
    productIconThemes?: {
      /*
       * Id of the product icon theme as used in the user settings.
       */
      id: string;
      /*
       * Label of the product icon theme as shown in the UI.
       */
      label?: string;
      /*
       * Path of the product icon theme definition file. The path is relative to the extension folder and is typically './producticons/awesome-product-icon-theme.json'.
       */
      path: string;
    }[];
    /*
     * Contributes views containers to the editor
     */
    viewsContainers?: {
      /*
       * Contribute views containers to Activity Bar
       */
      activitybar?: {
        /*
         * Unique id used to identify the container in which views can be contributed using 'views' contribution point
         *
         * @pattern ^[a-zA-Z0-9_-]+$
         */
        id: string;
        /*
         * Human readable string used to render the container
         */
        title: string;
        /*
         * Path to the container icon. Icons are 24x24 centered on a 50x40 block and have a fill color of 'rgb(215, 218, 224)' or '#d7dae0'. It is recommended that icons be in SVG, though any image file type is accepted.
         */
        icon: string;
      }[];
      /*
       * Contribute views containers to Panel
       */
      panel?: {
        /*
         * Unique id used to identify the container in which views can be contributed using 'views' contribution point
         *
         * @pattern ^[a-zA-Z0-9_-]+$
         */
        id: string;
        /*
         * Human readable string used to render the container
         */
        title: string;
        /*
         * Path to the container icon. Icons are 24x24 centered on a 50x40 block and have a fill color of 'rgb(215, 218, 224)' or '#d7dae0'. It is recommended that icons be in SVG, though any image file type is accepted.
         */
        icon: string;
      }[];
    };
    /*
     * Contributes views to the editor
     */
    views?: {
      /*
       * Contributes views to Explorer container in the Activity bar
       */
      explorer?: {
        type?: "tree" | "webview";
        id: string;
        /*
         * The human-readable name of the view. Will be shown
         */
        name: string;
        /*
         * Condition which must be true to show this view
         */
        when?: string;
        /*
         * Path to the view icon. View icons are displayed when the name of the view cannot be shown. It is recommended that icons be in SVG, though any image file type is accepted.
         */
        icon?: string;
        /*
         * Human-readable context for when the view is moved out of its original location. By default, the view's container name will be used.
         */
        contextualTitle?: string;
        /*
         * Initial state of the view when the extension is first installed. Once the user has changed the view state by collapsing, moving, or hiding the view, the initial state will not be used again.
         *
         * @default visible
         */
        visibility?: "visible" | "hidden" | "collapsed";
      }[];
      /*
       * Contributes views to Debug container in the Activity bar
       */
      debug?: {
        type?: "tree" | "webview";
        id: string;
        /*
         * The human-readable name of the view. Will be shown
         */
        name: string;
        /*
         * Condition which must be true to show this view
         */
        when?: string;
        /*
         * Path to the view icon. View icons are displayed when the name of the view cannot be shown. It is recommended that icons be in SVG, though any image file type is accepted.
         */
        icon?: string;
        /*
         * Human-readable context for when the view is moved out of its original location. By default, the view's container name will be used.
         */
        contextualTitle?: string;
        /*
         * Initial state of the view when the extension is first installed. Once the user has changed the view state by collapsing, moving, or hiding the view, the initial state will not be used again.
         *
         * @default visible
         */
        visibility?: "visible" | "hidden" | "collapsed";
      }[];
      /*
       * Contributes views to SCM container in the Activity bar
       */
      scm?: {
        type?: "tree" | "webview";
        id: string;
        /*
         * The human-readable name of the view. Will be shown
         */
        name: string;
        /*
         * Condition which must be true to show this view
         */
        when?: string;
        /*
         * Path to the view icon. View icons are displayed when the name of the view cannot be shown. It is recommended that icons be in SVG, though any image file type is accepted.
         */
        icon?: string;
        /*
         * Human-readable context for when the view is moved out of its original location. By default, the view's container name will be used.
         */
        contextualTitle?: string;
        /*
         * Initial state of the view when the extension is first installed. Once the user has changed the view state by collapsing, moving, or hiding the view, the initial state will not be used again.
         *
         * @default visible
         */
        visibility?: "visible" | "hidden" | "collapsed";
      }[];
      /*
       * Contributes views to Test container in the Activity bar
       */
      test?: {
        type?: "tree" | "webview";
        id: string;
        /*
         * The human-readable name of the view. Will be shown
         */
        name: string;
        /*
         * Condition which must be true to show this view
         */
        when?: string;
        /*
         * Path to the view icon. View icons are displayed when the name of the view cannot be shown. It is recommended that icons be in SVG, though any image file type is accepted.
         */
        icon?: string;
        /*
         * Human-readable context for when the view is moved out of its original location. By default, the view's container name will be used.
         */
        contextualTitle?: string;
        /*
         * Initial state of the view when the extension is first installed. Once the user has changed the view state by collapsing, moving, or hiding the view, the initial state will not be used again.
         *
         * @default visible
         */
        visibility?: "visible" | "hidden" | "collapsed";
      }[];
      /*
       * Contributes views to Remote container in the Activity bar. To contribute to this container, enableProposedApi needs to be turned on
       */
      remote?: {
        /*
         * Identifier of the view. This should be unique across all views. It is recommended to include your extension id as part of the view id. Use this to register a data provider through `vscode.window.registerTreeDataProviderForView` API. Also to trigger activating your extension by registering `onView:${id}` event to `activationEvents`.
         */
        id: string;
        /*
         * The human-readable name of the view. Will be shown
         */
        name: string;
        /*
         * Condition which must be true to show this view
         */
        when?: string;
        /*
         * Nested group in the viewlet
         */
        group?: string;
        /*
         * The name of the remote type associated with this view
         */
        remoteName?: void;
      }[];
    } & {
      [key: string]: {
        type?: "tree" | "webview";
        id: string;
        /*
         * The human-readable name of the view. Will be shown
         */
        name: string;
        /*
         * Condition which must be true to show this view
         */
        when?: string;
        /*
         * Path to the view icon. View icons are displayed when the name of the view cannot be shown. It is recommended that icons be in SVG, though any image file type is accepted.
         */
        icon?: string;
        /*
         * Human-readable context for when the view is moved out of its original location. By default, the view's container name will be used.
         */
        contextualTitle?: string;
        /*
         * Initial state of the view when the extension is first installed. Once the user has changed the view state by collapsing, moving, or hiding the view, the initial state will not be used again.
         *
         * @default visible
         */
        visibility?: "visible" | "hidden" | "collapsed";
      }[];
    };
    /*
     * Contributes help information for Remote
     */
    remoteHelp?: {
      /*
       * The url, or a command that returns the url, to your project's Getting Started page
       */
      getStarted?: string;
      /*
       * The url, or a command that returns the url, to your project's documentation page
       */
      documentation?: string;
      /*
       * The url, or a command that returns the url, to your project's feedback reporter
       */
      feedback?: string;
      /*
       * The url, or a command that returns the url, to your project's issues list
       */
      issues?: string;
    };
  };
  /*
   * Sets the extension to be flagged as a Preview in the Marketplace.
   */
  preview?: boolean;
  enableProposedApi?: boolean;
  /*
   * @uniqueItems true
   */
  enabledApiProposals?: (
    | "authSession"
    | "badges"
    | "commentsResolvedState"
    | "contribEditSessions"
    | "contribLabelFormatterWorkspaceTooltip"
    | "contribMenuBarHome"
    | "contribMergeEditorToolbar"
    | "contribRemoteHelp"
    | "contribShareMenu"
    | "contribViewsRemote"
    | "contribViewsWelcome"
    | "customEditorMove"
    | "diffCommand"
    | "documentFiltersExclusive"
    | "documentPaste"
    | "editorInsets"
    | "extensionRuntime"
    | "extensionsAny"
    | "externalUriOpener"
    | "fileSearchProvider"
    | "findTextInFiles"
    | "fsChunks"
    | "idToken"
    | "inlineCompletionsAdditions"
    | "inlineCompletionsNew"
    | "ipc"
    | "notebookCellExecutionState"
    | "notebookContentProvider"
    | "notebookControllerKind"
    | "notebookDebugOptions"
    | "notebookDeprecated"
    | "notebookEditor"
    | "notebookEditorEdit"
    | "notebookKernelSource"
    | "notebookLiveShare"
    | "notebookMessaging"
    | "notebookMime"
    | "notebookWorkspaceEdit"
    | "portsAttributes"
    | "quickPickSortByLabel"
    | "resolvers"
    | "scmActionButton"
    | "scmSelectedProvider"
    | "scmValidation"
    | "snippetWorkspaceEdit"
    | "taskPresentationGroup"
    | "telemetry"
    | "terminalDataWriteEvent"
    | "terminalDimensions"
    | "terminalNameChangeEvent"
    | "testCoverage"
    | "testObserver"
    | "textEditorDrop"
    | "textSearchProvider"
    | "timeline"
    | "tokenInformation"
    | "treeViewReveal"
    | "workspaceTrust"
  )[];
  /*
   * Activation events for the VS Code extension.
   */
  activationEvents?: string[];
  /*
   * Array of badges to display in the sidebar of the Marketplace's extension page.
   */
  badges?: {
    /*
     * Badge image URL.
     */
    url: string;
    /*
     * Badge link.
     */
    href: string;
    /*
     * Badge description.
     */
    description: string;
  }[];
  /*
   * Controls the Markdown rendering engine used in the Marketplace. Either github (default) or standard.
   *
   * @default github
   */
  markdown?: "github" | "standard";
  /*
   * Controls the Q&A link in the Marketplace. Set to marketplace to enable the default Marketplace Q & A site. Set to a string to provide the URL of a custom Q & A site. Set to false to disable Q & A altogether.
   *
   * @default marketplace
   */
  qna?: ("marketplace" | false) | string;
  /*
   * Dependencies to other extensions. The identifier of an extension is always ${publisher}.${name}. For example: vscode.csharp.
   *
   * @uniqueItems true
   */
  extensionDependencies?: string[];
  /*
   * A set of extensions that can be installed together. The identifier of an extension is always ${publisher}.${name}. For example: vscode.csharp.
   *
   * @uniqueItems true
   */
  extensionPack?: string[];
  /*
   * Define the kind of an extension. `ui` extensions are installed and run on the local machine while `workspace` extensions run on the remote.
   *
   * @default workspace
   */
  extensionKind?: ("ui" | "workspace")[];
  /*
   * Declare the set of supported capabilities by the extension.
   */
  capabilities?: {
    /*
     * Declares whether the extension should be enabled in virtual workspaces. A virtual workspace is a workspace which is not backed by any on-disk resources. When false, this extension will be automatically disabled in virtual workspaces. Default is true.
     */
    virtualWorkspaces?: void;
    /*
     * Declares how the extension should be handled in untrusted workspaces.
     */
    untrustedWorkspaces?: {
      supported: "limited" | true | false;
      /*
       * A list of configuration keys contributed by the extension that should not use workspace values in untrusted workspaces.
       */
      restrictedConfigurations?: string[];
      description?: string;
    };
  };
  /*
   * Specify the location from where users can sponsor your extension.
   */
  sponsor?: {
    /*
     * URL from where users can sponsor your extension. It must be a valid URL with a HTTP or HTTPS protocol. Example value: https://github.com/sponsors/nvaccess
     */
    url?: string;
  };
  scripts?: {
    /*
     * Script executed before the package is published as a VS Code extension.
     */
    ["vscode:prepublish"]?: string;
    /*
     * Uninstall hook for VS Code extension. Script that gets executed when the extension is completely uninstalled from VS Code which is when VS Code is restarted (shutdown and start) after the extension is uninstalled. Only Node scripts are supported.
     */
    ["vscode:uninstall"]?: string;
  };
  /*
   * The path to a 128x128 pixel icon.
   */
  icon?: string;
};
