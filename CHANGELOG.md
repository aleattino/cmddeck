# Changelog

All notable changes to CmdDeck will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.2] - 2025-11-13

### 🎉 Added
- **60+ Interactive Commands** - Massive expansion of customizable commands
  - Added interactive support to Flatpak commands (5 commands)
  - Added interactive support to Ubuntu Specific (apt, snap - 6 commands)
  - Added interactive support to Fedora Specific (dnf - 4 commands)
  - Added interactive support to Users & Permissions (5 commands)
  - Added interactive support to Package Management multi-distro commands (4 commands)
  - Total: 60+ commands now support customization

### ✨ Improved
- **Cleaner UI** - Removed redundant "Interactive" badge
  - Badge was using same icon as other features
  - Customize button is sufficient visual indicator
  - Improved visual consistency across all cards
  
- **Package Management Cards** - Now support interactive customization
  - Added state management for input values
  - Added "Customize Command" button
  - Commands adapt to selected distro (Ubuntu/Fedora/Arch)
  - Modal generates correct command for each distribution

### 🔧 Technical
- Changed customize icon from `CommandIcon` to `Sliders` for better semantics
- Enhanced `PackageManagementCard` component with interactive support
- Added `commandTemplate` with distro parameter for multi-distro commands

---

## [1.3.1] - 2025-11-13

### ✨ Improved
- **Command Customization UX** - Moved interactive inputs to modal
  - Replaced inline input fields with "Customize Command" button
  - All command cards now have consistent height
  - Cleaner, more professional appearance
  - Modal provides better space for input fields and command preview
  - Purple-themed customization modal with Cancel/Copy buttons
  
### 🐛 Fixed
- Fixed card height inconsistency between interactive and non-interactive commands
- Improved visual balance in command grid layout

---

## [1.3.0] - 2025-11-13

### 🎉 Added
- **Interactive Command Builder** - Transform static commands into customizable tools
  - Real-time input fields for commands with placeholders
  - Dynamic command generation as you type
  - Works with grep, find, tar, locate and more
  - Purple "Interactive" badge to identify customizable commands
  - Preserves default values if inputs are left empty
  
- **Command Explanation System** - Learn what each command does
  - Blue info icon (?) next to commands with explanations
  - Interactive modal breaking down command parts
  - Detailed descriptions for each flag and parameter
  - Educational tooltips for safer command usage
  - Currently available for: grep, find, tar commands (more coming!)
  
- **Live Data from GitHub Gist** - Dynamic content updates without redeployment
  - Commands loaded from GitHub Gist on app start
  - Fallback to local data if Gist unavailable
  - Update commands by editing Gist (no rebuild needed)
  - Console logging for data source transparency
  - Seamless user experience during loading

### ✨ Improved
- **Enhanced Command Cards** - Better visual hierarchy and functionality
  - New icon system for interactive and explained commands
  - Improved spacing for input fields
  - Better mobile responsiveness for interactive elements
  - Cleaner layout with organized badges
  
- **User Experience** - More intuitive and educational
  - Commands now teach users instead of just providing copy-paste
  - Interactive inputs reduce errors from manual editing
  - Explanations promote understanding over blind copying
  - Better feedback with emoji indicators (🛠️ for customization, 🎓 for learning)

### 📦 Technical
- Added `HelpCircle` icon from lucide-react
- New `CommandExplanationModal` component
- Enhanced `SnippetCard` with state management for inputs
- `useMemo` hook for efficient command generation
- `useEffect` hook for Gist data fetching
- Extended data structure with `interactive`, `inputs`, `commandTemplate`, and `explanation` fields
- Version bumped in both `package.json` and About modal

### 🔧 Data Structure Changes
```javascript
{
  interactive: true,
  inputs: [{ label, placeholder, param }],
  commandTemplate: (params) => `command ${params.param}`,
  explanation: {
    parts: [{ text, description }]
  }
}
```

---

## [1.2.0] - 2025-10-15

### 🎉 Added
- **Google Analytics Integration** - Tracks usage patterns to improve UX
  - Analytics ID: G-Y6ELJY9QCF
  - Only active after user consent
  - IP anonymization by default until consent
- **GDPR Cookie Consent Banner** - Full compliance with privacy regulations
  - Accept/Decline options
  - Persistent preference storage
  - Respects user choice for analytics
- **Privacy Policy Modal** - Comprehensive privacy documentation
  - Details on data collection and usage
  - Third-party services disclosure
  - User rights and contact information
- **Cookie Policy Modal** - Transparent cookie usage information
  - Essential vs optional cookies breakdown
  - Management instructions
  - Third-party cookie policies
- **Footer Menu System** - Organized access to legal/info pages
  - About CmdDeck
  - Privacy Policy
  - Cookie Policy
  - Dropdown menu design with keyboard support (Esc to close)

### 🔧 Improved
- **Footer Navigation** - Replaced single info button with comprehensive menu
- **Modal System** - Consistent close behavior with Esc key
- **User Experience** - Clear consent flow on first visit
- **Accessibility** - Keyboard navigation for all modals and menus

### 📄 Legal
- Added comprehensive Privacy Policy (effective Oct 15, 2025)
- Added detailed Cookie Policy (effective Oct 15, 2025)
- GDPR-compliant consent management
- Transparent data collection practices

---

## [1.1.1] - 2025-10-15

### 🐛 Fixed
- **OS Detection** - Fixed macOS/Windows detection not showing "Not on Linux" correctly
  - Improved platform detection with more reliable checks
  - macOS and Windows now correctly detected before Linux checks
  - Fixed localStorage caching causing incorrect OS display
  - Removed debug console.log statements for production
- **UI Display** - Fixed OS selector showing wrong distro for non-Linux systems
  - Non-Linux users now see "Not on Linux - Select target" in yellow
  - Commands still default to Ubuntu for better UX
  - Manual selection properly saved to localStorage

---

## [1.1.0] - 2025-10-15

### 🎉 Added
- **OS Detection System** - Automatically detects macOS, Windows, or Linux
  - Manual override dropdown to select target distribution
  - Remembers your choice in localStorage
  - Shows "Not on Linux - Select target" for non-Linux systems
- **Package Management Category** - New multi-distro package management commands
  - 8 essential package commands (update, upgrade, install, remove, search, etc.)
  - Tab-based distro selector (Ubuntu/Debian, Fedora/RHEL, Arch)
  - Real-time command switching based on selected distribution
- **Safety Badge System** - Visual warnings for dangerous commands
  - 🔴 DANGER badges for destructive commands (rm -rf, sudo su -)
  - 🟡 CAUTION badges for commands requiring attention (kill -9, chmod, chown)
  - Badges visible in cards and command palette
- **5 New Essential Workflows**
  - Debug Port Already in Use (5 steps)
  - Git Disaster Recovery (6 steps)
  - Setup New Server (8 steps)
  - Network Troubleshooting (7 steps)
  - Clean Up Disk Space (10 steps, expanded from original)
- **Distribution Logos**
  - Real Ubuntu, Fedora, and Arch Linux logos
  - Flatpak logo for Flatpak category
  - Terminal icon for Generic Linux

### ✨ Improved
- **Command Descriptions** - Enhanced ~50 command descriptions
  - Added practical context and use cases
  - Explained command flags and options
  - Standardized formatting (30-60 words each)
  - Better examples and warnings
- **UI/UX Enhancements**
  - Fixed rubber band scrolling background on macOS/Safari
  - Better keyboard shortcut handling (Ctrl+K toggle)
  - Improved modal close behavior (ESC closes all modals)
  - Better visual hierarchy in OS selector dropdown

### 🐛 Fixed
- Fixed crash when searching commands with variants
- Fixed Command Palette not handling multi-distro commands
- Fixed Favorites and Recent not working with Package Management commands
- Fixed "each child should have unique key" React warning
- Fixed backdrop appearing when palette is closed
- Fixed keyboard shortcuts interfering with typing

### 📦 Technical
- Added support for command variants in data structure
- Improved search filtering to handle both regular and variant commands
- Better null-safety checks for command properties
- Optimized re-renders with proper useEffect dependencies

---

## [1.0.0] - 2025-01-XX

### 🎉 Initial Release
- 100+ Linux commands across 13 categories
- Command search and filtering
- Favorites and Recent commands
- 6 command workflows
- Beautiful terminal-inspired UI
- Responsive design for all devices
- Command palette with keyboard shortcuts
- One-click copy to clipboard
- Ubuntu and Fedora specific commands
- Flatpak commands support

---

**Legend:**
- 🎉 Added - New features
- ✨ Improved - Enhancements to existing features
- 🐛 Fixed - Bug fixes
- 📦 Technical - Under-the-hood changes
- 🔒 Security - Security improvements
- ⚠️ Deprecated - Soon-to-be removed features
- 🗑️ Removed - Removed features

