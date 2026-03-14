import React, { useEffect, useState } from 'react';

const TopNavbar: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default to dark as per design
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--background)] dark:bg-gh-bg/80 backdrop-blur-md border-b border-gh-border px-4 py-3 flex items-center justify-between transition-colors">
      <div className="flex items-center space-x-3">
        <img src="/favicon.svg" alt="GitGlyph Logo" className="w-8 h-8" />
        <span className="font-bold text-xl tracking-tight text-gh-foreground transition-colors">GitGlyph</span>
      </div>
      <div className="flex items-center">
        <div className="flex items-center space-x-4 mr-8">
          <a 
            href="https://github.com/vn7n24fzkq/github-profile-summary-cards" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center space-x-1.5 text-gh-foreground/60 hover:text-gh-foreground transition-all duration-200 group"
          >
            <svg height="18" width="18" viewBox="0 0 16 16" fill="currentColor" className="opacity-80 group-hover:opacity-100 transition-opacity">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span className="text-sm font-medium hidden md:inline">Original</span>
          </a>
          <a 
            href="https://github.com/frostjade71/git-glyph" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-gh-foreground/60 hover:text-gh-foreground transition-all duration-200 group"
          >
            <svg height="18" width="18" viewBox="0 0 16 16" fill="currentColor" className="opacity-80 group-hover:opacity-100 transition-opacity">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span className="text-sm font-medium hidden md:inline">Redesign</span>
          </a>
        </div>
        
        <label className="theme-toggle-switch scale-125 md:scale-150 origin-right mr-4">
          <input 
            type="checkbox" 
            checked={isDark}
            onChange={toggleTheme}
          />
          <span className="theme-toggle-slider" />
        </label>
      </div>
    </nav>
  );
};

export default TopNavbar;
