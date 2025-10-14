export const workflows = [
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
    id: "clean-system",
    title: "Clean Up System",
    description: "Free up disk space by removing unnecessary files",
    icon: "Trash2",
    difficulty: "beginner",
    steps: [
      {
        title: "Remove old packages (Ubuntu)",
        command: "sudo apt autoremove -y && sudo apt autoclean",
        description: "Removes unused packages and cleans package cache"
      },
      {
        title: "Clean journal logs",
        command: "sudo journalctl --vacuum-time=7d",
        description: "Keeps only last 7 days of system logs"
      },
      {
        title: "Find and list large files",
        command: "sudo du -ah / | sort -rh | head -20",
        description: "Shows top 20 largest files/folders on system"
      }
    ]
  },
  {
    id: "setup-webserver",
    title: "Setup Basic Web Server",
    description: "Install and configure Nginx web server",
    icon: "Globe",
    difficulty: "intermediate",
    steps: [
      {
        title: "Install Nginx",
        command: "sudo apt update && sudo apt install nginx -y",
        description: "Installs Nginx web server"
      },
      {
        title: "Start and enable Nginx",
        command: "sudo systemctl start nginx && sudo systemctl enable nginx",
        description: "Starts Nginx and enables it to run on boot"
      },
      {
        title: "Allow HTTP through firewall",
        command: "sudo ufw allow 'Nginx HTTP'",
        description: "Opens port 80 in firewall for web traffic"
      },
      {
        title: "Check Nginx status",
        command: "sudo systemctl status nginx",
        description: "Verifies Nginx is running correctly"
      }
    ]
  },
  {
    id: "secure-ssh",
    title: "Secure SSH Server",
    description: "Harden SSH configuration for better security",
    icon: "Lock",
    difficulty: "intermediate",
    steps: [
      {
        title: "Backup SSH config",
        command: "sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup",
        description: "Creates backup of current SSH configuration"
      },
      {
        title: "Disable root login",
        command: "sudo sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config",
        description: "Prevents direct root login via SSH"
      },
      {
        title: "Change SSH port (optional)",
        command: "sudo sed -i 's/#Port 22/Port 2222/' /etc/ssh/sshd_config",
        description: "Changes SSH to non-standard port 2222"
      },
      {
        title: "Restart SSH service",
        command: "sudo systemctl restart sshd",
        description: "Applies new SSH configuration"
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

