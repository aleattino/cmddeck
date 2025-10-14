export const snippetsData = {
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
      description: "Displays your user ID (UID) and group memberships.",
      command: "id"
    },
    {
      title: "Who's logged in?",
      description: "Shows all users currently logged into the system.",
      command: "who"
    },
    {
      title: "Computer name",
      description: "Shows your computer's network name (hostname).",
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
      command: "cp source.txt destination.txt"
    },
    {
      title: "Copy entire folder",
      description: "Copies a directory and all its contents recursively.",
      command: "cp -r my-folder/ backup-folder/"
    },
    {
      title: "Move or rename",
      description: "Moves a file to another location, or renames it if destination is in same folder.",
      command: "mv oldname.txt newname.txt"
    },
    {
      title: "Delete file",
      description: "Permanently deletes a file. Be careful, there's no trash bin!",
      command: "rm filename.txt"
    },
    {
      title: "Delete folder",
      description: "Deletes a directory and everything inside it. Use with extreme caution!",
      command: "rm -rf folder-name/"
    },
    {
      title: "Make file executable",
      description: "Makes a script file runnable. Essential for shell scripts!",
      command: "chmod +x script.sh"
    }
  ],
  "Search & Find": [
    {
      title: "Find files by name",
      description: "Searches for files matching a pattern. Great for finding lost files!",
      command: 'find ~ -name "*.txt"'
    },
    {
      title: "Find large files",
      description: "Locates files bigger than 100MB. Perfect for cleaning up disk space!",
      command: "find ~ -type f -size +100M"
    },
    {
      title: "Find recent files",
      description: "Shows files modified in the last 7 days. Great for tracking recent work.",
      command: "find ~ -type f -mtime -7"
    },
    {
      title: "Search text in files",
      description: "Searches for text inside all files in current directory and subdirectories.",
      command: 'grep -r "search text" .'
    },
    {
      title: "Search (case-insensitive)",
      description: "Searches for text ignoring uppercase/lowercase differences.",
      command: 'grep -ri "search text" .'
    },
    {
      title: "Quick file search",
      description: "Super fast file search using pre-built database. Run 'sudo updatedb' first!",
      command: "locate filename"
    }
  ],
  "View & Edit Files": [
    {
      title: "View file content",
      description: "Displays the entire content of a text file in the terminal.",
      command: "cat filename.txt"
    },
    {
      title: "View large files",
      description: "Opens large files page by page. Use arrows to scroll, 'q' to quit.",
      command: "less filename.txt"
    },
    {
      title: "View first lines",
      description: "Shows only the first 20 lines of a file. Good for quick previews.",
      command: "head -n 20 filename.txt"
    },
    {
      title: "View last lines",
      description: "Shows only the last 20 lines. Perfect for checking recent log entries.",
      command: "tail -n 20 filename.txt"
    },
    {
      title: "Follow file changes",
      description: "Watches a file and shows new lines as they're added. Great for logs!",
      command: "tail -f /var/log/syslog"
    },
    {
      title: "Edit with nano (easy)",
      description: "Opens file in nano, a beginner-friendly editor. Commands shown at bottom!",
      command: "nano filename.txt"
    },
    {
      title: "Create or append text",
      description: "Adds a line of text to a file. Creates file if it doesn't exist.",
      command: 'echo "Hello World" >> filename.txt'
    },
    {
      title: "Count lines in file",
      description: "Counts lines, words, and characters in a file.",
      command: "wc -l filename.txt"
    }
  ],
  "Processes & Performance": [
    {
      title: "Show all processes",
      description: "Lists all running programs and their resource usage.",
      command: "ps aux"
    },
    {
      title: "Interactive process monitor",
      description: "Real-time process viewer. Press 'q' to quit, 'k' to kill a process.",
      command: "top"
    },
    {
      title: "Better process monitor",
      description: "Htop is like top but prettier and easier to use. Must be installed first.",
      command: "htop"
    },
    {
      title: "Kill a process",
      description: "Forcefully stops a running process. Replace 1234 with actual Process ID.",
      command: "kill -9 1234"
    },
    {
      title: "Kill by name",
      description: "Stops all processes with a specific name. Use carefully!",
      command: "killall firefox"
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
      description: "Shows how much space a folder is taking up.",
      command: "du -sh /path/to/folder"
    },
    {
      title: "Top 10 largest folders",
      description: "Finds the biggest space hogs on your system. Great for cleanup!",
      command: "du -sh /* 2>/dev/null | sort -rh | head -10"
    }
  ],
  "Network": [
    {
      title: "Test internet connection",
      description: "Sends 4 packets to Google to check if internet is working and speed.",
      command: "ping -c 4 google.com"
    },
    {
      title: "Show my IP address",
      description: "Displays all network interfaces and their IP addresses.",
      command: "ip addr show"
    },
    {
      title: "What's using the network?",
      description: "Shows all active network connections and listening ports.",
      command: "ss -tuln"
    },
    {
      title: "Download a file",
      description: "Downloads a file from the internet. Simple and reliable.",
      command: "wget https://example.com/file.zip"
    },
    {
      title: "Download with curl",
      description: "Alternative download tool, often pre-installed on systems.",
      command: "curl -O https://example.com/file.zip"
    },
    {
      title: "Check website status",
      description: "Tests if a website is up and shows HTTP response code (200 = OK).",
      command: "curl -I https://example.com"
    },
    {
      title: "DNS lookup",
      description: "Finds the IP address of a website.",
      command: "nslookup google.com"
    },
    {
      title: "Trace network path",
      description: "Shows the route packets take to reach a destination. Good for diagnosing issues.",
      command: "traceroute google.com"
    }
  ],
  "Archives & Compression": [
    {
      title: "Create .tar.gz archive",
      description: "Compresses a folder into a .tar.gz file. Standard Linux backup format.",
      command: "tar -czvf backup.tar.gz ~/Documents/"
    },
    {
      title: "Extract .tar.gz archive",
      description: "Extracts a compressed .tar.gz file to current directory.",
      command: "tar -xzvf backup.tar.gz"
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
      description: "Logs in as a different user. You'll need their password.",
      command: "su - username"
    },
    {
      title: "Run command as admin",
      description: "Executes a command with administrator (root) privileges.",
      command: "sudo command-here"
    },
    {
      title: "Become root user",
      description: "Switches to superuser mode. Be very careful - you have unlimited power!",
      command: "sudo su -"
    },
    {
      title: "What groups am I in?",
      description: "Shows all user groups you belong to.",
      command: "groups"
    },
    {
      title: "Change file ownership",
      description: "Changes who owns a file. Usually requires sudo.",
      command: "sudo chown username:groupname filename"
    },
    {
      title: "Make file read-only",
      description: "Sets file permissions so only owner can write, everyone can read.",
      command: "chmod 644 filename"
    },
    {
      title: "Make file private",
      description: "Makes file readable and writable only by you.",
      command: "chmod 600 filename"
    }
  ],
  "System Services": [
    {
      title: "Start a service",
      description: "Starts a system service (like web server, database, etc.).",
      command: "sudo systemctl start service-name"
    },
    {
      title: "Stop a service",
      description: "Stops a running service.",
      command: "sudo systemctl stop service-name"
    },
    {
      title: "Restart a service",
      description: "Stops and starts a service. Useful after config changes.",
      command: "sudo systemctl restart service-name"
    },
    {
      title: "Check service status",
      description: "Shows if a service is running and displays recent log messages.",
      command: "systemctl status service-name"
    },
    {
      title: "Enable service at boot",
      description: "Makes a service start automatically when system boots up.",
      command: "sudo systemctl enable service-name"
    },
    {
      title: "Disable service at boot",
      description: "Prevents a service from starting automatically.",
      command: "sudo systemctl disable service-name"
    },
    {
      title: "List all services",
      description: "Shows all active system services and their status.",
      command: "systemctl list-units --type=service"
    },
    {
      title: "View service logs",
      description: "Shows detailed logs for a specific service.",
      command: "journalctl -u service-name"
    },
    {
      title: "Follow service logs",
      description: "Watches service logs in real-time as new entries appear.",
      command: "journalctl -u service-name -f"
    }
  ],
  "System Logs": [
    {
      title: "View system log",
      description: "Shows the main system log. Contains important system messages.",
      command: "sudo less /var/log/syslog"
    },
    {
      title: "View boot messages",
      description: "Shows messages from the last system boot. Good for troubleshooting.",
      command: "journalctl -b"
    },
    {
      title: "View recent logs",
      description: "Shows system logs from the last hour only.",
      command: 'journalctl --since "1 hour ago"'
    },
    {
      title: "Search logs for errors",
      description: "Finds all lines containing 'error' in system logs.",
      command: 'sudo grep -i "error" /var/log/syslog'
    },
    {
      title: "View kernel messages",
      description: "Shows kernel and hardware-related messages.",
      command: "dmesg"
    },
    {
      title: "Show login history",
      description: "Displays history of user logins.",
      command: "last"
    },
    {
      title: "Show failed logins",
      description: "Shows failed login attempts. Good security check!",
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
      description: "Uninstalls software and deletes all its configuration files.",
      command: "sudo apt purge package-name"
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
