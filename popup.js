/*
 * Popup Toggle Logic
 * ==================
 * Handles the toggle button in the extension popup.
 * Persists state to chrome.storage.local and updates the UI.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'nysdsOverrideEnabled';

  const toggle = document.getElementById('toggle');
  const status = document.getElementById('status');

  /**
   * Update the status display
   */
  function updateStatus(enabled) {
    if (enabled) {
      status.textContent = 'Overrides active';
      status.className = 'status active';
    } else {
      status.textContent = 'Overrides disabled';
      status.className = 'status inactive';
    }
  }

  /**
   * Save toggle state to storage
   */
  function saveState(enabled) {
    chrome.storage.local.set({ [STORAGE_KEY]: enabled }, () => {
      updateStatus(enabled);
    });
  }

  /**
   * Load initial state from storage
   */
  function loadState() {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      // Default to enabled (true) if no stored state
      const enabled = result[STORAGE_KEY] !== false;
      toggle.checked = enabled;
      updateStatus(enabled);
    });
  }

  // Handle toggle changes
  toggle.addEventListener('change', () => {
    saveState(toggle.checked);
  });

  // Load initial state when popup opens
  loadState();
})();
