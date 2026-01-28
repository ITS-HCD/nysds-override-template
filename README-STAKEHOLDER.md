# NYSDS Test Drive

This Chrome extension previews proposed NYS Design System styling changes on [App Name]. Use it to compare the current look with the new design.

## Installing the Extension

1. **Download the extension**
   - Download this folder as a ZIP file and extract it
   - Or clone the repository if you have Git installed

2. **Open Chrome Extensions**
   - Type `chrome://extensions` in your address bar and press Enter
   - Or go to Chrome menu (⋮) → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle on "Developer mode" in the top right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the extension folder (the one containing this README)

5. **Pin the Extension** (recommended)
   - Click the puzzle piece icon (🧩) in Chrome's toolbar
   - Click the pin icon next to "NYSDS Test Drive"

## Using the Extension

1. **Navigate** to [App URL] in Chrome
2. **Click** the extension icon in the toolbar
3. **Toggle** the switch ON to see the new styling
4. **Toggle** the switch OFF to see the original styling
5. **Compare** the before/after to review the proposed changes

## Troubleshooting

### Extension icon not visible
- Click the puzzle piece icon (🧩) in Chrome's toolbar
- Find "NYSDS Test Drive" and click the pin icon

### Styles not appearing
- Make sure you're on the correct website
- Click the extension icon and verify the toggle is ON
- Try refreshing the page (Cmd+R on Mac, Ctrl+R on Windows)

### Extension not loading
- Make sure you selected the correct folder (it should contain a `manifest.json` file)
- Try removing and re-adding the extension

## Questions?

Contact the design team if you have questions about the proposed changes or need help with the extension.

---

## For Developers: Implementing the Changes

Once stakeholders approve the design, here's how to bring these changes into the legacy application.

### CSS Styles

The styles in `override.css` are production-ready — copy them directly into your application's stylesheet. They use [NYSDS design tokens](https://designsystem.ny.gov/foundations/tokens/) (CSS custom properties) for colors, typography, and spacing.

**To use the tokens**, add this to your application's `<head>`:

```html
<link rel="stylesheet" href="https://unpkg.com/@nysds/styles@latest/dist/nysds.min.css">
```

Or install via npm:

```bash
npm install @nysds/styles
```

### Fonts

The extension uses NYSDS fonts (Proxima Nova, D Sari, Oswald). To use them in your application:

1. **Request access** to the [nysds-fonts repo](https://github.com/ITS-HCD/nysds-fonts) (private, requires NYS authorization)
2. Copy the font files to your project
3. Include `nysds-fonts.css` or add the `@font-face` declarations to your stylesheet

### DOM/HTML Changes

Review the comments in `override.js` — they document proposed HTML improvements (accessibility fixes, semantic markup, ARIA attributes). These are meant as a guide for what to implement in your source code, not to be used directly.

### Resources

- [NYSDS Tokens Reference](https://designsystem.ny.gov/foundations/tokens/)
- [NYSDS Components](https://designsystem.ny.gov/components/)
- [@nysds/styles on npm](https://www.npmjs.com/package/@nysds/styles)
