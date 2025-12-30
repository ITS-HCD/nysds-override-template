/*
 * Toggle State Manager
 * ====================
 * Handles the toggle state for NYSDS overrides.
 * Dynamically injects/removes the override.css stylesheet based on toggle state.
 */

/*
 * DEVELOPMENT MODE
 * ================
 * Set to true to load CSS from a local server for live reload.
 * Run: npx serve . -p 5555
 * Then just refresh the page to see CSS changes (no extension reload needed).
 */
const DEV_MODE = false;
const DEV_SERVER_URL = 'http://localhost:5555';

(function () {
  'use strict';

  const STORAGE_KEY = 'nysdsOverrideEnabled';
  const LINK_ID = 'nysds-override-styles';

  /**
   * Inject the override.css stylesheet
   */
  function injectStyles() {
    if (document.getElementById(LINK_ID)) return; // Already injected

    const link = document.createElement('link');
    link.id = LINK_ID;
    link.rel = 'stylesheet';
    link.type = 'text/css';

    // In dev mode, load from local server for live reload
    if (DEV_MODE) {
      link.href = `${DEV_SERVER_URL}/override.css`;
    } else {
      link.href = chrome.runtime.getURL('override.css');
    }

    document.head.appendChild(link);
  }

  /**
   * Remove the override.css stylesheet
   */
  function removeStyles() {
    const link = document.getElementById(LINK_ID);
    if (link) {
      link.remove();
    }
  }

  /**
   * Apply or remove overrides based on state
   */
  function applyToggleState(enabled) {
    if (enabled) {
      injectStyles();
    } else {
      removeStyles();
    }

    // Dispatch custom event so override.js can respond to toggle changes
    window.dispatchEvent(
      new CustomEvent('nysdsOverrideToggle', { detail: { enabled } })
    );
  }

  /**
   * Initialize toggle state from storage
   */
  function init() {
    // Default to enabled (true) if no stored state
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      const enabled = result[STORAGE_KEY] !== false; // Default to true
      applyToggleState(enabled);
    });

    // Listen for changes to toggle state (from popup)
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'local' && changes[STORAGE_KEY]) {
        applyToggleState(changes[STORAGE_KEY].newValue);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose helper for override.js to check current state
  window.nysdsOverride = {
    isEnabled: function () {
      return !!document.getElementById(LINK_ID);
    },
  };
})();
