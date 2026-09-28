import { ArchiveIcon, ComputerIcon, FolderIcon, GaugeIcon, GridIcon, LogIcon, PackageIcon, RecentIcon, SearchIcon, ServicesIcon, StarIcon, TextEditorIcon, UsersIcon, WifiIcon } from '../components/Icons';
import { FedoraLogo, FlatpakLogo, UbuntuLogo } from '../components/DistroLogo';

export const categoryIcons = {
  All: GridIcon,
  Favorites: StarIcon,
  Recent: RecentIcon,
  'Package Management': PackageIcon,
  'System Info': ComputerIcon,
  'Files & Folders': FolderIcon,
  'Search & Find': SearchIcon,
  'View & Edit Files': TextEditorIcon,
  'Processes & Performance': GaugeIcon,
  Network: WifiIcon,
  'Archives & Compression': ArchiveIcon,
  'Users & Permissions': UsersIcon,
  'System Services': ServicesIcon,
  'System Logs': LogIcon,
  Flatpak: FlatpakLogo,
  'Ubuntu Specific': UbuntuLogo,
  'Fedora Specific': FedoraLogo,
};
