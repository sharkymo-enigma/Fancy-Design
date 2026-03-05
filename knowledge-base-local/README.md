# Knowledge base

New findings from users and stakeholders go here (or in a linked shared location).

## Purpose

- **Input for the spec**: UX researchers/designers add interview notes, workshop outputs, Confluence exports, or links to Teams/Confluence/Notion so the analyst agent can analyse and parse into the `spec/` folder after your review.

---

## Connecting a SharePoint / Teams folder as the knowledge repo

To use a **SharePoint** or **Teams shared folder** as your knowledge base so the analyst agent can read from it:

### 1. Sync the folder to your machine

- **Teams**: Open the team/channel **Files** tab → open the folder in SharePoint → **Sync** (or **Add shortcut to OneDrive**).
- **SharePoint**: Open the document library in a browser → **Sync** (or **Add shortcut to OneDrive**).

Once synced, the folder appears at a **local path** on your machine, for example:

- **macOS**: `~/Library/CloudStorage/OneDrive - YourCompany/YourSharePointFolder` or under your OneDrive folder in Finder.
- **Windows**: `C:\Users\<You>\OneDrive - YourCompany\YourSharePointFolder` or `C:\Users\<You>\YourCompany\YourSharePointFolder`.

### 2. Point this project at the synced folder

Choose one of the following.

**Option A – Symlink (recommended)**  
Replace or link the project’s `knowledge-base/` with the synced folder so the agent sees the same files:

```bash
# From the project root (Figma to code POC/)

# 1. Rename the existing knowledge-base so you keep the README
mv knowledge-base knowledge-base-local

# 2. Create a symlink named "knowledge-base" pointing at your synced folder
ln -s "/path/to/your/synced/SharePoint-or-Teams-folder" knowledge-base

# 3. (Optional) Copy this README into the synced folder so others see it
cp knowledge-base-local/README.md knowledge-base/README.md
```

Use the **actual path** to your synced folder (e.g. the OneDrive path from step 1). After this, `knowledge-base/` in the project is the same as your SharePoint/Teams folder.

**Option B – Config file (use synced folder elsewhere)**  
Keep the repo’s `knowledge-base/` as-is and tell the project (and the agent) where the “real” knowledge repo lives:

1. Create a file in the project named **`.knowledge-base-path`** (in the project root) with one line: the absolute path to your synced SharePoint/Teams folder.

   Example (macOS):

   ```
   /Users/you/Library/CloudStorage/OneDrive - YourCompany/Project Research
   ```

   Example (Windows, in a `.knowledge-base-path` file):

   ```
   C:\Users\you\OneDrive - YourCompany\Project Research
   ```

2. When you run the analyst agent, say: **“Analyse the knowledge base at the path in .knowledge-base-path”** or **“Sync from the knowledge base path in the repo.”** The agent will read that path and use it as the knowledge repo.

**Option C – Copy into this folder**  
Don’t sync; periodically copy files from SharePoint/Teams into `knowledge-base/`. The agent uses only what’s in `knowledge-base/`. Good if you want the repo to be self-contained and not depend on OneDrive.

### 3. Use the analyst agent

- **If you used Option A (symlink)**: Say **“Analyse knowledge-base”** or **“Analyse the knowledge base”**. The agent reads from `knowledge-base/`, which is your synced SharePoint/Teams folder.
- **If you used Option B (config file)**: Say **“Analyse the knowledge base at the path in .knowledge-base-path”** so the agent uses the path from that file.
- **If you used Option C**: Put files in `knowledge-base/` and say **“Analyse knowledge-base”**.

### Notes

- The agent can only read **local files** (and pasted content). It cannot call SharePoint/Teams APIs directly, so syncing or copying to a local path is required.
- Add `.knowledge-base-path` to `.gitignore` if it contains a path specific to your machine so it isn’t committed.

---

## Options (no SharePoint/Teams)

1. **This folder**: Drop `.md` or `.txt` files here. Point the analyst agent at `knowledge-base/` or at a specific file.
2. **Other external**: Use Confluence or Notion. Sync exports into this folder, or paste content and say e.g. "analyse this document."

## Workflow

1. Add or update content (findings, user quotes, stakeholder decisions) in the knowledge repo (this folder or the path in `.knowledge-base-path`).
2. Trigger the **Analyst agent** (e.g. "analyse knowledge-base" or "analyse the knowledge base at the path in .knowledge-base-path").
3. Review the agent's proposed understanding.
4. Confirm; the agent parses the necessary information into the correct `spec/` files.
