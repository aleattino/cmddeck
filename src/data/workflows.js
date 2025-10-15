export const workflows = [
  {
    id: "debug-port-in-use",
    title: "Debug Port Already in Use",
    description: "Find and resolve 'port already in use' errors when starting applications",
    icon: "AlertCircle",
    difficulty: "beginner",
    steps: [
      {
        title: "Find process using the port",
        command: "sudo lsof -i :3000",
        description: "Shows which process is using port 3000 (change number as needed). Look for the PID column."
      },
      {
        title: "Get detailed process info",
        command: "ps aux | grep <PID>",
        description: "Replace <PID> with the process ID from previous step to see what's running"
      },
      {
        title: "Kill the process gracefully",
        command: "kill <PID>",
        description: "Sends termination signal to the process. Replace <PID> with actual process ID."
      },
      {
        title: "Force kill if needed",
        command: "kill -9 <PID>",
        description: "Only if graceful kill didn't work. Forces immediate termination."
      },
      {
        title: "Verify port is free",
        command: "sudo lsof -i :3000",
        description: "Should return nothing if port is now available"
      }
    ]
  },
  {
    id: "git-disaster-recovery",
    title: "Git Disaster Recovery",
    description: "Recover from common Git mistakes and save your work",
    icon: "Save",
    difficulty: "intermediate",
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
        command: "git stash save 'emergency backup'",
        description: "Saves all your changes temporarily. They're not lost!"
      },
      {
        title: "Undo last commit (keep changes)",
        command: "git reset --soft HEAD~1",
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
    steps: [
      {
        title: "Update system packages",
        command: "sudo apt update && sudo apt upgrade -y",
        description: "Updates package list and installs all available updates"
      },
      {
        title: "Create new admin user",
        command: "sudo adduser adminuser && sudo usermod -aG sudo adminuser",
        description: "Creates new user and adds to sudo group for admin privileges"
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
        command: "sudo ufw allow 22/tcp",
        description: "Opens SSH port so you can still connect remotely"
      },
      {
        title: "Enable firewall",
        command: "sudo ufw enable",
        description: "Activates the firewall with your rules"
      },
      {
        title: "Disable root SSH login",
        command: "sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config && sudo systemctl restart sshd",
        description: "Prevents direct root login via SSH for security"
      },
      {
        title: "Set timezone",
        command: "sudo timedatectl set-timezone America/New_York",
        description: "Sets server timezone (change as needed)"
      }
    ]
  },
  {
    id: "network-troubleshooting",
    title: "Network Troubleshooting",
    description: "Diagnose and resolve common network connectivity issues",
    icon: "Globe",
    difficulty: "beginner",
    steps: [
      {
        title: "Test internet connectivity",
        command: "ping -c 4 8.8.8.8",
        description: "Pings Google DNS. If this works, internet is up"
      },
      {
        title: "Test DNS resolution",
        command: "nslookup google.com",
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
        command: "traceroute google.com",
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
    icon: "Save",
    difficulty: "beginner",
    steps: [
      {
        title: "Backup /etc directory",
        command: "sudo tar -czvf /backup/etc-backup-$(date +%Y%m%d).tar.gz /etc",
        description: "Creates timestamped backup of system configuration files"
      },
      {
        title: "Backup home directory",
        command: "tar -czvf /backup/home-backup-$(date +%Y%m%d).tar.gz ~/",
        description: "Backs up your entire home directory"
      },
      {
        title: "List installed packages (Ubuntu)",
        command: "dpkg --get-selections > /backup/installed-packages.txt",
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
        command: "sudo journalctl --vacuum-time=7d",
        description: "Keeps only last 7 days of system logs"
      },
      {
        title: "Remove old snap versions",
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
        command: "docker stop $(docker ps -aq)",
        description: "Stops all running Docker containers"
      },
      {
        title: "Remove stopped containers",
        command: "docker container prune -f",
        description: "Deletes all stopped containers"
      },
      {
        title: "Remove unused images",
        command: "docker image prune -a -f",
        description: "Removes all unused images"
      },
      {
        title: "Remove unused volumes",
        command: "docker volume prune -f",
        description: "Cleans up unused Docker volumes"
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



