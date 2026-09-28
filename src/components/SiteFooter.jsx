const linkClass = 'rounded text-fg-subtle underline-offset-4 transition-colors hover:text-fg hover:underline';

export function SiteFooter({ onAbout, onSettings, onPrivacy, onCookies }) {
  return (
    <footer className="border-t border-line-muted">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-fg-subtle">
          <span className="font-mono text-fg-muted">CmdDeck</span> v{__APP_VERSION__} · by Alessandro Attino
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <button type="button" onClick={onAbout} className={linkClass}>
              About
            </button>
          </li>
          <li>
            <button type="button" onClick={onSettings} className={linkClass}>
              Settings
            </button>
          </li>
          <li>
            <button type="button" onClick={onPrivacy} className={linkClass}>
              Privacy
            </button>
          </li>
          <li>
            <button type="button" onClick={onCookies} className={linkClass}>
              Cookies
            </button>
          </li>
          <li>
            <a href="https://github.com/aleattino/cmddeck" target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
