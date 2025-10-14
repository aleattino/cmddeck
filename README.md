# CmdDeck

> 🎴 Your deck of ready-to-use Linux commands for Ubuntu and Fedora

A modern, lightning-fast web app for browsing, searching, and copying Linux commands instantly. Built with React, Vite, and Tailwind CSS.

![CmdDeck Banner](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0-blue?style=for-the-badge)

---

## ✨ Features

- 🎯 **100+ Pre-loaded Commands** - Organized in 15+ categories
- 🔍 **Instant Search** - Quick command palette (Ctrl+K or /)
- ⭐ **Favorites & Recent** - Save your most-used commands
- 📚 **Command Workflows** - Step-by-step guides for complex tasks
- 🎨 **Beautiful UI** - Modern terminal-inspired design
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🚀 **Lightning Fast** - Pure frontend, no backend needed
- 🌓 **Terminal Theme** - Easy on the eyes with dark UI
- 📋 **One-Click Copy** - Copy any command instantly to clipboard
- 🐧 **Multi-Distro** - Ubuntu, Fedora, and universal Linux commands

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/aleattino/cmddeck.git
cd cmddeck

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.

---

## 📸 Screenshots

### Main Interface
Browse commands by category with instant search and filtering.

### Command Palette
Quick search with keyboard shortcuts (Ctrl+K or /).

### Workflows
Step-by-step command sequences for common tasks.

---

## 📚 Command Categories

| Category | Commands | Description |
|----------|----------|-------------|
| 📦 **System Info** | 8 | System information and monitoring |
| 📁 **Files & Folders** | 12 | File management and operations |
| 🔍 **Search & Find** | 6 | Finding files and content |
| 📝 **View & Edit Files** | 8 | File viewing and editing |
| ⚡ **Processes & Performance** | 10 | Process management and monitoring |
| 🌐 **Network** | 9 | Network tools and diagnostics |
| 📦 **Archives & Compression** | 7 | Archive creation and extraction |
| 👥 **Users & Permissions** | 8 | User and permission management |
| ⚙️ **System Services** | 6 | Service management |
| 📋 **System Logs** | 5 | Log viewing and analysis |
| 📦 **Flatpak** | 8 | Flatpak package management |
| 🟠 **Ubuntu Specific** | 12 | Ubuntu/Debian commands |
| 🔵 **Fedora Specific** | 10 | Fedora/RHEL commands |

Plus:
- ⭐ **Favorites** - Your starred commands
- 🕐 **Recent** - Recently copied commands

---

## 🎮 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` or `/` | Open command palette |
| `↑` `↓` | Navigate results |
| `Enter` | Copy selected command |
| `Esc` | Close dialogs |

---

## 🛠️ Tech Stack

- **[React 18](https://react.dev/)** - UI Framework
- **[Vite](https://vitejs.dev/)** - Build Tool & Dev Server
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Lucide React](https://lucide.dev/)** - Icons
- **[PostCSS](https://postcss.org/)** - CSS Processing

---

## 🎨 Key Features Explained

### 🔍 Smart Search
- Search across titles, descriptions, commands, and tags
- Real-time filtering as you type
- Case-insensitive matching
- Keyboard navigation support

### ⭐ Favorites System
- Click star icon to favorite any command
- Persistent storage in browser
- Quick access from Favorites category

### 🕐 Recent Commands
- Automatically tracks copied commands
- Shows last 10 commands
- Persists across sessions

### 📚 Workflows
- Step-by-step guides for complex operations
- Copy individual steps or entire workflow
- Difficulty indicators (beginner/intermediate/advanced)
- Real-world examples for common tasks

### 📋 Copy Functionality
- Modern Clipboard API with fallback
- Visual feedback on successful copy
- Toast notifications
- Automatic addition to recent commands

---

## 🌐 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build: `npm run build`
2. Deploy `dist/` folder
3. Or connect Git repo for auto-deployment

### Deploy to GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve from dist/ folder
```

---

## 📁 Project Structure

```
cmddeck/
├── public/              # Static assets (logos, icons)
├── src/
│   ├── data/
│   │   ├── snippets.js  # All command data
│   │   └── workflows.js # Command workflows
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.jsx         # App entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── vite.config.js       # Vite configuration
```

---

## 🤝 Contributing

Want to add more commands or workflows? Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-commands`)
3. Add your commands to `src/data/snippets.js` or `src/data/workflows.js`
4. Commit your changes (`git commit -am 'Add new commands'`)
5. Push to the branch (`git push origin feature/new-commands`)
6. Open a Pull Request

### Adding New Commands

Edit `src/data/snippets.js`:

```javascript
export const snippetsData = {
  "Your Category": [
    {
      title: "Command Title",
      command: "your-command --flags",
      description: "Clear explanation of what this command does"
    }
  ]
};
```

### Adding Workflows

Edit `src/data/workflows.js`:

```javascript
{
  id: "unique-id",
  title: "Workflow Title",
  description: "What this workflow accomplishes",
  difficulty: "beginner", // or "intermediate", "advanced"
  icon: "Save", // Lucide icon name
  steps: [
    {
      title: "Step 1",
      description: "What this step does",
      command: "command to execute"
    }
  ]
}
```

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea? Please open an issue on GitHub!

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Alessandro Attino

---

## 💡 Inspiration

Built for Linux users who:
- Forget commands all the time (we all do!)
- Want quick access to common operations
- Need a visual reference instead of `man` pages
- Prefer a beautiful UI over terminal history

---

## 🙏 Acknowledgments

- Command reference from Ubuntu, Fedora, and Linux community documentation
- Icons by [Lucide](https://lucide.dev/)
- Ubuntu, Fedora, and Flatpak logos are property of their respective owners

---

## 📊 Stats

- **100+ Commands** across 15+ categories
- **10+ Workflows** for common tasks
- **Pure Frontend** - No server required
- **Offline Ready** - After first load
- **0 Dependencies** at runtime (all bundled)

---

**Made with ❤️ by Alessandro Attino**

⭐ Star this repo if you find it useful!
