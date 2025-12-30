/*
 * Toggle State Manager
 * ====================
 * Handles the toggle state for NYSDS overrides.
 * Adds/removes the 'nysds-override-active' class on <html> based on toggle state.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'nysdsOverrideEnabled';
  const ACTIVE_CLASS = 'nysds-override-active';

  /**
   * Apply or remove the override active class based on state
   */
  function applyToggleState(enabled) {
    if (enabled) {
      document.documentElement.classList.add(ACTIVE_CLASS);
    } else {
      document.documentElement.classList.remove(ACTIVE_CLASS);
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
      return document.documentElement.classList.contains(ACTIVE_CLASS);
    },
    ACTIVE_CLASS: ACTIVE_CLASS,
  };
})();
