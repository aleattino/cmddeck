import { useId, useRef } from 'react';
import { PrivacyIcon, ShieldIcon } from './Icons';
import { Modal, ModalHeader } from './Modal';
import { PrivacyPolicy } from './legal/PrivacyPolicy';
import { CookiePolicy } from './legal/CookiePolicy';

const DOCUMENTS = {
  privacy: { title: 'Privacy Policy', icon: ShieldIcon, Body: PrivacyPolicy },
  cookies: { title: 'Cookie Policy', icon: PrivacyIcon, Body: CookiePolicy },
};

export function LegalDialog({ document: which, onClose }) {
  const titleId = useId();
  // Keep showing the last document while the window animates out.
  const last = useRef(null);
  if (which) last.current = which;
  const doc = DOCUMENTS[which ?? last.current];
  return (
    <Modal open={Boolean(which)} onClose={onClose} labelledBy={titleId} className="max-w-3xl">
      {doc && (
        <div className="flex max-h-[inherit] flex-col">
          <ModalHeader id={titleId} icon={doc.icon} title={doc.title} onClose={onClose} />
          <div className="overflow-y-auto px-5 py-5 sm:px-6">
            <doc.Body />
          </div>
        </div>
      )}
    </Modal>
  );
}
