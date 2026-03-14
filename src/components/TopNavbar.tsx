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
        <img src="/src/assets/favicon/favicon.svg" alt="GitGlyph Logo" className="w-8 h-8" />
        <span className="font-bold text-xl tracking-tight text-gh-foreground transition-colors">GitGlyph</span>
      </div>
      <label className="theme-toggle-switch scale-125 md:scale-150 origin-right mr-4">
        <input 
          type="checkbox" 
          checked={isDark}
          onChange={toggleTheme}
        />
        <span className="theme-toggle-slider" />
      </label>
    </nav>
  );
};

export default TopNavbar;
