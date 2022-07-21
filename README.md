# Xata VS Code Extension

![image](https://user-images.githubusercontent.com/1761469/180163941-94a75bdd-6d3f-4a0c-bf53-1f5dbe4d45ef.png)


This extension enables users to work with [Xata](https://xata.io) without leaving Visual Studio Code.

## Getting Started

Once the extension is installed from the [VS Code Marketplace](), it should show up in your Activity Bar like in the image below.

![Setup view for the VSCode Extension](https://github.com/xataio/vscode-extension/raw/main/doc/get-started-view.png)

Clicking on any of the **Get Started** buttons should open your default browser. From there, login to your Xata account, and it will prompt you to create an [API key](https://docs.xata.io/concepts/api-keys).

Once the key is created, there will be a new prompt to return to VS Code and your **Explorer** pane should be populated with your workspaces.

![List of workspaces on Xata VSCode Extension](https://github.com/xataio/vscode-extension/raw/main/doc/workspaces-view.png)

The second panel (`(uninitialized)` in the screenshot) is related to your current VS Code project. After being initialized, this will add a `.env` with an API key and a `.xatarc` with your database access details.

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

### Create a [Branch](https://docs.xata.io/concepts/branches)

This is how you can create a new database branch in Xata. It also creates a git branch of the same name in your project if your project is associated with a git repository. If not, it will just create a branch of your database on Xata.

![create-branch](https://github.com/xataio/vscode-extension/raw/main/doc/create-branch.gif)

You can always see on which branch you are currently working next to the name of your database. If your git branch matches a Xata branch, the extension automatically infers it. If it doesn't, the extension falls back on using the `XATA_FALLBACK_BRANCH` specified in your `.env`, or `main` if the fallback branch is unspecified. More about the fallback branch in the [docs](https://docs.xata.io/cli/getting-started#:~:text=fallback%20branch).

![image](https://user-images.githubusercontent.com/9947422/180236005-49c4d470-ab15-4867-bc5f-08b37813d82d.png)

The intended flow of working with Xata branches is the following:

- You start to work on a feature and create a new git branch (Current Xata branch is `main` and current git branch is `my-new-feature`)
- You need to tweak the schema or data of your database
- You create a new Xata branch (Xata branch = `my-new-feature` / git branch = `my-new-feature`)

Therefore, everybody (including CI and Pull Request previews) testing the code on this git branch will automatically have the associated database branch.

---

Made by 🦋
