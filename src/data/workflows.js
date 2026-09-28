// Steps can reference parameters as {{key}}. Values are typed once in the
// workflow and shell-quoted into every step. A parameter without `default`
// is required; `pattern` rejects values that would break the command.
export const workflows = [
  {
    id: "debug-port-in-use",
    title: "Debug Port Already in Use",
    description: "Find and resolve 'port already in use' errors when starting applications",
    icon: "AlertCircle",
    difficulty: "beginner",
    params: [
      { key: "port", numeric: true, label: "Port", default: "3000", pattern: /^\d{1,5}$/, invalid: "Use a port number, like 8080", hint: "The port your app can't use" },
      { key: "pid", numeric: true, label: "Process ID (PID)", example: "12345", pattern: /^\d+$/, invalid: "Use the number from the PID column", hint: "From the PID column of step 1" }
    ],
    steps: [
      {
        title: "Find process using the port",
        command: "sudo lsof -i :{{port}}",
        description: "Shows which process is using the port. Copy the number in the PID column into Process ID above."
      },
      {
        title: "Get detailed process info",
        command: "ps -fp {{pid}}",
        description: "Shows who started the process, when, and the full command, so you know what you're about to stop"
      },
      {
        title: "Kill the process gracefully",
        command: "kill {{pid}}",
        dangerLevel: "caution",
        description: "Asks the process to shut down, giving it time to save and clean up"
      },
      {
        title: "Force kill if needed",
        command: "kill -9 {{pid}}",
        dangerLevel: "caution",
        description: "Only if the graceful kill didn't work. Forces immediate termination."
      },
      {
        title: "Verify port is free",
        command: "sudo lsof -i :{{port}}",
        description: "Should print nothing if the port is now available"
      }
    ]
  },
  {
    id: "git-disaster-recovery",
    title: "Git Disaster Recovery",
    description: "Recover from common Git mistakes and save your work",
    icon: "Save",
    difficulty: "intermediate",
    params: [
      { key: "message", label: "Stash note", default: "emergency backup", hint: "Helps you find this stash later" }
    ],
    steps: [
      {
        title: "Check current status",
        command: "git status",
        description: "See what files are modified, staged, or untracked"
      },
      {
        title: "View recent commits",
        command: "git log --oneline -10",
        description: "Shows last 10 commits with their IDs"
      },
      {
        title: "Stash uncommitted changes",
        command: "git stash push -m {{message}}",
        description: "Saves all your changes temporarily. They're not lost!"
      },
      {
        title: "Undo last commit (keep changes)",
        command: "git reset --soft HEAD~1",
        dangerLevel: "caution",
        description: "Moves back one commit but keeps your file changes staged"
      },
      {
        title: "Recover stashed changes",
        command: "git stash pop",
        description: "Brings back your stashed changes"
      },
      {
        title: "View all stashes",
        command: "git stash list",
        description: "Shows all saved stashes if you need to recover older ones"
      }
    ]
  },
  {
    id: "setup-new-server",
    title: "Setup New Server",
    description: "Initial configuration for a fresh Linux server with security basics",
    icon: "Lock",
    difficulty: "intermediate",
    params: [
      { key: "user", label: "Admin username", example: "deploy", pattern: /^[a-z_][a-z0-9_-]{0,31}$/, invalid: "Lowercase letters, digits, - and _; start with a letter", hint: "The account you'll log in with instead of root" },
      { key: "sshPort", numeric: true, label: "SSH port", default: "22", pattern: /^\d{1,5}$/, invalid: "Use a port number, like 22", hint: "Change it only if SSH listens elsewhere" },
      { key: "timezone", label: "Timezone", example: "Europe/Rome", pattern: /^[A-Za-z]+(?:[/_+-][A-Za-z0-9]+)*$/, invalid: "Use a name like Europe/Rome or UTC", hint: "List them with timedatectl list-timezones" }
    ],
    steps: [
      {
        title: "Update system packages",
        command: "sudo apt update && sudo apt upgrade -y",
        description: "Updates package list and installs all available updates"
      },
      {
        title: "Create new admin user",
        command: "sudo adduser {{user}} && sudo usermod -aG sudo {{user}}",
        description: "Creates the user and adds it to the sudo group for admin privileges"
      },
      {
        title: "Install essential tools",
        command: "sudo apt install curl wget git vim htop ufw -y",
        description: "Installs commonly needed utilities"
      },
      {
        title: "Configure firewall",
        command: "sudo ufw default deny incoming && sudo ufw default allow outgoing",
        description: "Sets up firewall to block incoming, allow outgoing by default"
      },
      {
        title: "Allow SSH through firewall",
        command: "sudo ufw allow {{sshPort}}/tcp",
        description: "Opens the SSH port so you can still connect remotely"
      },
      {
        title: "Enable firewall",
        command: "sudo ufw enable",
        dangerLevel: "caution",
        description: "Activates the firewall with your rules"
      },
      {
        title: "Disable root SSH login",
        command: "sudo sed -i -E 's/^#?PermitRootLogin .*/PermitRootLogin no/' /etc/ssh/sshd_config && sudo systemctl restart ssh",
        description: "Prevents direct root login via SSH. Before running it, confirm you can log in as the new admin user in a second session.",
        dangerLevel: "caution"
      },
      {
        title: "Set timezone",
        command: "sudo timedatectl set-timezone {{timezone}}",
        description: "Sets the server clock's timezone"
      }
    ]
  },
  {
    id: "network-troubleshooting",
    title: "Network Troubleshooting",
    description: "Diagnose and resolve common network connectivity issues",
    icon: "Globe",
    difficulty: "beginner",
    params: [
      { key: "host", label: "Website to test", default: "google.com", pattern: /^[A-Za-z0-9.-]+$/, invalid: "Use a domain name, like example.com", hint: "Try the site that isn't loading" }
    ],
    steps: [
      {
        title: "Test internet connectivity",
        command: "ping -c 4 8.8.8.8",
        description: "Pings Google DNS. If this works, internet is up"
      },
      {
        title: "Test DNS resolution",
        command: "nslookup {{host}}",
        description: "Checks if domain names are resolving. If this fails but ping worked, DNS is the issue"
      },
      {
        title: "Check network interfaces",
        command: "ip addr show",
        description: "Shows all network interfaces and their IP addresses"
      },
      {
        title: "Check default gateway",
        command: "ip route show",
        description: "Displays routing table and default gateway"
      },
      {
        title: "Check listening ports",
        command: "sudo ss -tuln",
        description: "Shows all open network ports and what's listening"
      },
      {
        title: "Trace network path",
        command: "traceroute {{host}}",
        description: "Shows the route packets take. Useful to find where connection breaks"
      },
      {
        title: "Restart network service",
        command: "sudo systemctl restart NetworkManager",
        description: "Restarts network manager. Often fixes connectivity issues"
      }
    ]
  },
  {
    id: "backup-system",
    title: "Backup System Configuration",
    description: "Complete backup of important system files and configurations",
    icon: "Archive",
    difficulty: "beginner",
    params: [
      { key: "dir", label: "Backup folder", default: "/backup", pattern: /^[~/]/, invalid: "Use an absolute path, like /backup or /mnt/usb", hint: "Keep it outside your home folder, or the home backup would include itself" }
    ],
    steps: [
      {
        title: "Create the backup folder",
        command: "sudo mkdir -p {{dir}} && sudo chown \"$USER\" {{dir}}",
        description: "Creates the folder and makes it writable by your user, so the next steps can save into it"
      },
      {
        title: "Backup /etc directory",
        command: "sudo tar -czvf {{dir}}/etc-backup-$(date +%Y%m%d).tar.gz /etc",
        description: "Creates timestamped backup of system configuration files"
      },
      {
        title: "Backup home directory",
        command: "tar -czvf {{dir}}/home-backup-$(date +%Y%m%d).tar.gz -C ~ .",
        description: "Backs up your entire home directory, stored with paths relative to your home"
      },
      {
        title: "List installed packages (Ubuntu)",
        command: "dpkg --get-selections > {{dir}}/installed-packages.txt",
        description: "Saves list of installed packages for easy restore"
      }
    ]
  },
  {
    id: "clean-disk-space",
    title: "Clean Up Disk Space",
    description: "Comprehensive disk cleanup to free up storage space",
    icon: "Trash2",
    difficulty: "beginner",
    params: [
      { key: "keep", label: "Keep logs for", default: "7d", pattern: /^\d+(?:s|m|h|d|weeks?|months?|years?)$/, invalid: "Use a duration like 7d, 2weeks or 1month", hint: "Older journal entries are deleted" }
    ],
    steps: [
      {
        title: "Check current disk usage",
        command: "df -h",
        description: "Shows free space on all drives. Note which ones are full."
      },
      {
        title: "Find largest directories",
        command: "sudo du -h --max-depth=1 / 2>/dev/null | sort -rh | head -20",
        description: "Shows top 20 largest folders on system"
      },
      {
        title: "Clean package cache (Ubuntu/Debian)",
        command: "sudo apt clean && sudo apt autoclean",
        description: "Removes downloaded package files"
      },
      {
        title: "Remove unused packages",
        command: "sudo apt autoremove -y",
        description: "Removes packages that were installed as dependencies but no longer needed"
      },
      {
        title: "Clean old journal logs",
        command: "sudo journalctl --vacuum-time={{keep}}",
        description: "Deletes system logs older than the duration you chose"
      },
      {
        title: "Remove old snap versions",
        dangerLevel: "caution",
        command: "sudo snap list --all | awk '/disabled/{print $1, $3}' | while read snapname revision; do sudo snap remove \"$snapname\" --revision=\"$revision\"; done",
        description: "Removes old snap package versions (Ubuntu)"
      },
      {
        title: "Find and remove old kernels (Ubuntu)",
        command: "sudo apt autoremove --purge",
        description: "Removes old kernel versions keeping only current and previous"
      },
      {
        title: "Empty trash",
        command: "rm -rf ~/.local/share/Trash/*",
        dangerLevel: "danger",
        description: "Empties your user trash folder"
      },
      {
        title: "Clear thumbnail cache",
        command: "rm -rf ~/.cache/thumbnails/*",
        description: "Removes cached thumbnails that can be regenerated"
      },
      {
        title: "Check disk usage again",
        command: "df -h",
        description: "Verify how much space you freed up"
      }
    ]
  },
  {
    id: "docker-cleanup",
    title: "Docker System Cleanup",
    description: "Remove unused Docker resources to free up space",
    icon: "Container",
    difficulty: "beginner",
    steps: [
      {
        title: "Stop all containers",
        command: "docker ps -q | xargs -r docker stop",
        description: "Stops all running Docker containers (does nothing if none are running)",
        dangerLevel: "caution"
      },
      {
        title: "Remove stopped containers",
        command: "docker container prune -f",
        description: "Deletes all stopped containers"
      },
      {
        title: "Remove unused images",
        command: "docker image prune -a -f",
        description: "Removes every image not used by a container. They'll need to be pulled again later",
        dangerLevel: "caution"
      },
      {
        title: "Remove unused volumes",
        command: "docker volume prune -f",
        description: "Deletes volumes not attached to a container, including any data stored in them",
        dangerLevel: "danger"
      },
      {
        title: "Show disk usage",
        command: "docker system df",
        description: "Displays Docker disk usage statistics"
      }
    ]
  },
  {
    id: "monitor-system",
    title: "System Health Check",
    description: "Quick check of system resources and status",
    icon: "Activity",
    difficulty: "beginner",
    steps: [
      {
        title: "Check CPU and memory",
        command: "top -bn1 | head -20",
        description: "Shows current CPU and RAM usage"
      },
      {
        title: "Check disk space",
        command: "df -h | grep -v tmpfs",
        description: "Displays free disk space on all drives"
      },
      {
        title: "Check network status",
        command: "ss -tuln | grep LISTEN",
        description: "Shows all listening network ports"
      },
      {
        title: "Check system uptime",
        command: "uptime",
        description: "Displays how long system has been running"
      },
      {
        title: "View recent errors",
        command: "sudo journalctl -p err -n 20",
        description: "Shows last 20 system errors from logs"
      }
    ]
  }
];
