// Legal copy. Keep the effective date in sync with any change to the text.
export function PrivacyPolicy() {
  return (
    <div className="space-y-5 text-sm leading-relaxed text-fg-muted">
      <p className="text-fg">
        <strong className="font-semibold text-fg">Effective Date:</strong> September 28, 2026
      </p>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">1. Data Controller</h3>
        <p>
          This application is operated by an individual developer. For inquiries regarding your personal data,
          please contact us via the <a href="https://github.com/aleattino/cmddeck" target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 hover:decoration-accent">GitHub repository</a>.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">2. Legal Basis for Processing</h3>
        <p>
          We process your data based on the following legal grounds under GDPR:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
          <li><strong className="font-semibold text-fg">Legitimate Interest</strong> (Art. 6(1)(f) GDPR) - For essential app functionality stored locally</li>
          <li><strong className="font-semibold text-fg">Consent</strong> (Art. 6(1)(a) GDPR) - For analytics cookies and tracking</li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">3. Data We Collect</h3>

        <div className="mb-3">
          <p className="mb-1 font-semibold text-fg">3.1 Essential Data (No Consent Required)</p>
          <p className="text-sm mb-2">Stored locally in your browser via localStorage:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
            <li>Favorite commands</li>
            <li>Recently used commands</li>
            <li>Workflow steps you marked as done</li>
            <li>Your Settings choices</li>
            <li>Operating system preference</li>
            <li>Cookie consent choice</li>
          </ul>
          <p className="text-xs text-fg-subtle mt-2">This data never leaves your device and is essential for app functionality.</p>
        </div>

        <div>
          <p className="mb-1 font-semibold text-fg">3.2 Analytics Data (Requires Consent)</p>
          <p className="text-sm mb-2">Collected via Google Analytics only if you accept cookies:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
            <li>Page views and session duration</li>
            <li>Browser type and device information</li>
            <li>Approximate geographic location (country/region level)</li>
            <li>User interactions with features</li>
            <li>Referral source</li>
          </ul>
          <p className="text-xs text-fg-subtle mt-2">IP addresses are anonymized. No personally identifiable information is collected.</p>
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">4. How We Use Your Data</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li><strong className="font-semibold text-fg">Essential Data:</strong> To provide core app functionality (favorites, recent commands, preferences)</li>
          <li><strong className="font-semibold text-fg">Analytics Data:</strong> To understand usage patterns and improve user experience</li>
        </ul>
        <p className="text-sm text-fg-muted mt-2">
          We do not sell, rent, or share your data with third parties except as described in this policy.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">5. Data Storage and Retention</h3>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li><strong className="font-semibold text-fg">Local Storage:</strong> Stored indefinitely in your browser until manually cleared</li>
          <li><strong className="font-semibold text-fg">Google Analytics:</strong> Retained for 14 months, then automatically deleted</li>
        </ul>
        <p className="text-sm text-fg-muted mt-2">
          No data is stored on our servers. All preference data remains exclusively on your device.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">6. Third-Party Services</h3>
        <p className="mb-2">
          We use <strong className="font-semibold text-fg">Google Analytics</strong> (Google LLC, USA) for usage statistics. Google is certified under the
          EU-US Data Privacy Framework.
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
          <li>Service: Google Analytics 4</li>
          <li>Purpose: Website analytics and improvement</li>
          <li>Legal Basis: Your explicit consent</li>
          <li>Data Transfer: To USA (adequacy decision)</li>
          <li>Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 hover:decoration-accent">Google Privacy Policy</a></li>
          <li>Opt-out: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 hover:decoration-accent">Google Analytics Opt-out</a></li>
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">7. Your Rights Under GDPR</h3>
        <p className="mb-2">As an EU resident, you have the following rights:</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li><strong className="font-semibold text-fg">Right of Access</strong> (Art. 15 GDPR) - Request information about your data</li>
          <li><strong className="font-semibold text-fg">Right to Rectification</strong> (Art. 16 GDPR) - Correct inaccurate data</li>
          <li><strong className="font-semibold text-fg">Right to Erasure</strong> (Art. 17 GDPR) - Request deletion of your data</li>
          <li><strong className="font-semibold text-fg">Right to Restriction</strong> (Art. 18 GDPR) - Limit data processing</li>
          <li><strong className="font-semibold text-fg">Right to Data Portability</strong> (Art. 20 GDPR) - Receive your data in portable format</li>
          <li><strong className="font-semibold text-fg">Right to Object</strong> (Art. 21 GDPR) - Object to data processing</li>
          <li><strong className="font-semibold text-fg">Right to Withdraw Consent</strong> - Revoke consent at any time</li>
        </ul>
        <p className="text-sm text-fg-muted mt-2">
          To exercise these rights, contact us via GitHub. You can withdraw analytics consent at any time in Settings → Privacy, and clear local data from your browser settings.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">8. Data Security</h3>
        <p>
          We implement appropriate technical measures to protect your data. Local data is stored in your browser&apos;s
          secure storage. Analytics data is transmitted over encrypted connections (HTTPS/TLS).
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">9. Children&apos;s Privacy</h3>
        <p>
          This service is not directed to persons under 16 years of age. We do not knowingly collect data from children.
          If you believe a child has provided us with personal data, please contact us immediately.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">10. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy to reflect changes in practices or legal requirements.
          Material changes will be indicated by updating the effective date. Your continued use constitutes acceptance of changes.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">11. Supervisory Authority</h3>
        <p>
          You have the right to lodge a complaint with your local data protection authority if you believe
          your data protection rights have been violated.
        </p>
      </section>

      <section>
        <h3 className="mb-2 text-base font-semibold text-fg">12. Contact</h3>
        <p>
          For questions, concerns, or to exercise your rights regarding this Privacy Policy, contact us through the{' '}
          <a href="https://github.com/aleattino/cmddeck/issues" target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 hover:decoration-accent">GitHub repository</a>.
        </p>
      </section>
    </div>
  );
}
