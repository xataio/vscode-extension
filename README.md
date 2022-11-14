# Xata VS Code Extension

![Xata + VS Code banner](https://user-images.githubusercontent.com/1761469/180163941-94a75bdd-6d3f-4a0c-bf53-1f5dbe4d45ef.png)

This extension enables users to manage their entire workspace at [Xata](https://xata.io) without leaving Visual Studio Code.

## Getting Started

1. Install the extension from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=xata.xata)

   Once it will show in your Activity Bar like in the image below.

2. Connect your Xata Workspace to the extension
   The first step is to connect the extension to a Xata Workspace. To the that, a `XATA_API_KEY` is required. Clicking the **Get Started** button on the **Explorer Pane**.

   ![Setup view for the VSCode Extension](https://raw.githubusercontent.com/xataio/vscode-extension/5a541d1c7d9ec0327dee5f6f3ebece2500ec27df/doc/get-started-view.png)

   > 💡 if you are logged out, the **Get Started** on the **Project Pane** will have the same action. It is impossible to connect to databases while there is no Xata Workspace available.

   When fired, this action will take you to your Xata Dashboard to create an [API key](https://docs.xata.io/concepts/api-keys). Once the key is created, there will be a new prompt to return to VS Code and your **Explorer Pane** should be populated with your workspaces.

   ![List of workspaces on Xata VSCode Extension](https://github.com/xataio/vscode-extension/raw/main/doc/workspaces-view.png)

3. Connect your project to Xata databases

   The **Project Panel** (`(uninitialized)` in the screenshot) is related to your current VS Code project. After being initialized, this will add a `.env` with an API key and a `.xatarc` with your database access details.

   > ⚠️ While we recommend to version control the `.xatarc`, you should always add `.env` in `.gitignore` to avoid leaking the `XATA_API_KEY` and potentially other secrets.

   If a `.xatarc` is already set, you will just need to login.

## Productivity Features

The main goal of this extension is be protective of the user's [flow state](<https://en.wikipedia.org/wiki/Flow_(psychology)>). Translating this intention, our User Interface becomes all about ergonomics and making the tasks achieveable with as little clicks as possible.

### Explorer Pane

Once an account is connected to a Xata Workspace, the Explorer Pane is popullated with all databases available. Available actions will be consistent with the permissions of the provided token.

### Project Pane

Once a `.xatarc` is found in your project, the **Project Pane** will be populated with all databases and tables available for that project according to the definitions of the `.xatarc` and the permissions the `XATA_API_KEY` provided to the extension.

## Database Features

The Xata VS Code extension aims for complete parity with our web dashboard. We dilligently work on providing full support so a developer never needs to leave VS Code to get work done.

### Manage Your Databases

![Creating schema via VS Code Xata Extension](https://raw.githubusercontent.com/xataio/vscode-extension/5a541d1c7d9ec0327dee5f6f3ebece2500ec27df/doc/create-schema.gif)

Using this extension, you can create [workspaces](https://docs.xata.io/concepts/workspaces), databases, branches, tables, and columns directly from the sidebar.

### Preview & Insert Records

![Inserting records via VS Code Xata Extension](https://raw.githubusercontent.com/xataio/vscode-extension/5a541d1c7d9ec0327dee5f6f3ebece2500ec27df/doc/insert-preview-records.gif)

This extension also allows users to preview, then insert records into a database of your choice on Xata with autocompletion and validation.

After successfully inserting the record, you can save the file into your project for easy insertion in the future, or for sharing it with others: if they change the `"$schema"` parameter, the same record can be inserted into another database.

### Create a [Branch](https://docs.xata.io/concepts/branches)

This is how you can create a new database branch in Xata. It also creates a git branch of the same name in your project if your project is associated with a git repository. If not, it will just create a branch of your database on Xata.

![create a branch in Xata](https://user-images.githubusercontent.com/1761469/186844556-b4d647c3-d6f6-4ab7-a4ad-93d856f0148b.gif)

You can always see on which branch you are currently working next to the name of your database. If your git branch matches a Xata branch, the extension automatically infers it. If it doesn't, the extension falls back on using the `XATA_FALLBACK_BRANCH` specified in your `.env`, or `main` if the fallback branch is unspecified. More about the fallback branch in the [docs](https://docs.xata.io/cli/getting-started#:~:text=fallback%20branch).

![circled branch name on VS Code Xata Extension explorer pane](https://user-images.githubusercontent.com/9947422/180236005-49c4d470-ab15-4867-bc5f-08b37813d82d.png)

The intended flow of working with Xata branches is the following:

- You start to work on a feature and create a new git branch (Current Xata branch is `main` and current git branch is `my-new-feature`)
- You need to tweak the schema or data of your database
- You create a new Xata branch (Xata branch = `my-new-feature` / git branch = `my-new-feature`)

Therefore, everybody (including CI and Pull Request previews) testing the code on this git branch will automatically have the associated database branch.

## Xata's link tree

- [Xata Serverless Database Community](https://xata.io/discord): You are invited to join us on Discord.
- [@Xata on twitter](https://twitter.com/xata): Share some `#XataVibes` with us.
- [Xata Support](https://support.xata.io): if you found a bug or have a feature request to Xata, use our user forum so the feedback arrives faster to who will implement it.
- [Xata Docs](https://docs.xata.io): check the docs for the Xata SDK, Xata CLI, and all other tools and interfaces.

---

Made by <img alt="Xatafly, Xata's logo" src="https://raw.githubusercontent.com/xataio/vscode-extension/2e3d0b877cf6aff1e0fc717e05ada714465ca783/doc/xata-icon-128.png" width="24" />
