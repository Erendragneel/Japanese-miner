/* Japanese Miner v7.2.3 — standalone profile sign-in repair */
(() => {
  'use strict';

  const PROFILE_INDEX_KEY = 'jm_profiles';
  const ACTIVE_PROFILE_KEY = 'jm_active_profile';
  const DEVELOPER_NAME = 'Erendragneel';
  const DEVELOPER_PIN = '217838';

  const byId = (id) => document.getElementById(id);
  const normalizeName = (name) => String(name || '').trim().replace(/\s+/g, ' ');
  const profileStorageKey = (id) => `jm_profile_${id}`;
  const profileIdFromName = (name) => normalizeName(name).toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || `player-${Date.now()}`;

  function pinHash(pin, name) {
    let hash = 2166136261;
    const text = `${normalizeName(name).toLowerCase()}|${pin}|japanese-miner`;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
  }

  function readProfiles() {
    try {
      const value = JSON.parse(localStorage.getItem(PROFILE_INDEX_KEY));
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  function writeProfiles(profiles) {
    localStorage.setItem(PROFILE_INDEX_KEY, JSON.stringify(profiles));
  }

  function showMessage(text, good = false) {
    const output = byId('authMessage');
    if (!output) return;
    output.textContent = text;
    output.style.display = text ? 'block' : '';
    output.style.color = good ? '#63f5cb' : '#ff7185';
  }

  function completeSignIn(profile, profiles) {
    profile.lastPlayed = Date.now();
    writeProfiles(profiles);
    localStorage.setItem(ACTIVE_PROFILE_KEY, profile.id);
    showMessage('Signed in. Loading your game…', true);
    // Reload lets the game's existing remembered-profile path initialize every feature normally.
    window.setTimeout(() => window.location.reload(), 80);
  }

  function signIn(event) {
    event?.preventDefault();
    event?.stopImmediatePropagation();

    const name = normalizeName(byId('authUsername')?.value);
    const pin = String(byId('authPin')?.value || '').trim();

    if (name.length < 2) {
      showMessage('Player name must contain at least 2 characters.');
      return;
    }
    if (!/^\d{4,8}$/.test(pin)) {
      showMessage('PIN must contain 4–8 digits.');
      return;
    }

    const profiles = readProfiles();
    let profile = profiles.find((item) => String(item.name || '').toLowerCase() === name.toLowerCase());

    const isDeveloper = name.toLowerCase() === DEVELOPER_NAME.toLowerCase() && pin === DEVELOPER_PIN;
    if (isDeveloper) {
      if (!profile) {
        let id = profileIdFromName(DEVELOPER_NAME);
        let suffix = 2;
        while (profiles.some((item) => item.id === id)) id = `${profileIdFromName(DEVELOPER_NAME)}-${suffix++}`;
        profile = {
          id,
          name: DEVELOPER_NAME,
          pinHash: pinHash(DEVELOPER_PIN, DEVELOPER_NAME),
          createdAt: Date.now(),
          lastPlayed: Date.now()
        };
        profiles.push(profile);
        if (!localStorage.getItem(profileStorageKey(id))) {
          localStorage.setItem(profileStorageKey(id), JSON.stringify({}));
        }
      } else {
        profile.name = DEVELOPER_NAME;
        profile.pinHash = pinHash(DEVELOPER_PIN, DEVELOPER_NAME);
      }
      completeSignIn(profile, profiles);
      return;
    }

    if (!profile || profile.pinHash !== pinHash(pin, profile.name)) {
      showMessage('Player name or PIN is incorrect.');
      return;
    }

    completeSignIn(profile, profiles);
  }

  function install() {
    const button = byId('authSubmitBtn');
    if (!button || button.dataset.auth723Installed === '1') return;
    button.dataset.auth723Installed = '1';

    // Capture phase guarantees this repair runs before any stale click handler.
    button.addEventListener('click', signIn, true);
    ['authUsername', 'authPin'].forEach((id) => {
      byId(id)?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') signIn(event);
      }, true);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  } else {
    install();
  }
  window.addEventListener('load', install, { once: true });
})();
