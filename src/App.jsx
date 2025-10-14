import React, { useState, useMemo } from 'react';
import { 
  Monitor, 
  Folder, 
  Search, 
  FileText, 
  Cpu, 
  Wifi, 
  Archive, 
  Users, 
  Settings, 
  FileStack,
  Star,
  Clock,
  Command as CommandIcon,
  Save,
  Trash2,
  Globe,
  Lock,
  Container,
  Activity,
  Box,
  Info,
  Keyboard,
  ExternalLink,
  User,
  Check
} from 'lucide-react';
import { snippetsData } from './data/snippets';
import { workflows } from './data/workflows';

// Custom logo components using real images
const UbuntuLogo = ({ size = 16, className = "" }) => (
  <img 
    src="/128px-Ubuntu-logo-no-wordmark-solid-o-2022.svg.png" 
    alt="Ubuntu"
    width={size} 
    height={size}
    className={className}
    style={{ display: 'inline-block' }}
  />
);

const FedoraLogo = ({ size = 16, className = "" }) => (
  <img 
    src="/128px-Fedora_icon_(2021).svg.png" 
    alt="Fedora"
    width={size} 
    height={size}
    className={className}
    style={{ display: 'inline-block' }}
  />
);

const FlatpakLogo = ({ size = 16, className = "" }) => (
  <img 
    src="/flatpak.svg" 
    alt="Flatpak"
    width={size} 
    height={size}
    className={className}
    style={{ display: 'inline-block' }}
  />
);

// Blinking cursor component
const BlinkingCursor = () => (
  <>
    <style>{`
      @keyframes blink { 50% { opacity: 0; } }
      .blinking-cursor { animation: blink 1s step-end infinite; }
    `}</style>
    <span className="blinking-cursor text-green-400">_</span>
  </>
);

// Toast notification component
const Toast = ({ message, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-4 right-4 z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="bg-gray-900 border border-green-500/50 rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3 min-w-[200px]">
        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Check size={14} className="text-black" strokeWidth={3} />
        </div>
        <span className="text-green-400 font-medium text-sm">{message}</span>
      </div>
    </div>
  );
};

// Info Modal component
const InfoModal = ({ isOpen, onClose, totalCommands }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-green-500/30 rounded-lg w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Info size={24} className="text-green-400" />
            <h2 className="text-xl font-bold text-green-400">About CmdDeck</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 p-1"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Version & Stats */}
          <div className="text-center pb-4 border-b border-gray-800">
            <h3 className="text-2xl font-bold text-green-400 mb-1">CmdDeck</h3>
            <p className="text-gray-500 text-sm mb-3">Your deck of ready-to-use Linux commands</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-gray-400">Version <span className="text-green-400 font-mono">1.0</span></span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400"><span className="text-green-400 font-bold">{totalCommands}+</span> commands</span>
            </div>
          </div>

          {/* Creator */}
          <div className="flex items-start gap-3">
            <User size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-400 mb-1">Created by</p>
              <p className="text-green-400 font-semibold">Alessandro Attino</p>
              <p className="text-gray-600 text-xs mt-1">© 2025</p>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="flex items-start gap-3">
            <Keyboard size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-2">Keyboard Shortcuts</p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Quick Search</span>
                  <div className="flex gap-1">
                    <kbd className="px-2 py-0.5 bg-gray-800 rounded text-gray-400">Ctrl</kbd>
                    <kbd className="px-2 py-0.5 bg-gray-800 rounded text-gray-400">K</kbd>
                    <span className="text-gray-600 mx-1">or</span>
                    <kbd className="px-2 py-0.5 bg-gray-800 rounded text-gray-400">/</kbd>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Close Dialogs</span>
                  <kbd className="px-2 py-0.5 bg-gray-800 rounded text-gray-400">Esc</kbd>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-start gap-3">
            <ExternalLink size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-2">Links</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://github.com/aleattino/cmddeck"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-md transition-colors inline-flex items-center gap-1"
                >
                  GitHub
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Workflow icons mapping
const workflowIcons = {
  Save,
  Trash2,
  Globe,
  Lock,
  Container,
  Activity
};

// Workflows Modal component
const WorkflowsModal = ({ isOpen, onClose, workflows, selectedWorkflow, onSelectWorkflow, onCopyStep, copiedCommand }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-gray-900 border border-green-500/30 rounded-lg w-full max-w-4xl my-2 sm:my-8 shadow-2xl">
        {/* Header */}
        <div className="p-3 sm:p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <FileStack size={20} className="text-green-400 sm:w-7 sm:h-7" />
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-green-400 mb-0 sm:mb-1">Command Workflows</h2>
              <p className="text-gray-500 text-xs sm:text-sm hidden sm:block">Complete task sequences for common operations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 p-1 sm:p-2"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Workflows List */}
          <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-gray-800 max-h-[30vh] md:max-h-[70vh] overflow-y-auto">
            {workflows.map(workflow => {
              const IconComponent = workflowIcons[workflow.icon];
              return (
              <button
                key={workflow.id}
                onClick={() => onSelectWorkflow(workflow)}
                className={`w-full text-left p-3 sm:p-4 border-b border-gray-800 transition-colors ${
                  selectedWorkflow?.id === workflow.id ? 'bg-green-500/20 border-l-4 border-l-green-500' : 'hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {IconComponent && <IconComponent size={16} className="text-green-400 sm:w-5 sm:h-5" />}
                  <span className="text-green-400 font-semibold text-xs sm:text-sm">{workflow.title}</span>
                </div>
                <p className="text-gray-500 text-xs line-clamp-2 sm:line-clamp-none">{workflow.description}</p>
                <div className="mt-2 flex gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    workflow.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                    workflow.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {workflow.difficulty}
                  </span>
                  <span className="text-xs text-gray-600">{workflow.steps.length} steps</span>
                </div>
              </button>
              );
            })}
          </div>

          {/* Workflow Steps */}
          <div className="md:w-2/3 p-3 sm:p-6 max-h-[50vh] md:max-h-[70vh] overflow-y-auto">
            {selectedWorkflow ? (
              <div>
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    {React.createElement(workflowIcons[selectedWorkflow.icon], { 
                      size: 24, 
                      className: "text-green-400 sm:w-8 sm:h-8" 
                    })}
                    <h3 className="text-lg sm:text-xl font-bold text-green-400">{selectedWorkflow.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{selectedWorkflow.description}</p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {selectedWorkflow.steps.map((step, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-gray-700">
                      <div className="flex items-start gap-2 sm:gap-3 mb-2">
                        <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-green-400 font-semibold mb-1 text-sm sm:text-base">{step.title}</h4>
                          <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">{step.description}</p>
                          <div className="bg-black/50 p-2 sm:p-3 rounded-md font-mono text-xs text-gray-200 relative">
                            <code className="block pr-14 sm:pr-16 break-all">{step.command}</code>
                            <button
                              onClick={() => onCopyStep(step.command)}
                              className={`absolute top-1/2 -translate-y-1/2 right-1.5 sm:right-2 px-2 py-1 text-xs rounded-md transition-colors ${
                                copiedCommand === step.command
                                  ? 'bg-green-500 text-black'
                                  : 'bg-gray-700 hover:bg-green-500 hover:text-black'
                              }`}
                            >
                              {copiedCommand === step.command ? '✓' : 'Copy'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Copy All Button */}
                <button
                  onClick={() => onCopyStep(selectedWorkflow.steps.map(s => s.command).join('\n'))}
                  className={`mt-4 sm:mt-6 w-full py-2.5 sm:py-3 font-semibold text-sm sm:text-base rounded-md transition-colors flex items-center justify-center gap-2 ${
                    copiedCommand === selectedWorkflow.steps.map(s => s.command).join('\n')
                      ? 'bg-green-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-black'
                  }`}
                >
                  {copiedCommand === selectedWorkflow.steps.map(s => s.command).join('\n') ? (
                    <>✓ Copied to Clipboard!</>
                  ) : (
                    <>
                      <FileStack size={14} className="sm:w-4 sm:h-4" />
                      Copy All {selectedWorkflow.steps.length} Commands
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center mt-2 hidden sm:block">
                  Copies all commands as a multi-line script ready to paste in terminal
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[200px] text-gray-500">
                <div className="text-center">
                  <FileStack size={36} className="mx-auto mb-3 opacity-30 sm:w-12 sm:h-12" />
                  <p className="text-sm sm:text-base">Select a workflow to view steps</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Command Palette component
const CommandPalette = ({ isOpen, onClose, snippets, onSelect, searchValue, onSearchChange }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [searchValue]);

  const handleSelect = (snippet) => {
    onSelect(snippet);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, snippets.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && snippets[selectedIndex]) {
      e.preventDefault();
      handleSelect(snippets[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 sm:p-8 pt-[10vh]">
      <div className="bg-gray-900 border border-green-500/30 rounded-lg w-full max-w-3xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Search className="text-gray-500" size={20} />
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search all commands... (use ↑↓ to navigate, Enter to copy)"
              className="flex-1 bg-transparent text-gray-200 text-lg outline-none placeholder-gray-600"
            />
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-300 text-sm px-2 py-1 rounded bg-gray-800"
            >
              ESC
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {snippets.length > 0 ? (
            snippets.slice(0, 10).map((snippet, index) => (
              <button
                key={snippet.command}
                onClick={() => handleSelect(snippet)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full text-left p-4 border-b border-gray-800 transition-all ${
                  index === selectedIndex ? 'bg-green-500/20 border-l-4 border-l-green-500' : 'hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-green-400 font-semibold">
                    {snippet.title}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded ml-2">
                    {snippet.category}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{snippet.description}</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-xs text-gray-500 font-mono block truncate flex-1">{snippet.command}</code>
                  <span className="text-xs text-gray-600 whitespace-nowrap">Click to copy</span>
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Search className="mx-auto mb-2 opacity-50" size={32} />
              <p>No commands found</p>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-gray-950/50 border-t border-gray-800 text-xs text-gray-600 flex items-center justify-between">
          <div className="flex gap-4">
            <span><kbd className="px-2 py-1 bg-gray-800 rounded">↑↓</kbd> Navigate</span>
            <span><kbd className="px-2 py-1 bg-gray-800 rounded">Enter</kbd> Copy</span>
            <span><kbd className="px-2 py-1 bg-gray-800 rounded">Esc</kbd> Close</span>
          </div>
          <span>{snippets.length} results</span>
        </div>
      </div>
    </div>
  );
};

// Snippet card component
const SnippetCard = ({ snippet, onCopy, isCopied, onToggleFavorite, isFavorite, showCategory }) => (
  <div className="bg-gray-900/50 border border-green-500/20 rounded-lg p-3 sm:p-4 flex flex-col justify-between transition-all hover:border-green-500/50 hover:bg-gray-900">
    <div>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-green-400 font-bold text-base sm:text-lg flex-1 pr-2">{snippet.title}</h3>
        <button
          onClick={() => onToggleFavorite(snippet.command)}
          className="flex-shrink-0 p-1 hover:bg-gray-800 rounded transition-colors"
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star size={16} className={isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-500"} />
        </button>
      </div>
      {showCategory && snippet.category && (
        <span className="inline-block text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded mb-2">
          {snippet.category}
        </span>
      )}
      <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{snippet.description}</p>
    </div>
    <div className="bg-black/50 p-2 sm:p-3 rounded-md font-mono text-xs sm:text-sm text-gray-200 relative">
      <code className="block pr-14 sm:pr-16 break-all overflow-x-auto">{snippet.command}</code>
      <button 
        onClick={() => onCopy(snippet.command)}
        className="absolute top-1/2 -translate-y-1/2 right-1.5 sm:right-2 px-2 sm:px-3 py-1 text-xs bg-gray-700 hover:bg-green-500 hover:text-black rounded-md transition-colors whitespace-nowrap flex-shrink-0"
      >
        {isCopied ? '✓' : 'Copy'}
      </button>
    </div>
  </div>
);

// Category icons mapping - Minimal Lucide icons + custom logos
const categoryIcons = {
  "All": CommandIcon,
  "Favorites": Star,
  "Recent": Clock,
  "System Info": Monitor,
  "Files & Folders": Folder,
  "Search & Find": Search,
  "View & Edit Files": FileText,
  "Processes & Performance": Cpu,
  "Network": Wifi,
  "Archives & Compression": Archive,
  "Users & Permissions": Users,
  "System Services": Settings,
  "System Logs": FileStack,
  "Flatpak": FlatpakLogo,         // Custom Flatpak logo
  "Ubuntu Specific": UbuntuLogo,  // Custom Ubuntu logo
  "Fedora Specific": FedoraLogo   // Custom Fedora logo
};

export default function App() {
  const dataCategories = Object.keys(snippetsData);
  const specialCategories = ['All', 'Favorites', 'Recent'];
  const categories = [...specialCategories, ...dataCategories];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [paletteSearch, setPaletteSearch] = useState('');
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [workflowsOpen, setWorkflowsOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(20);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [recentCommands, setRecentCommands] = useState(() => {
    const saved = localStorage.getItem('recentCommands');
    return saved ? JSON.parse(saved) : [];
  });
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Get all snippets with category info
  const allSnippets = useMemo(() => {
    return Object.entries(snippetsData).flatMap(([category, commands]) =>
      commands.map(cmd => ({ ...cmd, category }))
    );
  }, []);

  // Get count for a category
  const getCategoryCount = (category) => {
    if (category === 'All') return allSnippets.length;
    if (category === 'Favorites') return favorites.length;
    if (category === 'Recent') return recentCommands.length;
    return snippetsData[category]?.length || 0;
  };

  // Reset display limit when category or search changes
  React.useEffect(() => {
    setDisplayLimit(20);
  }, [selectedCategory, searchTerm, globalSearch]);

  // Filter snippets based on category and search
  const filteredSnippets = useMemo(() => {
    const searchQuery = globalSearch || searchTerm;
    let snippets;
    
    // Handle special categories
    if (selectedCategory === 'All') {
      snippets = allSnippets;
    } else if (selectedCategory === 'Favorites') {
      snippets = allSnippets.filter(s => favorites.includes(s.command));
    } else if (selectedCategory === 'Recent') {
      snippets = allSnippets.filter(s => recentCommands.includes(s.command))
        .sort((a, b) => recentCommands.indexOf(a.command) - recentCommands.indexOf(b.command));
    } else {
      snippets = allSnippets.filter(s => s.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      snippets = snippets.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return snippets;
  }, [selectedCategory, searchTerm, globalSearch, allSnippets, favorites, recentCommands]);

  // Get displayed snippets with limit
  const displayedSnippets = filteredSnippets.slice(0, displayLimit);
  const hasMore = filteredSnippets.length > displayLimit;

  // Add to recent commands
  const addToRecent = (command) => {
    const newRecent = [command, ...recentCommands.filter(c => c !== command)].slice(0, 10);
    setRecentCommands(newRecent);
    localStorage.setItem('recentCommands', JSON.stringify(newRecent));
  };

  // Toggle favorite
  const toggleFavorite = (command) => {
    const newFavorites = favorites.includes(command)
      ? favorites.filter(c => c !== command)
      : [...favorites, command];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Function to copy text
  const handleCopy = (commandToCopy) => {
    // Use a textarea trick for maximum compatibility
    const textArea = document.createElement('textarea');
    textArea.value = commandToCopy;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedCommand(commandToCopy);
      addToRecent(commandToCopy);
      
      // Show toast notification
      setToastMessage('Command copied!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      
      setTimeout(() => setCopiedCommand(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Error during copy', err);
    }
    document.body.removeChild(textArea);
  };

  // Palette filtered snippets
  const paletteSnippets = useMemo(() => {
    if (!paletteSearch) return allSnippets.slice(0, 50);
    return allSnippets.filter(s =>
      s.title.toLowerCase().includes(paletteSearch.toLowerCase()) ||
      s.command.toLowerCase().includes(paletteSearch.toLowerCase()) ||
      s.description.toLowerCase().includes(paletteSearch.toLowerCase())
    );
  }, [paletteSearch, allSnippets]);

  // Handle palette selection
  const handlePaletteSelect = (snippet) => {
    handleCopy(snippet.command);
    // Don't close immediately - let CommandPalette handle the feedback and timing
  };

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K or / for command palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      // Escape to close
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-[#0D1117] min-h-screen font-mono text-gray-300">
      {/* Toast Notification */}
      <Toast message={toastMessage} isVisible={showToast} />

      {/* Workflows Modal */}
      <WorkflowsModal
        isOpen={workflowsOpen}
        onClose={() => {
          setWorkflowsOpen(false);
          setSelectedWorkflow(null);
        }}
        workflows={workflows}
        selectedWorkflow={selectedWorkflow}
        onSelectWorkflow={setSelectedWorkflow}
        onCopyStep={handleCopy}
        copiedCommand={copiedCommand}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => {
          setCommandPaletteOpen(false);
          setPaletteSearch('');
        }}
        snippets={paletteSnippets}
        onSelect={handlePaletteSelect}
        searchValue={paletteSearch}
        onSearchChange={setPaletteSearch}
      />

      {/* Info Modal */}
      <InfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        totalCommands={allSnippets.length}
      />
      
      <div className="max-w-7xl mx-auto">
        
      {/* Header */}
        <header className="text-center mb-6 sm:mb-10 p-4 sm:p-8 pb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400">
            <span className="text-gray-300">&gt;</span> CmdDeck
            <BlinkingCursor />
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Your deck of ready-to-use Linux commands.</p>
          
          {/* Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-sm text-gray-400 hover:border-green-500/50 hover:text-green-400 transition-colors"
            >
              <CommandIcon size={16} />
              <span className="hidden sm:inline">Quick search</span>
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+K</kbd>
              <span className="hidden sm:inline">or</span>
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">/</kbd>
            </button>
            
            <button
              onClick={() => {
                setWorkflowsOpen(true);
                if (workflows.length > 0) {
                  setSelectedWorkflow(workflows[0]);
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-sm text-gray-400 hover:border-blue-500/50 hover:text-blue-400 transition-colors"
            >
              <FileStack size={16} />
              <span>Workflows</span>
              <span className="hidden sm:inline text-xs text-gray-600">({workflows.length} guides)</span>
            </button>
        </div>
      </header>

        {/* Mobile Category Selector */}
        <div className="md:hidden px-4 mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-left flex items-center justify-between"
          >
            <span className="flex items-center">
              {React.createElement(categoryIcons[selectedCategory], { 
                className: "mr-2", 
                size: 16 
              })}
              <span className={`font-semibold ${
                selectedCategory.includes('Ubuntu') ? 'text-orange-400' :
                selectedCategory.includes('Fedora') ? 'text-blue-400' :
                'text-green-400'
              }`}>
                {selectedCategory}
              </span>
            </span>
            <span className="text-gray-500">
              {mobileMenuOpen ? '▲' : '▼'}
            </span>
          </button>
          
          {/* Mobile Category Menu */}
          {mobileMenuOpen && (
            <div className="mt-2 bg-gray-900 border border-gray-700 rounded-md overflow-hidden">
              {categories.map(category => {
                const IconComponent = categoryIcons[category];
                const isUbuntu = category.includes('Ubuntu');
                const isFedora = category.includes('Fedora');
                
                return (
                <button
                    key={category}
                  onClick={() => {
                      setSelectedCategory(category);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left p-3 flex items-center transition-colors border-b border-gray-800 last:border-b-0 ${
                      selectedCategory === category
                        ? isUbuntu 
                          ? 'bg-orange-500/20 text-orange-300 font-bold'
                          : isFedora
                          ? 'bg-blue-500/20 text-blue-300 font-bold'
                          : 'bg-green-500/20 text-green-300 font-bold'
                        : 'hover:bg-gray-800 text-gray-400'
                    }`}
                  >
                    <IconComponent className="mr-2 flex-shrink-0" size={16} />
                    <span className="flex-1">{category}</span>
                    <span className="text-xs opacity-60">
                      ({getCategoryCount(category)})
                    </span>
                </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 px-4 sm:px-8">
          {/* Desktop Sidebar Categories */}
          <aside className="hidden md:block md:w-1/5">
            <h2 className="text-lg font-semibold text-gray-400 mb-4">CATEGORIES</h2>
            <nav className="flex flex-col gap-2">
              {categories.map(category => {
                const IconComponent = categoryIcons[category];
                const isDistroSpecific = category.includes('Specific');
                const isUbuntu = category.includes('Ubuntu');
                const isFedora = category.includes('Fedora');
                
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left p-3 rounded-md text-sm transition-colors flex items-center ${
                      selectedCategory === category
                        ? isUbuntu 
                          ? 'bg-orange-500/20 text-orange-300 font-bold border border-orange-500/50'
                          : isFedora
                          ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/50'
                          : 'bg-green-500/20 text-green-300 font-bold border border-green-500/50'
                        : isDistroSpecific
                        ? 'hover:bg-gray-800 text-gray-500 border border-transparent'
                        : 'hover:bg-gray-800 text-gray-400 border border-transparent'
                    }`}
                  >
                    <IconComponent className="mr-2 flex-shrink-0" size={16} />
                    <span className="flex-1">{category}</span>
                    <span className="text-xs opacity-60 ml-2">
                      ({getCategoryCount(category)})
                    </span>
                  </button>
                );
              })}
              </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 pb-8">
            {/* Category Header - Hidden on mobile (shown in dropdown) */}
            <div className="hidden md:block mb-6">
              <h2 className={`text-2xl font-bold mb-2 flex items-center ${
                selectedCategory.includes('Ubuntu') 
                  ? 'text-orange-400' 
                  : selectedCategory.includes('Fedora')
                  ? 'text-blue-400'
                  : 'text-green-400'
              }`}>
                {React.createElement(categoryIcons[selectedCategory], { 
                  className: "mr-3", 
                  size: 28 
                })}
                {selectedCategory}
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                {filteredSnippets.length} command{filteredSnippets.length !== 1 ? 's' : ''} available
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-4 sm:mb-6">
              <input
                type="text"
                placeholder={`Search in ${selectedCategory}...`}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-sm sm:text-base text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
              </div>
            
            {/* Results count on mobile */}
            <div className="md:hidden mb-4 text-gray-500 text-xs">
              {filteredSnippets.length} command{filteredSnippets.length !== 1 ? 's' : ''} available
                    </div>

            {/* Snippet Grid */}
            {filteredSnippets.length > 0 ? (
                <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {displayedSnippets.map(snippet => (
                    <SnippetCard 
                    key={snippet.command} 
                    snippet={snippet}
                    onCopy={handleCopy}
                    isCopied={copiedCommand === snippet.command}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.includes(snippet.command)}
                    showCategory={['All', 'Favorites', 'Recent'].includes(selectedCategory)}
                    />
                ))}
                    </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setDisplayLimit(prev => prev + 20)}
                      className="px-6 py-3 bg-gray-900 border border-gray-700 rounded-md text-sm text-gray-400 hover:border-green-500/50 hover:text-green-400 transition-colors inline-flex items-center gap-2"
                    >
                      Load More 
                      <span className="text-xs text-gray-600">
                        ({displayLimit} of {filteredSnippets.length})
                        </span>
                    </button>
                  </div>
                )}
                </>
            ) : (
                <div className="text-center text-gray-500 p-6 sm:p-10 border-2 border-dashed border-gray-700 rounded-lg">
                    <p className="text-sm sm:text-base">
                      {selectedCategory === 'Favorites' ? 'No favorites yet.' :
                       selectedCategory === 'Recent' ? 'No recent commands.' :
                       'No commands found.'}
                    </p>
                    <p className="text-xs sm:text-sm mt-2">
                      {selectedCategory === 'Favorites' ? 'Star commands to add them to favorites!' :
                       selectedCategory === 'Recent' ? 'Copy some commands to see them here.' :
                       'Try modifying your search or changing category.'}
                    </p>
              </div>
            )}
          </main>
        </div>

      </div>

      {/* Floating Info Button */}
      <button
        onClick={() => setInfoModalOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-2 sm:p-2.5 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-md text-gray-400 hover:text-green-400 hover:border-green-500/50 transition-colors z-40"
        title="About CmdDeck"
      >
        <Info size={18} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
