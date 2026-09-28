import { readString, writeString } from './storage';

const GA_ID = 'G-Y6ELJY9QCF';
export const CONSENT_KEY = 'cmddeckCookieConsent';

let loaded = false;

// Development and preview traffic never reaches the production property.
function isTrackableHost() {
  const host = window.location.hostname;
  return import.meta.env.PROD && host !== 'localhost' && host !== '127.0.0.1' && !host.endsWith('.local');
}

export function getConsent() {
  const value = readString(CONSENT_KEY);
  return value === 'accepted' || value === 'declined' ? value : null;
}

export function setConsent(value) {
  writeString(CONSENT_KEY, value);
  if (value === 'accepted') loadAnalytics();
  else disableAnalytics();
}

// gtag.js is only requested after explicit consent: nothing is sent and no
// cookie is set before the visitor clicks Accept.
export function loadAnalytics() {
  if (!isTrackableHost()) return;
  window[`ga-disable-${GA_ID}`] = false;
  if (loaded) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array.
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export function disableAnalytics() {
  window[`ga-disable-${GA_ID}`] = true;
  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));
  if (names.length === 0) return;
  const parts = window.location.hostname.split('.');
  const domains = [''];
  for (let i = 0; i < parts.length - 1; i += 1) domains.push(`; domain=.${parts.slice(i).join('.')}`);
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

export function initAnalytics() {
  if (getConsent() === 'accepted') loadAnalytics();
  // Earlier versions set GA cookies before consent: clean them up for everyone else.
  else disableAnalytics();
}
