// Package Management commands with distro variants
export const packageManagementCommands = [
  {
    title: "Update package list",
    description: "Refreshes the list of available software packages from repositories. Always run this before installing or upgrading software to ensure you get the latest versions.",
    variants: {
      ubuntu: "sudo apt update",
      fedora: "sudo dnf check-update",
      arch: "sudo pacman -Sy"
    }
  },
  {
    title: "Upgrade all software",
    description: "Updates all installed packages to their latest available versions. This keeps your system secure and up-to-date with bug fixes and new features.",
    variants: {
      ubuntu: "sudo apt upgrade -y",
      fedora: "sudo dnf upgrade -y",
      arch: "sudo pacman -Syu"
    }
  },
  {
    title: "Install a package",
    description: "Installs new software from your distribution's repositories. Replace 'package-name' with the actual name of the program you want to install.",
    variants: {
      ubuntu: "sudo apt install package-name -y",
      fedora: "sudo dnf install package-name -y",
      arch: "sudo pacman -S package-name"
    }
  },
  {
    title: "Remove a package",
    description: "Uninstalls software from your system but keeps configuration files in case you want to reinstall later.",
    variants: {
      ubuntu: "sudo apt remove package-name",
      fedora: "sudo dnf remove package-name",
      arch: "sudo pacman -R package-name"
    }
  },
  {
    title: "Search for packages",
    description: "Searches available packages matching a keyword. Useful when you know what you want but don't know the exact package name.",
    variants: {
      ubuntu: "apt search keyword",
      fedora: "dnf search keyword",
      arch: "pacman -Ss keyword"
    }
  },
  {
    title: "Show package information",
    description: "Displays detailed information about a package including version, size, dependencies, and description before installing it.",
    variants: {
      ubuntu: "apt show package-name",
      fedora: "dnf info package-name",
      arch: "pacman -Si package-name"
    }
  },
  {
    title: "Clean package cache",
    description: "Removes downloaded package files from cache to free up disk space. Safe to run as packages can be re-downloaded if needed.",
    variants: {
      ubuntu: "sudo apt clean && sudo apt autoclean",
      fedora: "sudo dnf clean all",
      arch: "sudo pacman -Sc"
    }
  },
  {
    title: "Remove unused packages",
    description: "Removes packages that were automatically installed as dependencies but are no longer needed. Helps keep system clean and saves disk space.",
    variants: {
      ubuntu: "sudo apt autoremove -y",
      fedora: "sudo dnf autoremove -y",
      arch: "sudo pacman -Qdtq | sudo pacman -Rs -"
    }
  }
];

export const snippetsData = {
  "Package Management": packageManagementCommands,
  "System Info": [
    {
      title: "Show system information",
      description: "Displays your operating system, kernel version, and architecture. Useful to know what system you're running.",
      command: "uname -a"
    },
    {
      title: "Check system uptime",
      description: "Shows how long your system has been running and current load. Good for checking system stability.",
      command: "uptime"
    },
    {
      title: "Who am I?",
      description: "Displays your current username. Helpful when switching between users.",
      command: "whoami"
    },
    {
      title: "Show my user details",
      description: "Displays your user ID (UID), group ID (GID), and all group memberships. Useful for checking permissions and troubleshooting access issues.",
      command: "id"
    },
    {
      title: "Who's logged in?",
      description: "Shows all users currently logged into the system, including their terminal and login time. Useful for checking active sessions on multi-user systems.",
      command: "who"
    },
    {
      title: "Computer name",
      description: "Shows your computer's network name (hostname). This is the name other computers see when you're on a network.",
      command: "hostname"
    },
    {
      title: "Linux version details",
      description: "Shows detailed information about your Linux distribution and version.",
      command: "cat /etc/os-release"
    }
  ],
  "Files & Folders": [
    {
      title: "List all files (detailed)",
      description: "Shows all files including hidden ones, with permissions, size, owner, and modification date.",
      command: "ls -la"
    },
    {
      title: "List files (human-readable)",
      description: "Shows files with sizes in KB, MB, GB instead of bytes. Much easier to read!",
      command: "ls -lh"
    },
    {
      title: "Where am I?",
      description: "Shows the full path of your current directory. Never get lost again!",
      command: "pwd"
    },
    {
      title: "Go home",
      description: "Takes you back to your home directory from anywhere.",
      command: "cd ~"
    },
    {
      title: "Go back",
      description: "Returns to the previous directory you were in.",
      command: "cd -"
    },
    {
      title: "Create folder structure",
      description: "Creates nested directories all at once, even if parent folders don't exist.",
      command: "mkdir -p ~/projects/my-app/src"
    },
    {
      title: "Copy file",
      description: "Makes a copy of a file to another location.",
      command: "cp source.txt destination.txt",
      interactive: true,
      inputs: [
        { label: "Source file", placeholder: "source.txt", param: "source" },
        { label: "Destination", placeholder: "destination.txt", param: "dest" }
      ],
      commandTemplate: (params) => `cp ${params.source || 'source.txt'} ${params.dest || 'destination.txt'}`
    },
    {
      title: "Copy entire folder",
      description: "Copies a directory and all its contents recursively.",
      command: "cp -r my-folder/ backup-folder/",
      interactive: true,
      inputs: [
        { label: "Source folder", placeholder: "my-folder/", param: "source" },
        { label: "Destination folder", placeholder: "backup-folder/", param: "dest" }
      ],
      commandTemplate: (params) => `cp -r ${params.source || 'my-folder/'} ${params.dest || 'backup-folder/'}`
    },
    {
      title: "Move or rename",
      description: "Moves a file to another location, or renames it if destination is in same folder.",
      command: "mv oldname.txt newname.txt",
      interactive: true,
      inputs: [
        { label: "Old name/path", placeholder: "oldname.txt", param: "old" },
        { label: "New name/path", placeholder: "newname.txt", param: "new" }
      ],
      commandTemplate: (params) => `mv ${params.old || 'oldname.txt'} ${params.new || 'newname.txt'}`
    },
    {
      title: "Delete file",
      description: "Permanently deletes a file. Be careful, there's no trash bin!",
      command: "rm filename.txt",
      dangerLevel: "caution",
      interactive: true,
      inputs: [
        { label: "Filename to delete", placeholder: "filename.txt", param: "filename" }
      ],
      commandTemplate: (params) => `rm ${params.filename || 'filename.txt'}`
    },
    {
      title: "Delete folder",
      description: "⚠️ DANGER: Deletes a directory and everything inside it recursively WITHOUT asking for confirmation. This action is irreversible!",
      command: "rm -rf folder-name/",
      dangerLevel: "danger",
      interactive: true,
      inputs: [
        { label: "Folder to delete", placeholder: "folder-name/", param: "folder" }
      ],
      commandTemplate: (params) => `rm -rf ${params.folder || 'folder-name/'}`
    },
    {
      title: "Make file executable",
      description: "Makes a script file runnable by adding execute permissions. Essential for shell scripts and programs you want to run directly (e.g., ./script.sh).",
      command: "chmod +x script.sh",
      interactive: true,
      inputs: [
        { label: "Script filename", placeholder: "script.sh", param: "script" }
      ],
      commandTemplate: (params) => `chmod +x ${params.script || 'script.sh'}`
    }
  ],
  "Search & Find": [
    {
      title: "Find files by name",
      description: "Searches for files matching a pattern in your home directory and subdirectories. Use * as wildcard (e.g., *.txt finds all text files). Case-sensitive by default.",
      command: 'find ~ -name "*.txt"',
      interactive: true,
      inputs: [
        { label: "Search pattern", placeholder: "*.txt", param: "pattern" },
        { label: "Start directory", placeholder: "~", param: "directory" }
      ],
      commandTemplate: (params) => `find ${params.directory || '~'} -name "${params.pattern || '*.txt'}"`,
      explanation: {
        parts: [
          { text: "find", description: "Command to search for files and directories in a directory hierarchy" },
          { text: "~", description: "Starting directory (~ means your home directory)" },
          { text: "-name", description: "Search by filename pattern" },
          { text: '"*.txt"', description: "Pattern to match (*.txt = all files ending with .txt)" }
        ]
      }
    },
    {
      title: "Find large files",
      description: "Locates files bigger than 100MB. Perfect for cleaning up disk space!",
      command: "find ~ -type f -size +100M",
      interactive: true,
      inputs: [
        { label: "Minimum size (e.g., 100M, 1G)", placeholder: "100M", param: "size" },
        { label: "Search directory", placeholder: "~", param: "directory" }
      ],
      commandTemplate: (params) => `find ${params.directory || '~'} -type f -size +${params.size || '100M'}`,
      explanation: {
        parts: [
          { text: "find", description: "Command to search for files" },
          { text: "~", description: "Search in home directory" },
          { text: "-type f", description: "Only find files (not directories)" },
          { text: "-size +100M", description: "Files larger than 100 megabytes" }
        ]
      }
    },
    {
      title: "Find recent files",
      description: "Shows files modified in the last 7 days. Great for tracking recent work.",
      command: "find ~ -type f -mtime -7",
      explanation: {
        parts: [
          { text: "find", description: "Command to search for files" },
          { text: "~", description: "Search in home directory" },
          { text: "-type f", description: "Only find files (not directories)" },
          { text: "-mtime -7", description: "Modified in the last 7 days" }
        ]
      }
    },
    {
      title: "Search text in files",
      description: "Recursively searches for text inside all files in current directory and subdirectories. Perfect for finding specific code, configuration values, or text content across multiple files.",
      command: 'grep -r "search text" .',
      interactive: true,
      inputs: [
        { label: "Text to search", placeholder: "search text", param: "text" },
        { label: "Directory", placeholder: ".", param: "directory" }
      ],
      commandTemplate: (params) => `grep -r "${params.text || 'search text'}" ${params.directory || '.'}`,
      explanation: {
        parts: [
          { text: "grep", description: "Command to search for text patterns in files" },
          { text: "-r", description: "Recursive - search in all subdirectories" },
          { text: '"search text"', description: "The text pattern to search for" },
          { text: ".", description: "Current directory (starting point)" }
        ]
      }
    },
    {
      title: "Search (case-insensitive)",
      description: "Recursively searches for text ignoring uppercase/lowercase differences. Useful when you're not sure about capitalization (finds 'Error', 'ERROR', and 'error').",
      command: 'grep -ri "search text" .',
      interactive: true,
      inputs: [
        { label: "Text to search", placeholder: "search text", param: "text" },
        { label: "Directory", placeholder: ".", param: "directory" }
      ],
      commandTemplate: (params) => `grep -ri "${params.text || 'search text'}" ${params.directory || '.'}`,
      explanation: {
        parts: [
          { text: "grep", description: "Command to search for text patterns" },
          { text: "-r", description: "Recursive - search in all subdirectories" },
          { text: "-i", description: "Case-insensitive - ignore uppercase/lowercase" },
          { text: '"search text"', description: "The text pattern to search for" },
          { text: ".", description: "Current directory" }
        ]
      }
    },
    {
      title: "Quick file search",
      description: "Super fast file search using pre-built database. Much faster than find but requires running 'sudo updatedb' first to index the filesystem. Database typically updates daily via cron.",
      command: "locate filename",
      interactive: true,
      inputs: [
        { label: "Filename to search", placeholder: "filename", param: "filename" }
      ],
      commandTemplate: (params) => `locate ${params.filename || 'filename'}`,
      explanation: {
        parts: [
          { text: "locate", description: "Fast file search using pre-built database" },
          { text: "filename", description: "Name or pattern to search for" }
        ]
      }
    }
  ],
  "View & Edit Files": [
    {
      title: "View file content",
      description: "Displays the entire content of a text file in the terminal. Good for small files; for large files use 'less' instead to paginate.",
      command: "cat filename.txt",
      interactive: true,
      inputs: [
        { label: "Filename", placeholder: "filename.txt", param: "filename" }
      ],
      commandTemplate: (params) => `cat ${params.filename || 'filename.txt'}`
    },
    {
      title: "View large files",
      description: "Opens large files page by page. Use arrows to scroll, 'q' to quit.",
      command: "less filename.txt",
      interactive: true,
      inputs: [
        { label: "Filename", placeholder: "filename.txt", param: "filename" }
      ],
      commandTemplate: (params) => `less ${params.filename || 'filename.txt'}`
    },
    {
      title: "View first lines",
      description: "Shows only the first 20 lines of a file. Good for quick previews.",
      command: "head -n 20 filename.txt",
      interactive: true,
      inputs: [
        { label: "Number of lines", placeholder: "20", param: "lines" },
        { label: "Filename", placeholder: "filename.txt", param: "filename" }
      ],
      commandTemplate: (params) => `head -n ${params.lines || '20'} ${params.filename || 'filename.txt'}`
    },
    {
      title: "View last lines",
      description: "Shows only the last 20 lines. Perfect for checking recent log entries.",
      command: "tail -n 20 filename.txt",
      interactive: true,
      inputs: [
        { label: "Number of lines", placeholder: "20", param: "lines" },
        { label: "Filename", placeholder: "filename.txt", param: "filename" }
      ],
      commandTemplate: (params) => `tail -n ${params.lines || '20'} ${params.filename || 'filename.txt'}`
    },
    {
      title: "Follow file changes",
      description: "Watches a file and shows new lines as they're added. Great for logs!",
      command: "tail -f /var/log/syslog",
      interactive: true,
      inputs: [
        { label: "Log file path", placeholder: "/var/log/syslog", param: "logfile" }
      ],
      commandTemplate: (params) => `tail -f ${params.logfile || '/var/log/syslog'}`
    },
    {
      title: "Edit with nano (easy)",
      description: "Opens file in nano, a beginner-friendly editor. Commands shown at bottom!",
      command: "nano filename.txt",
      interactive: true,
      inputs: [
        { label: "Filename", placeholder: "filename.txt", param: "filename" }
      ],
      commandTemplate: (params) => `nano ${params.filename || 'filename.txt'}`
    },
    {
      title: "Create or append text",
      description: "Adds a line of text to the end of a file. Creates file if it doesn't exist. Note: Use >> to append, > will overwrite the entire file!",
      command: 'echo "Hello World" >> filename.txt',
      interactive: true,
      inputs: [
        { label: "Text to add", placeholder: "Hello World", param: "text" },
        { label: "Filename", placeholder: "filename.txt", param: "filename" }
      ],
      commandTemplate: (params) => `echo "${params.text || 'Hello World'}" >> ${params.filename || 'filename.txt'}`
    },
    {
      title: "Count lines in file",
      description: "Counts and displays the number of lines in a file. Remove -l flag to also count words and characters. Useful for log analysis and code metrics.",
      command: "wc -l filename.txt",
      interactive: true,
      inputs: [
        { label: "Filename", placeholder: "filename.txt", param: "filename" }
      ],
      commandTemplate: (params) => `wc -l ${params.filename || 'filename.txt'}`
    }
  ],
  "Processes & Performance": [
    {
      title: "Show all processes",
      description: "Lists all running programs and their resource usage including CPU, memory, user, and command. Use with grep to find specific processes (e.g., ps aux | grep firefox).",
      command: "ps aux"
    },
    {
      title: "Interactive process monitor",
      description: "Real-time process viewer. Press 'q' to quit, 'k' to kill a process.",
      command: "top"
    },
    {
      title: "Better process monitor",
      description: "Htop is an enhanced process viewer with colors, mouse support, and easier navigation than 'top'. Shows CPU, memory, swap usage graphically. Must be installed separately (sudo apt install htop).",
      command: "htop"
    },
    {
      title: "Kill a process",
      description: "Forcefully terminates a running process immediately. Replace 1234 with actual Process ID. The process won't have time to save data or clean up.",
      command: "kill -9 1234",
      dangerLevel: "caution",
      interactive: true,
      inputs: [
        { label: "Process ID (PID)", placeholder: "1234", param: "pid" }
      ],
      commandTemplate: (params) => `kill -9 ${params.pid || '1234'}`
    },
    {
      title: "Kill by name",
      description: "Stops all processes matching the name. This can terminate multiple processes at once, so verify first with 'ps aux | grep name'.",
      command: "killall firefox",
      dangerLevel: "caution",
      interactive: true,
      inputs: [
        { label: "Process name", placeholder: "firefox", param: "name" }
      ],
      commandTemplate: (params) => `killall ${params.name || 'firefox'}`
    },
    {
      title: "Check memory usage",
      description: "Shows how much RAM is used and available in GB/MB format.",
      command: "free -h"
    },
    {
      title: "Check disk space",
      description: "Shows free space on all drives in human-readable format.",
      command: "df -h"
    },
    {
      title: "Folder size",
      description: "Shows how much disk space a folder and all its contents are using. The -s flag summarizes (shows total only), -h makes it human-readable (KB, MB, GB).",
      command: "du -sh /path/to/folder"
    },
    {
      title: "Top 10 largest folders",
      description: "Finds and displays the 10 largest folders in root directory, sorted by size. Perfect for identifying what's eating up disk space. The 2>/dev/null hides permission errors.",
      command: "du -sh /* 2>/dev/null | sort -rh | head -10"
    }
  ],
  "Network": [
    {
      title: "Test internet connection",
      description: "Sends 4 test packets to Google to check if internet is working. Shows response time (latency) in milliseconds and packet loss. Lower latency is better (good: <50ms, ok: 50-100ms, slow: >100ms).",
      command: "ping -c 4 google.com",
      interactive: true,
      inputs: [
        { label: "Host to ping", placeholder: "google.com", param: "host" },
        { label: "Number of packets", placeholder: "4", param: "count" }
      ],
      commandTemplate: (params) => `ping -c ${params.count || '4'} ${params.host || 'google.com'}`
    },
    {
      title: "Show my IP address",
      description: "Displays all network interfaces and their IP addresses. Look for 'inet' for IPv4 addresses. Your local IP typically starts with 192.168, 10., or 172.16-31.",
      command: "ip addr show"
    },
    {
      title: "What's using the network?",
      description: "Shows all active network connections and listening ports. Displays TCP (-t) and UDP (-u) connections in numeric format (-n) for all listening (-l) ports. Useful for finding what services are running.",
      command: "ss -tuln"
    },
    {
      title: "Download a file",
      description: "Downloads a file from the internet and saves it to current directory. Shows progress bar and download speed. Can resume interrupted downloads with -c flag.",
      command: "wget https://example.com/file.zip",
      interactive: true,
      inputs: [
        { label: "URL to download", placeholder: "https://example.com/file.zip", param: "url" }
      ],
      commandTemplate: (params) => `wget ${params.url || 'https://example.com/file.zip'}`
    },
    {
      title: "Download with curl",
      description: "Alternative download tool that's often pre-installed on systems. The -O flag saves file with original name. More versatile than wget for API calls and HTTP requests.",
      command: "curl -O https://example.com/file.zip",
      interactive: true,
      inputs: [
        { label: "URL to download", placeholder: "https://example.com/file.zip", param: "url" }
      ],
      commandTemplate: (params) => `curl -O ${params.url || 'https://example.com/file.zip'}`
    },
    {
      title: "Check website status",
      description: "Tests if a website is up and shows HTTP response code (200 = OK).",
      command: "curl -I https://example.com",
      interactive: true,
      inputs: [
        { label: "Website URL", placeholder: "https://example.com", param: "url" }
      ],
      commandTemplate: (params) => `curl -I ${params.url || 'https://example.com'}`
    },
    {
      title: "DNS lookup",
      description: "Finds the IP address of a domain name by querying DNS servers. Useful for troubleshooting DNS issues or checking if a domain is resolving correctly.",
      command: "nslookup google.com",
      interactive: true,
      inputs: [
        { label: "Domain name", placeholder: "google.com", param: "domain" }
      ],
      commandTemplate: (params) => `nslookup ${params.domain || 'google.com'}`
    },
    {
      title: "Trace network path",
      description: "Shows each hop (router) packets take to reach a destination with response times. Helps identify where network slowdowns or failures occur. Each line is one router along the path.",
      command: "traceroute google.com",
      interactive: true,
      inputs: [
        { label: "Destination host", placeholder: "google.com", param: "host" }
      ],
      commandTemplate: (params) => `traceroute ${params.host || 'google.com'}`
    }
  ],
  "Archives & Compression": [
    {
      title: "Create .tar.gz archive",
      description: "Compresses a folder into a .tar.gz file. Standard Linux backup format.",
      command: "tar -czvf backup.tar.gz ~/Documents/",
      interactive: true,
      inputs: [
        { label: "Archive name", placeholder: "backup.tar.gz", param: "archive" },
        { label: "Folder to compress", placeholder: "~/Documents/", param: "folder" }
      ],
      commandTemplate: (params) => `tar -czvf ${params.archive || 'backup.tar.gz'} ${params.folder || '~/Documents/'}`,
      explanation: {
        parts: [
          { text: "tar", description: "The program for creating archives" },
          { text: "-c", description: "create - Create a new archive" },
          { text: "-z", description: "zip - Compress it with gzip" },
          { text: "-v", description: "verbose - Show files while being processed" },
          { text: "-f", description: "file - Specify the archive filename (must be last option)" },
          { text: "backup.tar.gz", description: "Name of the archive file to create" },
          { text: "~/Documents/", description: "Folder to archive" }
        ]
      }
    },
    {
      title: "Extract .tar.gz archive",
      description: "Extracts a compressed .tar.gz file to current directory.",
      command: "tar -xzvf backup.tar.gz",
      interactive: true,
      inputs: [
        { label: "Archive to extract", placeholder: "backup.tar.gz", param: "archive" }
      ],
      commandTemplate: (params) => `tar -xzvf ${params.archive || 'backup.tar.gz'}`,
      explanation: {
        parts: [
          { text: "tar", description: "The program for extracting archives" },
          { text: "-x", description: "extract - Extract files from archive" },
          { text: "-z", description: "zip - Decompress with gzip" },
          { text: "-v", description: "verbose - Show files being extracted" },
          { text: "-f", description: "file - Specify the archive filename" },
          { text: "backup.tar.gz", description: "Archive file to extract" }
        ]
      }
    },
    {
      title: "List archive contents",
      description: "Shows what's inside an archive without extracting it.",
      command: "tar -tzvf backup.tar.gz"
    },
    {
      title: "Create ZIP file",
      description: "Creates a ZIP archive. Compatible with Windows and Mac!",
      command: "zip -r archive.zip folder-name/"
    },
    {
      title: "Extract ZIP file",
      description: "Extracts a ZIP archive to current directory.",
      command: "unzip archive.zip"
    },
    {
      title: "Extract ZIP to folder",
      description: "Extracts ZIP contents to a specific location.",
      command: "unzip archive.zip -d /destination/folder/"
    },
    {
      title: "List ZIP contents",
      description: "Shows files inside a ZIP without extracting.",
      command: "unzip -l archive.zip"
    },
    {
      title: "Compress file with gzip",
      description: "Compresses a single file. Creates filename.gz and removes original.",
      command: "gzip largefile.txt"
    },
    {
      title: "Decompress gzip file",
      description: "Decompresses a .gz file back to original.",
      command: "gunzip largefile.txt.gz"
    }
  ],
  "Users & Permissions": [
    {
      title: "Change my password",
      description: "Opens prompt to change your account password. You'll need to type it twice.",
      command: "passwd"
    },
    {
      title: "Switch to another user",
      description: "Logs in as a different user account. You'll need their password. The '-' flag loads that user's environment variables and settings.",
      command: "su - username"
    },
    {
      title: "Run command as admin",
      description: "Executes a command with administrator (root) privileges. You'll be prompted for your password. Required for system-level changes like installing software or editing protected files.",
      command: "sudo command-here"
    },
    {
      title: "Become root user",
      description: "⚠️ DANGER: Switches to superuser mode with unlimited system access. Any command you run can permanently damage your system. Use only when absolutely necessary!",
      command: "sudo su -",
      dangerLevel: "danger"
    },
    {
      title: "What groups am I in?",
      description: "Shows all user groups you belong to. Groups determine what files and resources you can access. Common groups include sudo (admin access), www-data (web server), docker, etc.",
      command: "groups"
    },
    {
      title: "Change file ownership",
      description: "Changes who owns a file. Can affect file accessibility. Usually requires sudo. Make sure you understand ownership before changing it.",
      command: "sudo chown username:groupname filename",
      dangerLevel: "caution"
    },
    {
      title: "Make file read-only",
      description: "Sets file permissions so only owner can write, everyone can read. The 644 means: owner (6=rw-), group (4=r--), others (4=r--). Standard for most files.",
      command: "chmod 644 filename"
    },
    {
      title: "Make file private",
      description: "Makes file readable and writable only by you, nobody else can even view it. The 600 means: owner (6=rw-), group (0=---), others (0=---). Good for sensitive data like SSH keys.",
      command: "chmod 600 filename"
    }
  ],
  "System Services": [
    {
      title: "Start a service",
      description: "Starts a system service (like web server, database, etc.). The service will run until stopped or system reboots. Common services: nginx, apache2, mysql, postgresql, ssh.",
      command: "sudo systemctl start service-name",
      interactive: true,
      inputs: [
        { label: "Service name", placeholder: "service-name", param: "service" }
      ],
      commandTemplate: (params) => `sudo systemctl start ${params.service || 'service-name'}`
    },
    {
      title: "Stop a service",
      description: "Stops a running service gracefully, allowing it to shut down properly and save data. The service won't restart automatically unless enabled to start on boot.",
      command: "sudo systemctl stop service-name",
      interactive: true,
      inputs: [
        { label: "Service name", placeholder: "service-name", param: "service" }
      ],
      commandTemplate: (params) => `sudo systemctl stop ${params.service || 'service-name'}`
    },
    {
      title: "Restart a service",
      description: "Stops and starts a service in one command. Essential after config changes to apply new settings. Briefly interrupts the service.",
      command: "sudo systemctl restart service-name",
      interactive: true,
      inputs: [
        { label: "Service name", placeholder: "service-name", param: "service" }
      ],
      commandTemplate: (params) => `sudo systemctl restart ${params.service || 'service-name'}`
    },
    {
      title: "Check service status",
      description: "Shows if a service is running, crashed, or stopped, along with recent log messages and resource usage. Green 'active (running)' means it's working properly.",
      command: "systemctl status service-name",
      interactive: true,
      inputs: [
        { label: "Service name", placeholder: "service-name", param: "service" }
      ],
      commandTemplate: (params) => `systemctl status ${params.service || 'service-name'}`
    },
    {
      title: "Enable service at boot",
      description: "Makes a service start automatically when system boots up. Doesn't start it now - use 'start' for that. Essential for servers that need services running after reboot.",
      command: "sudo systemctl enable service-name",
      interactive: true,
      inputs: [
        { label: "Service name", placeholder: "service-name", param: "service" }
      ],
      commandTemplate: (params) => `sudo systemctl enable ${params.service || 'service-name'}`
    },
    {
      title: "Disable service at boot",
      description: "Prevents a service from starting automatically on boot. The service keeps running now but won't start after next reboot. Useful for disabling unwanted services.",
      command: "sudo systemctl disable service-name",
      interactive: true,
      inputs: [
        { label: "Service name", placeholder: "service-name", param: "service" }
      ],
      commandTemplate: (params) => `sudo systemctl disable ${params.service || 'service-name'}`
    },
    {
      title: "List all services",
      description: "Shows all active system services and their status (loaded, running, failed, etc.). Use to see what's running on your system or find service names.",
      command: "systemctl list-units --type=service"
    },
    {
      title: "View service logs",
      description: "Shows detailed logs for a specific service including errors, warnings, and status messages. Useful for troubleshooting why a service failed or isn't working correctly.",
      command: "journalctl -u service-name"
    },
    {
      title: "Follow service logs",
      description: "Watches service logs in real-time as new entries appear (like 'tail -f'). Perfect for monitoring a service during testing or debugging. Press Ctrl+C to stop.",
      command: "journalctl -u service-name -f"
    }
  ],
  "System Logs": [
    {
      title: "View system log",
      description: "Shows the main system log with important system messages, errors, and warnings. On Ubuntu/Debian, this is /var/log/syslog. Use arrow keys to scroll, 'q' to quit.",
      command: "sudo less /var/log/syslog"
    },
    {
      title: "View boot messages",
      description: "Shows all system messages from the most recent boot. Essential for diagnosing startup problems, driver issues, or services that failed to start.",
      command: "journalctl -b"
    },
    {
      title: "View recent logs",
      description: "Shows only system logs from the last hour. You can change the time: '10 minutes ago', '2 days ago', 'yesterday', etc. Useful for recent troubleshooting.",
      command: 'journalctl --since "1 hour ago"'
    },
    {
      title: "Search logs for errors",
      description: "Case-insensitive search for 'error' in system logs. Change 'error' to search for other keywords like 'fail', 'warning', or specific service names.",
      command: 'sudo grep -i "error" /var/log/syslog'
    },
    {
      title: "View kernel messages",
      description: "Shows kernel ring buffer with hardware detection, driver loading, and low-level system messages. Useful for diagnosing hardware issues, driver problems, or USB device detection.",
      command: "dmesg"
    },
    {
      title: "Show login history",
      description: "Displays history of successful user logins with timestamps, duration, and IP addresses. Shows who accessed the system and when. Useful for security audits.",
      command: "last"
    },
    {
      title: "Show failed logins",
      description: "Shows failed login attempts including wrong passwords and invalid usernames. Essential security check to detect brute-force attacks or unauthorized access attempts.",
      command: "sudo lastb"
    }
  ],
  "Flatpak": [
    {
      title: "Install Flatpak app",
      description: "Installs an application from Flathub repository.",
      command: "flatpak install flathub com.example.App"
    },
    {
      title: "Search Flatpak apps",
      description: "Searches for available applications on Flathub.",
      command: "flatpak search keyword"
    },
    {
      title: "List installed Flatpaks",
      description: "Shows all Flatpak applications currently installed.",
      command: "flatpak list"
    },
    {
      title: "Update all Flatpaks",
      description: "Updates all installed Flatpak applications to latest versions.",
      command: "flatpak update"
    },
    {
      title: "Remove Flatpak app",
      description: "Uninstalls a Flatpak application from the system.",
      command: "flatpak uninstall com.example.App"
    },
    {
      title: "Run Flatpak app",
      description: "Launches a Flatpak application from command line.",
      command: "flatpak run com.example.App"
    },
    {
      title: "Show Flatpak app info",
      description: "Displays detailed information about a Flatpak application.",
      command: "flatpak info com.example.App"
    },
    {
      title: "Add Flathub repository",
      description: "Adds the Flathub repository to install apps from.",
      command: "flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo"
    },
    {
      title: "Clean up unused Flatpaks",
      description: "Removes unused runtimes and extensions to free up space.",
      command: "flatpak uninstall --unused"
    },
    {
      title: "Repair Flatpak installation",
      description: "Fixes broken Flatpak installations and dependencies.",
      command: "flatpak repair"
    }
  ],
  "Ubuntu Specific": [
    {
      title: "Update package list",
      description: "Refreshes the list of available software. Always do this first!",
      command: "sudo apt update"
    },
    {
      title: "Upgrade all software",
      description: "Updates all installed packages to latest versions.",
      command: "sudo apt upgrade -y"
    },
    {
      title: "Install a program",
      description: "Installs new software. Replace 'package-name' with actual program name.",
      command: "sudo apt install package-name -y"
    },
    {
      title: "Remove a program",
      description: "Uninstalls software but keeps configuration files.",
      command: "sudo apt remove package-name"
    },
    {
      title: "Remove program completely",
      description: "Uninstalls software and permanently deletes all its configuration files. You won't be able to recover settings if you reinstall later.",
      command: "sudo apt purge package-name",
      dangerLevel: "caution"
    },
    {
      title: "Clean up unused packages",
      description: "Removes packages that were installed as dependencies but no longer needed.",
      command: "sudo apt autoremove -y"
    },
    {
      title: "Search for software",
      description: "Searches available packages matching a keyword.",
      command: "apt search keyword"
    },
    {
      title: "Show package info",
      description: "Shows detailed information about a package before installing.",
      command: "apt show package-name"
    },
    {
      title: "Fix broken packages",
      description: "Attempts to fix package installation problems.",
      command: "sudo apt --fix-broken install"
    },
    {
      title: "Install snap app",
      description: "Installs software from Snap Store (Ubuntu's app store).",
      command: "sudo snap install app-name"
    },
    {
      title: "List installed snaps",
      description: "Shows all snap applications currently installed.",
      command: "snap list"
    },
    {
      title: "Update all snaps",
      description: "Updates all snap applications to latest versions.",
      command: "sudo snap refresh"
    },
    {
      title: "Enable firewall",
      description: "Activates Ubuntu's firewall (UFW) for security.",
      command: "sudo ufw enable"
    },
    {
      title: "Allow port through firewall",
      description: "Opens a port in firewall. Example: 22 for SSH, 80 for web.",
      command: "sudo ufw allow 22"
    },
    {
      title: "Check firewall status",
      description: "Shows current firewall rules and status.",
      command: "sudo ufw status"
    }
  ],
  "Fedora Specific": [
    {
      title: "Update system",
      description: "Updates all packages to latest versions. DNF is Fedora's package manager.",
      command: "sudo dnf update -y"
    },
    {
      title: "Install a program",
      description: "Installs new software. Replace 'package-name' with actual program name.",
      command: "sudo dnf install package-name -y"
    },
    {
      title: "Remove a program",
      description: "Uninstalls software from the system.",
      command: "sudo dnf remove package-name"
    },
    {
      title: "Search for software",
      description: "Searches available packages matching a keyword.",
      command: "dnf search keyword"
    },
    {
      title: "Show package info",
      description: "Shows detailed information about a package.",
      command: "dnf info package-name"
    },
    {
      title: "List installed packages",
      description: "Shows all packages currently installed on your system.",
      command: "dnf list installed"
    },
    {
      title: "Clean package cache",
      description: "Removes cached package files to free up disk space.",
      command: "sudo dnf clean all"
    },
    {
      title: "Show DNF history",
      description: "Displays history of all package installations and updates.",
      command: "dnf history"
    },
    {
      title: "Undo last update",
      description: "Reverses the most recent package installation or update.",
      command: "sudo dnf history undo last"
    },
    {
      title: "Install development tools",
      description: "Installs essential tools for compiling software (gcc, make, etc.).",
      command: 'sudo dnf groupinstall "Development Tools" -y'
    },
    {
      title: "Install RPM file",
      description: "Installs a downloaded .rpm package file.",
      command: "sudo rpm -ivh package.rpm"
    },
    {
      title: "List installed RPM packages",
      description: "Shows all packages installed via RPM.",
      command: "rpm -qa"
    },
    {
      title: "Start firewall",
      description: "Starts Fedora's firewall (firewalld) service.",
      command: "sudo systemctl start firewalld"
    },
    {
      title: "Enable firewall at boot",
      description: "Makes firewall start automatically when system boots.",
      command: "sudo systemctl enable firewalld"
    },
    {
      title: "Open port in firewall",
      description: "Allows traffic on a specific port through firewall.",
      command: "sudo firewall-cmd --zone=public --add-port=80/tcp --permanent"
    },
    {
      title: "Reload firewall",
      description: "Applies firewall configuration changes.",
      command: "sudo firewall-cmd --reload"
    },
    {
      title: "Check firewall status",
      description: "Shows if firewall is running and active zones.",
      command: "sudo firewall-cmd --state"
    }
  ]
};
