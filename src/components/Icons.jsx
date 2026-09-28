import { forwardRef } from 'react';
import { adwaita } from '../icons/adwaita';

// Adwaita symbolic icons, the GNOME desktop's own set. They're drawn on a
// 16px pixel grid, so they render at 16px (or 32px) and nothing in between.
const Icon = forwardRef(function Icon({ name, size = 16, className = '', ...rest }, ref) {
  const px = size >= 24 ? 32 : 16;
  return (
    <svg
      ref={ref}
      width={px}
      height={px}
      viewBox="0 0 16 16"
      fill="currentColor"
      focusable="false"
      aria-hidden={rest['aria-label'] ? undefined : 'true'}
      className={`shrink-0 ${className}`}
      {...rest}
      // Static markup from our own generated icon file, never user input.
      dangerouslySetInnerHTML={{ __html: adwaita[name] }}
    />
  );
});

function named(name, displayName) {
  const Component = forwardRef((props, ref) => <Icon ref={ref} name={name} {...props} />);
  Component.displayName = displayName;
  return Component;
}

export const AppearanceIcon = named('preferences-color', 'AppearanceIcon');
export const ArchiveIcon = named('media-zip', 'ArchiveIcon');
export const BackIcon = named('go-previous', 'BackIcon');
export const BackupIcon = named('drive-multidisk', 'BackupIcon');
export const CheckIcon = named('object-select', 'CheckIcon');
export const ChevronDownIcon = named('pan-down', 'ChevronDownIcon');
export const CloseIcon = named('window-close', 'CloseIcon');
export const ComputerIcon = named('computer', 'ComputerIcon');
export const CopyIcon = named('edit-copy', 'CopyIcon');
export const DangerIcon = named('dialog-error', 'DangerIcon');
export const DiskIcon = named('drive-harddisk', 'DiskIcon');
export const EditIcon = named('document-edit', 'EditIcon');
export const FolderIcon = named('folder', 'FolderIcon');
export const ForwardIcon = named('go-next', 'ForwardIcon');
export const GaugeIcon = named('power-profile-performance', 'GaugeIcon');
export const GridIcon = named('view-grid', 'GridIcon');
export const ImportantIcon = named('emblem-important', 'ImportantIcon');
export const InfoIcon = named('help-about', 'InfoIcon');
export const KeyboardIcon = named('input-keyboard', 'KeyboardIcon');
export const LinkIcon = named('insert-link', 'LinkIcon');
export const LockIcon = named('changes-prevent', 'LockIcon');
export const LogIcon = named('view-list-bullet', 'LogIcon');
export const NetworkActivityIcon = named('network-transmit-receive', 'NetworkActivityIcon');
export const PackageIcon = named('package-x-generic', 'PackageIcon');
export const PrivacyIcon = named('preferences-system-privacy', 'PrivacyIcon');
export const QuestionIcon = named('dialog-question', 'QuestionIcon');
export const RecentIcon = named('document-open-recent', 'RecentIcon');
export const RevertIcon = named('document-revert', 'RevertIcon');
export const SearchIcon = named('system-search', 'SearchIcon');
export const ServicesIcon = named('system-run', 'ServicesIcon');
export const SettingsIcon = named('emblem-system', 'SettingsIcon');
export const ShieldIcon = named('security-high', 'ShieldIcon');
export const StarIcon = named('starred', 'StarIcon');
export const StarOutlineIcon = named('non-starred', 'StarOutlineIcon');
export const TerminalIcon = named('utilities-terminal', 'TerminalIcon');
export const TextEditorIcon = named('accessories-text-editor', 'TextEditorIcon');
export const TrashIcon = named('user-trash', 'TrashIcon');
export const UndoIcon = named('edit-undo', 'UndoIcon');
export const UsersIcon = named('system-users', 'UsersIcon');
export const WarningIcon = named('dialog-warning', 'WarningIcon');
export const WifiIcon = named('network-wireless', 'WifiIcon');
export const WorkflowIcon = named('view-list-ordered', 'WorkflowIcon');
