const LOGOS = {
  ubuntu: { src: '/128px-Ubuntu-logo-no-wordmark-solid-o-2022.svg.png', name: 'Ubuntu' },
  fedora: { src: '/128px-Fedora_icon_(2021).svg.png', name: 'Fedora' },
  arch: { src: '/128px-Arch_Linux__Crystal__icon.svg.png', name: 'Arch Linux' },
  flatpak: { src: '/flatpak.svg', name: 'Flatpak' },
};

// Decorative by default: every logo sits next to a text label.
export function DistroLogo({ distro, size = 16, className = '', label = false }) {
  const logo = LOGOS[distro];
  if (!logo) return null;
  return (
    <img
      src={logo.src}
      alt={label ? logo.name : ''}
      width={size}
      height={size}
      className={`inline-block shrink-0 ${className}`}
      decoding="async"
    />
  );
}

export const UbuntuLogo = (props) => <DistroLogo distro="ubuntu" {...props} />;
export const FedoraLogo = (props) => <DistroLogo distro="fedora" {...props} />;
export const ArchLogo = (props) => <DistroLogo distro="arch" {...props} />;
export const FlatpakLogo = (props) => <DistroLogo distro="flatpak" {...props} />;
