// Copies text and reports whether it actually worked.
export async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denied or document not focused: try the legacy path.
    }
  }
  return legacyCopy(text);
}

function legacyCopy(text) {
  // A modal <dialog> makes everything outside it inert, so the helper
  // textarea has to live inside the open dialog to be selectable.
  const host = document.querySelector('dialog[open]') ?? document.body;
  const previousFocus = document.activeElement;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  Object.assign(textarea.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    opacity: '0',
    pointerEvents: 'none',
    fontSize: '16px', // avoids iOS zoom-on-focus
  });
  host.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  host.removeChild(textarea);
  if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
  return ok;
}
