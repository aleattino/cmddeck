# GitHub Gist Setup for Live Data

CmdDeck v1.3.0 supports loading command data from a GitHub Gist, allowing you to update commands without redeploying the application.

## 📋 Setup Instructions

### 1. Create a GitHub Gist

1. Go to https://gist.github.com/
2. Sign in with your GitHub account
3. Create a new Gist with these details:
   - **Filename**: `snippets.json`
   - **Description**: "CmdDeck Commands Data - Live version"
   - **Visibility**: Public (so the app can fetch it)

### 2. Prepare the JSON Data

The Gist should contain your `snippetsData` object in JSON format. Here's the structure:

```json
{
  "Package Management": [
    {
      "title": "Update package list",
      "description": "Refreshes the list of available software packages...",
      "variants": {
        "ubuntu": "sudo apt update",
        "fedora": "sudo dnf check-update",
        "arch": "sudo pacman -Sy"
      }
    }
  ],
  "Search & Find": [
    {
      "title": "Find files by name",
      "description": "Searches for files matching a pattern...",
      "command": "find ~ -name \"*.txt\"",
      "interactive": true,
      "inputs": [
        { "label": "Search pattern", "placeholder": "*.txt", "param": "pattern" },
        { "label": "Start directory", "placeholder": "~", "param": "directory" }
      ],
      "commandTemplate": "FUNCTION_PLACEHOLDER",
      "explanation": {
        "parts": [
          { "text": "find", "description": "Command to search for files..." },
          { "text": "~", "description": "Starting directory..." }
        ]
      }
    }
  ]
}
```

**⚠️ Important Notes:**
- Functions like `commandTemplate` cannot be serialized to JSON
- You'll need to handle these in the app code or use string templates
- For now, the app will use local data for interactive commands and load static commands from Gist

### 3. Get the Raw URL

After creating the Gist:
1. Click the "Raw" button on your Gist
2. Copy the URL (it will look like: `https://gist.githubusercontent.com/USERNAME/GIST_ID/raw/snippets.json`)
3. Update `App.jsx` with your Gist URL:

```javascript
const GIST_URL = 'https://gist.githubusercontent.com/USERNAME/YOUR_GIST_ID/raw/snippets.json';
```

### 4. Test the Integration

1. Run your app: `npm run dev`
2. Open the browser console
3. Look for one of these messages:
   - ✅ "Loaded commands from GitHub Gist" - Success!
   - ℹ️ "Using local data (Gist not available)" - Fallback to local data

## 🔄 Updating Commands

To update commands after deployment:

1. Go to your Gist on GitHub
2. Click "Edit"
3. Modify the JSON data
4. Click "Update public gist"
5. Users will get the new data on next page refresh (no app rebuild needed!)

## 🎯 Current Limitations

### Interactive Commands
Commands with `commandTemplate` functions cannot be stored in JSON. These will continue to use local data:
- grep with custom inputs
- find with custom parameters
- tar with custom archive names

### Solution Options

**Option 1: String Templates (Recommended)**
Replace function templates with string templates and parse them in the app:

```json
{
  "commandTemplate": "find ${directory} -name \"${pattern}\""
}
```

Then in the app:
```javascript
const command = snippet.commandTemplate
  .replace('${directory}', params.directory || '~')
  .replace('${pattern}', params.pattern || '*.txt');
```

**Option 2: Hybrid Approach (Current)**
- Load static commands from Gist
- Keep interactive commands in local code
- Best for maintaining functionality while enabling live updates

**Option 3: API Backend**
- Create a simple API that returns JavaScript (not JSON)
- Can include functions and complex logic
- More complex but most flexible

## 📝 Example Gist Content

Here's a minimal example to get started:

```json
{
  "System Info": [
    {
      "title": "Show system information",
      "description": "Displays your operating system, kernel version, and architecture.",
      "command": "uname -a"
    },
    {
      "title": "Check system uptime",
      "description": "Shows how long your system has been running.",
      "command": "uptime"
    }
  ],
  "Files & Folders": [
    {
      "title": "List all files",
      "description": "Shows all files including hidden ones.",
      "command": "ls -la"
    }
  ]
}
```

## 🚀 Benefits

- ✅ Update commands without redeploying
- ✅ Fix typos instantly
- ✅ Add new commands quickly
- ✅ A/B test different descriptions
- ✅ Community contributions via Gist edits
- ✅ Version control through Gist history

## 🛡️ Fallback Strategy

The app is designed to gracefully handle Gist failures:

1. **Gist Available**: Load from Gist, use fresh data
2. **Gist Unavailable**: Use local data, app works normally
3. **Gist Malformed**: Catch error, fallback to local data

Users always get a working app! 🎉

## 📚 Resources

- [GitHub Gist Documentation](https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JSON.stringify() for testing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

---

**Need Help?** Open an issue on the CmdDeck repository!

