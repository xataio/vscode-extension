# Xata VS Code Extension

![image](https://user-images.githubusercontent.com/1761469/180163941-94a75bdd-6d3f-4a0c-bf53-1f5dbe4d45ef.png)


This extension enables users to work with [Xata](https://xata.io) without leaving Visual Studio Code.

## Getting Started

Once the extension is installed it from the [VS Code Marketplace](), it should show up in your Activity Bar like in the image below.

![Setup view for the VSCode Extension](https://github.com/xataio/vscode-extension/raw/main/doc/get-started-view.png)

Clicking on any of the **Get Started** buttons should open your default browser. From there, login to your Xata account, and it will prompt you to create an [API key](https://docs.xata.io/concepts/api-keys). Once the key is created, there will be a new prompt to return to VS Code and your **Explorer** pane should be populated with your workspaces.

![List of workspaces on Xata VSCode Extension](https://github.com/xataio/vscode-extension/raw/main/doc/workspaces-view.png)

## Features

Here are some ways you can interact with Xata from our VS Code extension.

### Manage Your Databases

![create-schema](https://github.com/xataio/vscode-extension/raw/main/doc/create-schema.gif)

Using this extension, you can create [workspaces](https://docs.xata.io/concepts/workspaces), databases, branches, tables, and columns directly from the sidebar.

### Preview & Insert Records

![insert-record](https://github.com/xataio/vscode-extension/raw/main/doc/insert-preview-records.gif)

This extension also allows users to preview, then insert records into a database of your choice on Xata with autocompletion and validation.

After successfully inserting the record, you can save the file into your project for easy insertion in the future, or for sharing it with others: if they change the `"$schema"` parameter, the same record can be inserted into another database.

---

Made by 🦋
