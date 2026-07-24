/* Japanese Miner v7.2.2 — profile sign-in reliability hotfix */
(() => {
  'use strict';

  function message(text, good = false) {
    const el = document.getElementById('authMessage');
    if (!el) return;
    el.textContent = text;
    el.style.display = text ? 'block' : '';
    el.style.color = good ? 'var(--green, #63f5cb)' : 'var(--red, #ff7185)';
  }

  function hideOverlay() {
    const overlay = document.getElementById('authOverlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    overlay.hidden = true;
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function reliableSubmit(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const button = document.getElementById('authSubmitBtn');
    if (button?.dataset.authBusy === '1') return;
    if (button) {
      button.dataset.authBusy = '1';
      button.disabled = true;
    }

    message('Signing in…', true);

    try {
      if (typeof window.submitAuth !== 'function') {
        throw new Error('The profile system did not finish loading. Refresh the page and try again.');
      }
      window.submitAuth();

      // A successful sign-in sets the active profile and normally closes the overlay.
      // Close it here as a safety net if a later rendering feature throws an error.
      const activeId = localStorage.getItem('jm_active_profile');
      if (activeId) {
        hideOverlay();
      } else {
        const current = document.getElementById('authMessage')?.textContent || '';
        if (!current || current === 'Signing in…') {
          message('The player name or PIN was not accepted. Please check both entries.');
        }
      }
    } catch (error) {
      console.error('Japanese Miner sign-in failed:', error);
      message(error?.message || 'Sign-in failed. Please refresh and try again.');
    } finally {
      window.setTimeout(() => {
        if (button) {
          button.dataset.authBusy = '0';
          button.disabled = false;
        }
      }, 250);
    }
  }

  function install() {
    const submit = document.getElementById('authSubmitBtn');
    if (!submit) return;

    // Replace any stale handler left by an older cached game script.
    submit.onclick = reliableSubmit;

    ['authUsername', 'authPin', 'authPinConfirm'].forEach((id) => {
      const field = document.getElementById(id);
      if (!field || field.dataset.auth722Bound === '1') return;
      field.dataset.auth722Bound = '1';
      field.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') reliableSubmit(event);
      });
    });

    // Make the final loadProfile close the dialog before expensive rendering.
    if (typeof window.loadProfile === 'function' && !window.loadProfile.__auth722Wrapped) {
      const original = window.loadProfile;
      const wrapped = function(profile) {
        hideOverlay();
        try {
          return original.apply(this, arguments);
        } catch (error) {
          console.error('Profile loaded, but game rendering reported an error:', error);
          message('Signed in. A display feature had an error, but your profile is still loaded.', true);
          return undefined;
        }
      };
      wrapped.__auth722Wrapped = true;
      window.loadProfile = wrapped;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  } else {
    install();
  }
  window.addEventListener('load', install, { once: true });
})();
