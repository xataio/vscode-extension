# [Xata](https://xata.io) [VS Code](https://code.visualstudio.com/) Extension

This extension enables users to work with [Xata](https://xata.io) without leaving Visual Studio Code.

## Getting Started

Once the extension is installed it from the [VS Code Marketplace](), it should show up in your Activity Bar like in the image below.

![Setup view for the VSCode Extension](https://github.com/xataio/vscode-extension/raw/main/doc/get-started-view.png)

Clicking on any of the **Get Started** buttons should open your default browser. From there, login to your Xata account, and it will prompt you to create an [API key](https://docs.xata.io/concepts/api-keys).

Once the key is created, there will be a new prompt to return to VS Code and your **Explorer** pane should be populated with your workspaces.

![List of workspaces on Xata VSCode Extension](https://github.com/xataio/vscode-extension/raw/main/doc/workspaces-view.png)

The second panel (`(uninitialized)` in the screenshot)) is related to your current VS Code project. After being initialized, this will add a `.env` with an API key and a `.xatarc` with your database access details.

While we recommend to version control the `.xatarc`, you should always add `.env` in `.gitignore` to avoid leaking the `XATA_API_TOKEN` and potentially other secrets.

If a `.xatarc` is already set, you will just need to login.

## Features

Here are some ways you can interact with Xata from our VS Code extension.

### Manage Your Databases

![create-schema](https://github.com/xataio/vscode-extension/raw/main/doc/create-schema.gif)

Using this extension, you can create [workspaces](https://docs.xata.io/concepts/workspaces), databases, branches, tables, and columns directly from the sidebar.

### Preview & Insert Records

![insert-record](https://github.com/xataio/vscode-extension/raw/main/doc/insert-preview-records.gif)

This extension also allows users to preview, then insert records into a database of your choice on Xata with autocompletion and validation.

After successfully inserting the record, you can save the file into your project for easy insertion in the future, or for sharing it with others: if they change the `"$schema"` parameter, the same record can be inserted into another database.

### Create branch

Create a new database branch that follow your git branch.

![create-branch](https://github.com/xataio/vscode-extension/raw/main/doc/create-branch.gif)

You can always see on which branch you are currently working, if your git branch match a Xata branch, the extension will automatically infer it.

The intended flow is the following:

- I start a feature and create a new git branch (Xata branch = `main` / git branch = `my-new-feature`)
- I need to tweak the schema or data of my database
- I create a new Xata branch (Xata branch = `my-new-feature` / git branch = `my-new-feature`)

Therefore, everybody (including CI and pull-request previews) testing the code on this git branch will automatically have the associated database branch.

---

Made by 🦋
