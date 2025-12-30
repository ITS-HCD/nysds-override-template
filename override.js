/*
 * NYSDS Override Script
 * =====================
 * This script makes DOM modifications to demonstrate recommended HTML structure changes.
 * All modifications should be wrapped in toggle state checks.
 *
 * Use this file to:
 * - Add ARIA attributes for accessibility
 * - Wrap elements in semantic containers
 * - Add/remove classes
 * - Make other structural improvements
 *
 * Keep modifications minimal and well-commented so engineering teams understand the intent.
 */

(function () {
  'use strict';

  /**
   * Store references to modifications so they can be reverted
   */
  const modifications = [];

  /**
   * Apply all DOM modifications
   * Called when toggle is enabled
   */
  function applyModifications() {
    // =======================================================================
    // Example: Add landmark role to main content
    // =======================================================================
    /*
    const mainContent = document.querySelector('#content');
    if (mainContent && !mainContent.hasAttribute('role')) {
      mainContent.setAttribute('role', 'main');
      modifications.push({
        element: mainContent,
        type: 'attribute',
        name: 'role',
        originalValue: null,
      });
      // Why: Main content should use <main> or role="main" for screen reader navigation
    }
    */

    // =======================================================================
    // Example: Add skip link for keyboard navigation
    // =======================================================================
    /*
    const existingSkipLink = document.querySelector('.nysds-skip-link');
    if (!existingSkipLink) {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'nysds-skip-link';
      skipLink.textContent = 'Skip to main content';
      skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--nys-color-primary, #003366);
        color: white;
        padding: 8px;
        z-index: 10000;
        transition: top 0.3s;
      `;
      // Show on focus
      skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
      });
      skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
      });
      document.body.insertBefore(skipLink, document.body.firstChild);
      modifications.push({
        element: skipLink,
        type: 'element',
        parent: document.body,
      });
      // Why: Skip links help keyboard users bypass repetitive navigation
    }
    */

    // =======================================================================
    // Example: Add aria-label to icon-only buttons
    // =======================================================================
    /*
    const iconButtons = document.querySelectorAll('button:not([aria-label])');
    iconButtons.forEach((button) => {
      // Check if button has no visible text
      if (button.textContent.trim() === '' || button.querySelector('img, svg, i')) {
        const title = button.getAttribute('title');
        if (title && !button.hasAttribute('aria-label')) {
          button.setAttribute('aria-label', title);
          modifications.push({
            element: button,
            type: 'attribute',
            name: 'aria-label',
            originalValue: null,
          });
          // Why: Screen readers need accessible names for buttons
        }
      }
    });
    */

    // =======================================================================
    // Example: Wrap tables in responsive container
    // =======================================================================
    /*
    const tables = document.querySelectorAll('table:not(.nysds-wrapped)');
    tables.forEach((table) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'nysds-table-wrapper';
      wrapper.style.cssText = 'overflow-x: auto; max-width: 100%;';
      table.classList.add('nysds-wrapped');
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      modifications.push({
        element: wrapper,
        type: 'wrapper',
        child: table,
      });
      // Why: Responsive table wrappers prevent horizontal overflow on mobile
    });
    */

    // =======================================================================
    // Add your DOM modifications below
    // =======================================================================

    /*
     * Tips:
     * - Always check if the element exists before modifying
     * - Store original values so changes can be reverted
     * - Add comments explaining why each modification improves the UI/UX
     * - Keep modifications focused and minimal
     */
  }

  /**
   * Revert all DOM modifications
   * Called when toggle is disabled
   */
  function revertModifications() {
    modifications.forEach((mod) => {
      try {
        switch (mod.type) {
          case 'attribute':
            if (mod.originalValue === null) {
              mod.element.removeAttribute(mod.name);
            } else {
              mod.element.setAttribute(mod.name, mod.originalValue);
            }
            break;

          case 'element':
            if (mod.element.parentNode) {
              mod.element.parentNode.removeChild(mod.element);
            }
            break;

          case 'wrapper':
            if (mod.element.parentNode && mod.child) {
              mod.element.parentNode.insertBefore(mod.child, mod.element);
              mod.element.parentNode.removeChild(mod.element);
              mod.child.classList.remove('nysds-wrapped');
            }
            break;

          case 'class':
            if (mod.action === 'add') {
              mod.element.classList.remove(mod.className);
            } else {
              mod.element.classList.add(mod.className);
            }
            break;
        }
      } catch (e) {
        console.warn('NYSDS Override: Could not revert modification', e);
      }
    });

    // Clear the modifications array
    modifications.length = 0;
  }

  /**
   * Handle toggle state changes
   */
  function handleToggle(event) {
    if (event.detail.enabled) {
      applyModifications();
    } else {
      revertModifications();
    }
  }

  /**
   * Initialize
   */
  function init() {
    // Listen for toggle events from toggle.js
    window.addEventListener('nysdsOverrideToggle', handleToggle);

    // Apply modifications if already enabled
    if (window.nysdsOverride && window.nysdsOverride.isEnabled()) {
      applyModifications();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
