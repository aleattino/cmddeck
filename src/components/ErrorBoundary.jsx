import { Component } from 'react';

// Last line of defense: a readable page with a way out instead of a blank screen.
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error('CmdDeck crashed', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 text-center">
        <p className="font-mono text-lg font-bold text-accent">
          <span className="text-fg-muted">&gt;</span> CmdDeck
        </p>
        <h1 className="mt-4 text-xl font-semibold text-fg">Something went wrong</h1>
        <p className="mt-2 text-sm text-fg-muted">
          Reload the page to try again. If it keeps happening, resetting CmdDeck’s saved data in this browser usually
          fixes it.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="h-9 rounded-md border border-line bg-surface-raised px-4 text-sm font-medium text-fg hover:border-fg-subtle"
          >
            Reload
          </button>
          <button
            type="button"
            onClick={() => {
              try {
                Object.keys(window.localStorage)
                  .filter((key) => (key.startsWith('cmddeck') || key === 'selectedOS') && key !== 'cmddeckCookieConsent')
                  .forEach((key) => window.localStorage.removeItem(key));
              } catch {
                // Storage blocked: nothing to reset.
              }
              window.location.reload();
            }}
            className="h-9 rounded-md px-4 text-sm font-medium text-fg-muted hover:text-fg"
          >
            Reset saved data
          </button>
        </div>
      </main>
    );
  }
}
