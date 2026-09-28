export const DISTROS = ['ubuntu', 'fedora', 'arch'];

export const DISTRO_LABELS = {
  ubuntu: 'Ubuntu/Debian',
  fedora: 'Fedora/RHEL',
  arch: 'Arch Linux',
};

// Returns a distro id, 'unknown' for Linux without a recognizable distro,
// or 'not-linux' for everything else (macOS, Windows, iOS, Android, ChromeOS).
export function detectOS() {
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.userAgentData?.platform ?? navigator.platform ?? '').toLowerCase();

  if (/android|iphone|ipad|ipod|cros/.test(ua)) return 'not-linux';
  if (/mac|win/.test(platform) || /mac os|macintosh|windows/.test(ua)) return 'not-linux';

  if (platform.includes('linux') || ua.includes('linux')) {
    if (ua.includes('ubuntu') || ua.includes('debian')) return 'ubuntu';
    if (ua.includes('fedora') || ua.includes('red hat')) return 'fedora';
    if (/\barch\b/.test(ua)) return 'arch';
    return 'unknown';
  }
  return 'not-linux';
}

export const isMac = () => /mac|iphone|ipad/i.test(navigator.userAgentData?.platform ?? navigator.platform ?? '');

export const modKeyLabel = () => (isMac() ? '⌘' : 'Ctrl');
