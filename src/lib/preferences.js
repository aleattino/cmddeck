import { createContext, useContext } from 'react';
import { readJSON } from './storage';

export const PREFERENCES_KEY = 'cmddeckPreferences';

// Sections of the Settings window, also used as ?settings=<id> in the URL.
export const SETTINGS_SECTION_IDS = ['system', 'commands', 'appearance', 'data', 'privacy', 'shortcuts', 'about'];

export const DEFAULT_PREFERENCES = {
  confirmDanger: false,
  explanationsOpen: false,
  density: 'comfortable', // 'comfortable' | 'compact'
  motion: 'system', // 'system' | 'on' | 'off'
  textSize: 'default', // 'default' | 'large'
};

const CHOICES = {
  density: ['comfortable', 'compact'],
  motion: ['system', 'on', 'off'],
  textSize: ['default', 'large'],
};

// Unknown or malformed values fall back to the defaults one by one.
export function sanitizePreferences(value) {
  const result = { ...DEFAULT_PREFERENCES };
  if (!value || typeof value !== 'object') return result;
  for (const key of ['confirmDanger', 'explanationsOpen']) {
    if (typeof value[key] === 'boolean') result[key] = value[key];
  }
  for (const [key, allowed] of Object.entries(CHOICES)) {
    if (allowed.includes(value[key])) result[key] = value[key];
  }
  return result;
}

export const loadPreferences = () => sanitizePreferences(readJSON(PREFERENCES_KEY, null));

export const PreferencesContext = createContext(DEFAULT_PREFERENCES);

export const usePreferences = () => useContext(PreferencesContext);
