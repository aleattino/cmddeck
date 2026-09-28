// Legal copy. Keep the effective date in sync with any change to the text.
export function CookiePolicy() {
  return (
    <div className="space-y-5 text-sm leading-relaxed text-fg-muted">
      <p className="text-fg">
        <strong className="font-semibold text-fg">Effective Date:</strong> September 28, 2026
      </p>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">1. What Are Cookies and Similar Technologies</h3>
        <p>
          Cookies are small text files stored on your device when you visit a website. We also use localStorage,
          a browser technology that stores data locally on your device. Both help remember your preferences and improve your experience.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">2. Categories of Cookies</h3>

        <div className="mb-3 rounded-lg border border-line-muted bg-surface-sunken/60 p-4">
          <h4 className="mb-2 font-semibold text-fg">A. Strictly Necessary (No Consent Required)</h4>
          <p className="mb-2 text-sm">
            Essential for app functionality. Stored in localStorage (not cookies). Legal basis: Legitimate interest (Art. 6(1)(f) GDPR).
          </p>
          <table className="w-full text-xs mt-2">
            <thead className="border-b border-line">
              <tr>
                <th className="py-1.5 pr-3 text-left font-medium text-fg">Name</th>
                <th className="py-1.5 pr-3 text-left font-medium text-fg">Purpose</th>
                <th className="py-1.5 pr-3 text-left font-medium text-fg">Duration</th>
              </tr>
            </thead>
            <tbody className="text-fg-muted">
              <tr className="border-b border-line-muted">
                <td className="py-1.5 pr-3 align-top"><code className="font-mono text-fg">cmddeckFavorites</code></td>
                <td className="py-1.5 pr-3 align-top">Store starred commands</td>
                <td className="py-1.5 pr-3 align-top">Persistent</td>
              </tr>
              <tr className="border-b border-line-muted">
                <td className="py-1.5 pr-3 align-top"><code className="font-mono text-fg">cmddeckRecent</code></td>
                <td className="py-1.5 pr-3 align-top">Store recent commands</td>
                <td className="py-1.5 pr-3 align-top">Persistent</td>
              </tr>
              <tr className="border-b border-line-muted">
                <td className="py-1.5 pr-3 align-top"><code className="font-mono text-fg">selectedOS</code></td>
                <td className="py-1.5 pr-3 align-top">Remember OS choice</td>
                <td className="py-1.5 pr-3 align-top">Persistent</td>
              </tr>
              <tr className="border-b border-line-muted">
                <td className="py-1.5 pr-3 align-top"><code className="font-mono text-fg">cmddeckPreferences</code></td>
                <td className="py-1.5 pr-3 align-top">Remember your Settings (motion, text size, card density and similar)</td>
                <td className="py-1.5 pr-3 align-top">Persistent</td>
              </tr>
              <tr className="border-b border-line-muted">
                <td className="py-1.5 pr-3 align-top"><code className="font-mono text-fg">cmddeckWorkflowProgress</code></td>
                <td className="py-1.5 pr-3 align-top">Remember which workflow steps you marked as done</td>
                <td className="py-1.5 pr-3 align-top">Persistent</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3 align-top"><code className="font-mono text-fg">cmddeckCookieConsent</code></td>
                <td className="py-1.5 pr-3 align-top">Store consent choice</td>
                <td className="py-1.5 pr-3 align-top">Persistent</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-line-muted bg-surface-sunken/60 p-4">
          <h4 className="mb-2 font-semibold text-fg">B. Analytics Cookies (Consent Required)</h4>
          <p className="mb-2 text-sm">
            Used only with your explicit consent. Legal basis: Consent (Art. 6(1)(a) GDPR).
          </p>
          <table className="w-full text-xs mt-2">
            <thead className="border-b border-line">
              <tr>
                <th className="py-1.5 pr-3 text-left font-medium text-fg">Name</th>
                <th className="py-1.5 pr-3 text-left font-medium text-fg">Provider</th>
                <th className="py-1.5 pr-3 text-left font-medium text-fg">Purpose</th>
                <th className="py-1.5 pr-3 text-left font-medium text-fg">Duration</th>
              </tr>
            </thead>
            <tbody className="text-fg-muted">
              <tr className="border-b border-line-muted">
                <td className="py-1.5 pr-3 align-top"><code className="font-mono text-fg">_ga</code></td>
                <td className="py-1.5 pr-3 align-top">Google</td>
                <td className="py-1.5 pr-3 align-top">Distinguish users</td>
                <td className="py-1.5 pr-3 align-top">2 years</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3 align-top"><code className="font-mono text-fg">_ga_*</code></td>
                <td className="py-1.5 pr-3 align-top">Google</td>
                <td className="py-1.5 pr-3 align-top">Persist session state</td>
                <td className="py-1.5 pr-3 align-top">2 years</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-xs text-fg-subtle">
            Data is transmitted to Google LLC (USA) under EU-US Data Privacy Framework adequacy decision.
          </p>
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">3. Your Consent</h3>
        <p className="mb-2">
          When you first visit CmdDeck, you&apos;ll see a cookie banner with two options:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li><strong className="font-semibold text-fg">Accept:</strong> Enables analytics cookies; we can track usage to improve the app</li>
          <li><strong className="font-semibold text-fg">Decline:</strong> Disables analytics cookies; only essential localStorage is used</li>
        </ul>
        <p className="text-sm text-fg-muted mt-2">
          You can change or withdraw your choice at any time in <strong className="font-semibold text-fg">Settings → Privacy</strong>. Declining removes the Google Analytics cookies from this site. Google Analytics is only loaded after you accept.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">4. How to Manage Cookies</h3>
        <div className="space-y-2">
          <div>
            <p className="mb-1 font-semibold text-fg">Browser Settings:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
              <li>Firefox: Settings → Privacy & Security → Cookies and Site Data</li>
              <li>Safari: Preferences → Privacy → Manage Website Data</li>
              <li>Edge: Settings → Cookies and site permissions</li>
            </ul>
          </div>
          <div>
            <p className="mb-1 font-semibold text-fg">Google Analytics Opt-out:</p>
            <p className="text-sm ml-4">
              Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 hover:decoration-accent">Google Analytics Opt-out Browser Add-on</a>
            </p>
          </div>
        </div>
        <p className="text-xs text-fg-subtle mt-3">
          Note: Blocking strictly necessary localStorage may prevent the app from functioning properly.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">5. Third-Party Cookies</h3>
        <p className="mb-2">
          We use Google Analytics 4 (Google LLC). Google may set cookies according to their policies:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
          <li><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 hover:decoration-accent">Google Cookie Policy</a></li>
          <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 hover:decoration-accent">Google Privacy Policy</a></li>
          <li><a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 hover:decoration-accent">Google Analytics Data Usage</a></li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">6. Updates to This Policy</h3>
        <p>
          We may update this Cookie Policy to reflect changes in technology, legal requirements, or our practices.
          Updates will be indicated by the effective date at the top of this page.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">7. Contact</h3>
        <p>
          For questions about our use of cookies, please contact us via the{' '}
          <a href="https://github.com/aleattino/cmddeck/issues" target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 hover:decoration-accent">GitHub repository</a>.
        </p>
      </section>
    </div>
  );
}
