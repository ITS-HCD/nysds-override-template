# CLAUDE.md

This file provides context and instructions for Claude Code when working on this project.

---

# PRD: NYSDS Override Extension Template

## Overview

A small forkable Chrome extension template that applies CSS and JS overrides to a specified URL, allowing teams to preview NYS Design System styling on legacy applications. This serves as a GitHub Template Repository that teams can use to quickly spin up new override projects.

**Repository**: `https://github.com/ITS-HCD/nysds-override-template`

## Goals

- **Simple**: Minimal boilerplate — the real work happens in `override.css` and `override.js`
- **Previewable**: Stakeholders can side-load the extension to see proposed changes
- **Toggleable**: On/off switch so users can compare before/after
- **Live reload**: CSS and JS changes appear immediately on save (no rebuild step)
- **Forkable**: GitHub Template Repository — one click to create a new override project

## Technical Requirements

### File Structure

```
nysds-override-template/
├── manifest.json
├── override.css        # Main stylesheet for overrides
├── override.js         # HTML modifications (DOM manipulation)
├── toggle.js           # Handles on/off toggle state
├── popup.html          # Simple toggle UI
├── popup.js            # Toggle button logic
├── icons/
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
├── CHANGELOG.md        # Version history
└── README.md           # Installation + usage instructions
```

### manifest.json

- Use Manifest V3
- Content scripts should target a configurable URL pattern (e.g., `*://*.example.gov/*`)
- Include `activeTab` and `storage` permissions (for toggle state)
- Register `override.css` and `override.js` as content scripts
- Register popup for toggle UI

### NYSDS Integration

Pull in NYSDS fonts and tokens via CDN links in `override.css`:

```css
/* NYSDS Fonts */
@import url('https://unpkg.com/@nysds/fonts/css/fonts.css');

/* NYSDS Tokens (CSS variables) */
@import url('https://unpkg.com/@nysds/styles/css/tokens.css');

/* Now you can use NYSDS variables */
.legacy-button {
  background-color: var(--nys-color-action);
  font-family: var(--nys-font-family-body);
}
```

### Toggle Functionality

- Popup with a single on/off toggle button
- State persists via `chrome.storage.local`
- When off: content scripts don't apply changes
- Visual indicator in popup showing current state
- Toggle should work without requiring page refresh (inject/remove styles dynamically)

### override.js Behavior

- Purpose: Make simple DOM modifications to demonstrate recommended HTML structure changes
- Should wrap changes in a check for toggle state
- Keep modifications minimal and well-commented so engineering teams understand the intent
- Example use cases:
  - Adding ARIA attributes
  - Wrapping elements in semantic containers
  - Adding/removing classes

```js
// Example: Add landmark role to legacy div
const mainContent = document.querySelector('#content');
if (mainContent) {
  mainContent.setAttribute('role', 'main');
  // Comment explaining why: "Main content should use <main> or role='main' for screen reader navigation"
}
```

### Live Reload

Yes, this is possible without extra tooling:

- **CSS**: Chrome reloads CSS content scripts when you refresh the page. For true live reload, the extension can use `chrome.scripting.insertCSS` and re-inject on file change — but this adds complexity.
- **Simpler approach**: 
  - Instruct users to keep DevTools open
  - Use the Extensions page "reload" button (or Ctrl+R on the extension card)
  - Or: link `override.css` via a `<link>` tag injected by JS (file:// URL) — this allows true live reload but requires users to enable "Allow access to file URLs" in extension settings

**Recommendation**: For simplicity, document the "reload extension" workflow. Add a keyboard shortcut to reload if helpful.

### Versioning & Releases

- Use [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH)
  - MAJOR: Breaking changes to template structure
  - MINOR: New features or example patterns
  - PATCH: Bug fixes and documentation updates
- Keep `manifest.json` version in sync with git tags
- Create GitHub Releases for each version with release notes
- Update `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com/) format
- Tag releases as `v1.0.0` (with `v` prefix)

### README.md Content

1. **What this is**: Brief explanation of the override extension template purpose
2. **Creating a new override project**:
   - Click "Use this template" button on GitHub
   - Name your repo `nysds-override-<app-name>`
   - Clone your new repo locally
   - Update the URL pattern in `manifest.json`
   - Update the extension name/description in `manifest.json`
3. **Installing the extension (for stakeholders)**:
   - Clone/download the repo
   - Open `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extension folder
   - (Optional) Enable "Allow access to file URLs" for live CSS reload
4. **Usage**:
   - Navigate to the target application
   - Click the extension icon to toggle on/off
   - Edit `override.css` and `override.js` to modify styles/HTML
   - Reload the extension to see changes (or refresh page for CSS)
5. **For developers**: How to reference NYSDS variables and fonts
6. **Troubleshooting**: Common issues

## Repository Setup

Configure `ITS-HCD/nysds-override-template` as a GitHub Template Repository:

1. Go to repo Settings
2. Check "Template repository" under the repository name
3. This enables the "Use this template" button for users

The template should contain:
- Placeholder URL pattern (e.g., `*://*.example.gov/*`) with clear comments to replace
- Placeholder extension name/description in `manifest.json`
- Example comments in `override.css` and `override.js` showing common patterns
- No app-specific code — just scaffolding

## Out of Scope

- Build tools or bundling
- Hot module replacement
- Multiple URL targets (one extension = one target app)
- Automated testing
- Publishing to Chrome Web Store

## Success Criteria

- A developer can create a new override project from the template and have a working extension in under 5 minutes
- A stakeholder can install the extension following README instructions without developer assistance
- CSS changes are visible after a simple page refresh
- Toggle clearly shows before/after state
- Template repo stays clean — no app-specific code committed to it

## Open Questions

1. Should we include example `override.css` with common legacy patterns (reset styles, form elements, buttons)?
