import React, { useState, useRef, useEffect } from 'react';

interface Theme {
  id: string;
  name: string;
  color: string;
}

const THEMES: Theme[] = [
  { id: 'default', name: 'Default', color: '#58a6ff' },
  { id: '2077', name: '2077', color: '#f2e600' },
  { id: 'dracula', name: 'Dracula', color: '#ff79c6' },
  { id: 'github', name: 'GitHub', color: '#24292e' },
  { id: 'github_dark', name: 'GitHub Dark', color: '#09090b' },
  { id: 'gruvbox', name: 'Gruvbox', color: '#d65d0e' },
  { id: 'monokai', name: 'Monokai', color: '#a6e22e' },
  { id: 'nord_bright', name: 'Nord Bright', color: '#e5e9f0' },
  { id: 'nord_dark', name: 'Nord Dark', color: '#88c0d0' },
  { id: 'radical', name: 'Radical', color: '#fe428e' },
  { id: 'solarized', name: 'Solarized', color: '#b58900' },
  { id: 'solarized_dark', name: 'Solarized Dark', color: '#073642' },
  { id: 'tokyonight', name: 'Tokyo Night', color: '#7aa2f7' },
  { id: 'vue', name: 'Vue', color: '#42b883' },
  { id: 'zenburn', name: 'Zenburn', color: '#dcdccc' },
  { id: 'transparent', name: 'Transparent', color: 'rgba(100,100,100,0.2)' },
];

interface ThemeGalleryProps {
  selectedTheme: string;
  onSelectTheme: (themeId: string) => void;
}

const ThemeGallery: React.FC<ThemeGalleryProps> = ({ selectedTheme, onSelectTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTheme = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="mb-12 px-4 relative flex flex-col items-end" ref={dropdownRef}>
      <h2 className="text-xs font-bold text-gh-foreground/50 uppercase tracking-[0.2em] mb-4 text-right">Appearance</h2>
      
      <div className="relative w-full max-w-[240px]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-5 py-4 bg-gh-card border-2 border-gh-border rounded-xl flex items-center justify-between hover:border-gh-blue/50 transition-all group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span 
              className="w-4 h-4 rounded-full ring-2 ring-gh-foreground/5 shadow-inner" 
              style={{ backgroundColor: currentTheme.color }}
            />
            <span className="font-bold text-gh-foreground">{currentTheme.name}</span>
          </div>
          <svg 
            className={`w-5 h-5 text-gh-foreground/50 group-hover:text-gh-blue transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full mt-3 right-0 w-64 bg-gh-card border-2 border-gh-border rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-h-[320px] overflow-y-auto py-2 custom-scrollbar">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-5 py-3 flex items-center gap-3 hover:bg-gh-foreground/5 transition-colors ${
                    selectedTheme === theme.id ? 'bg-gh-blue/10 text-gh-blue' : 'text-gh-foreground'
                  }`}
                >
                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: theme.color }}
                  />
                  <span className={`text-sm ${selectedTheme === theme.id ? 'font-bold' : 'font-medium'}`}>
                    {theme.name}
                  </span>
                  {selectedTheme === theme.id && (
                    <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ThemeGallery;
