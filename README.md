# NYS Design System Override Extension Template

This is a template for a small forkable Chrome extension that applies CSS and JS overrides to a specific URL. We built is so teams can eaily preview NYS Design System styling on legacy applications.

## What This Is

This is a GitHub Template Repository that teams can use to quickly spin up new override projects. 

Here's what it's meant for:

- Applying NYSDS styles to legacy applications without needing to modify the source code
- Previewing proposed design changes with stakeholders
- Toggling overrides on/off to compare before/after states
- Making small modifications to the HTML using JS to showcase accessibility improvements

## Creating a New Override Project

1. Click the **"Use this template"** button on GitHub (or go to the repo and select "Use this template" > "Create a new repository")
2. Name your repo `nysds-override-<app-name>` (e.g., `nysds-override-ies-districtportal`)
3. Clone your new repo locally:
   ```bash
   git clone https://github.com/your-org/nysds-override-<app-name>.git
   cd nysds-override-<app-name>
   ```
4. Update `manifest.json`:
   - Change `"name"` to your app name (e.g., `"NYSDS Override - IES District Portal"`)
   - Change `"description"` to describe your project
   - Update the URL pattern in both `host_permissions` and `content_scripts.matches` to target your application (e.g., `*://*.ies.ny.gov/*`)

## Installing the Extension (For Stakeholders)

1. **Download the extension**
   - Clone or download the repository as a ZIP file
   - If downloading ZIP, extract it to a folder

2. **Open Chrome Extensions**
   - Navigate to `chrome://extensions` in Chrome
   - Or go to Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle on "Developer mode" in the top right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the extension folder (the one containing `manifest.json`)

5. **Pin the Extension** (Optional)
   - Click the puzzle piece icon in Chrome's toolbar
   - Click the pin icon next to "NYSDS Override"

## Usage

1. **Navigate** to the target application in Chrome
2. **Click** the extension icon in the toolbar
3. **Toggle** the switch to enable/disable overrides
4. **Observe** the styling changes on the page

### Editing Overrides

- **CSS Changes**: Edit `override.css` to modify styles
  - Changes appear after refreshing the page
  - For faster iteration, reload the extension from `chrome://extensions`

- **DOM Changes**: Edit `override.js` to modify HTML structure
  - Add ARIA attributes, semantic elements, or class modifications
  - Changes apply when the toggle is enabled

> [!IMPORTANT]
> **The DOM changes in `override.js` are for demonstration purposes only.** They preview proposed HTML improvements (like accessibility fixes or semantic markup) so stakeholders can see the intended result. These changes are not meant for production — engineers should use these as a guide to implement the modifications properly in the application's source code. Document each change with comments explaining the "why" so the intent is clear.

### Reloading Changes

After editing files:
1. Go to `chrome://extensions`
2. Find the NYSDS Override extension
3. Click the refresh icon (↻) on the extension card
4. Refresh your target page

## For Developers

### NYSDS Resources

Before writing overrides, review these resources to understand how NYSDS applies tokens:

- **[NYSDS Tokens](https://designsystem.ny.gov/foundations/tokens/)** - Color, typography, spacing, and other design tokens
- **[NYSDS Components](https://designsystem.ny.gov/components/)** - See how tokens are applied to real components

Use NYSDS components as a reference for how to style similar elements in your legacy application.

### Using NYSDS Variables

The template automatically imports NYSDS fonts and tokens via CDN. Use CSS variables in your overrides:

```css
.my-element {
  /* Typography */
  font-family: var(--nys-font-family-body);

  /* Colors */
  background-color: var(--nys-color-action);
  color: var(--nys-color-white);

  /* Spacing */
  padding: var(--nys-space-4);
  margin-bottom: var(--nys-space-2);
}
```

### Customizing NYSDS Imports

The template imports NYSDS assets via CDN in `override.css`. You can customize which assets to load by commenting/uncommenting the `@import` lines:

| Asset | Description | When to Use |
|-------|-------------|-------------|
| **Fonts** | Proxima Nova + D Sari typefaces | Always recommended |
| **Base tokens** (`nysds.min.css`) | CSS variables only | Default - when applying tokens to existing styles |
| **Full styles** (`nysds-full.min.css`) | Tokens + reset + utilities | When you want aggressive normalization (may conflict with app styles) |

**Agency Themes** (optional) - Override default colors for specific agency branding:
- `nysds-theme-admin.min.css`
- `nysds-theme-business.min.css`
- `nysds-theme-environment.min.css`
- `nysds-theme-health.min.css`
- `nysds-theme-local.min.css`
- `nysds-theme-safety.min.css`
- `nysds-theme-transportation.min.css`

Import a theme AFTER base tokens. Only use one theme at a time.

### Production-Ready CSS

The CSS in `override.css` uses clean selectors without any extension-specific prefixes. This means engineers can copy styles directly into their codebase:

```css
/* This CSS is ready to use in production */
.legacy-button {
  background-color: var(--nys-color-action);
  font-family: var(--nys-font-family-body);
}
```

The extension dynamically injects/removes the stylesheet when toggled, so you don't need any special selector patterns.

### DOM Modification Pattern

In `override.js`, modifications are tracked so they can be reverted when the toggle is turned off:

```javascript
// Example: Add ARIA label to icon button
const iconButton = document.querySelector('.icon-btn');
if (iconButton && !iconButton.hasAttribute('aria-label')) {
  iconButton.setAttribute('aria-label', 'Close dialog');
  modifications.push({
    element: iconButton,
    type: 'attribute',
    name: 'aria-label',
    originalValue: null,
  });
}
```

### File Structure

```
nysds-override-template/
├── manifest.json       # Extension configuration (update URL pattern here)
├── override.css        # Main stylesheet for overrides
├── override.js         # DOM manipulation script
├── toggle.js           # Toggle state management
├── popup.html          # Toggle UI popup
├── popup.js            # Popup logic
├── icons/              # Extension icons
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
└── README.md           # This file
```

### Customizing Icons

The template includes placeholder icons. To customize:

1. Create 16x16, 48x48, and 128x128 PNG icons
2. Replace the files in the `icons/` folder
3. Keep the same filenames or update `manifest.json`

SVG source files are also included in `icons/` for reference.

## Troubleshooting

### Extension not loading
- Ensure you're selecting the folder containing `manifest.json`, not a parent folder
- Check for JSON syntax errors in `manifest.json`

### Styles not applying
- Verify the URL pattern in `manifest.json` matches your target site
- Check that the toggle is enabled (click the extension icon)
- Open DevTools console for any error messages

### Changes not visible after edit
- Reload the extension from `chrome://extensions`
- Hard refresh the page (Cmd+Shift+R / Ctrl+Shift+R)
- Check DevTools for CSS errors

### Toggle state not persisting
- The extension uses `chrome.storage.local` which persists across sessions
- Clear extension storage: Right-click extension icon → "Options" or reinstall

### Extension icon not showing
- Ensure PNG files exist in the `icons/` folder
- Check file paths in `manifest.json` match actual filenames

## Resources

- [NYS Design System](https://designsystem.ny.gov)
- [NYSDS Tokens](https://designsystem.ny.gov/foundations/tokens/) - Design token reference
- [NYSDS Components](https://designsystem.ny.gov/components/) - Component token usage examples
- [Chrome Extension Developer Guide](https://developer.chrome.com/docs/extensions/mv3/)

## License

This template is provided for use by New York State agencies and their partners.
