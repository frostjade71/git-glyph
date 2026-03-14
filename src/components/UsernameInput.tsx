import React, { useState, useEffect } from 'react';

interface UsernameInputProps {
  onGenerate: (username: string) => void;
  isLoading?: boolean;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ onGenerate, isLoading }) => {
  const [username, setUsername] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isLoading && hasStarted) {
      setIsSuccess(true);
      setHasStarted(false);
      const timer = setTimeout(() => setIsSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, hasStarted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    if (cleanUsername && !isLoading) {
      setHasStarted(true);
      onGenerate(cleanUsername);
    }
  };

  const isButtonDisabled = isLoading || !username.trim();

  return (
    <section className="text-center mb-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gh-foreground tracking-tight">Showcase Your GitHub Journey</h1>
      <p className="text-gh-foreground/70 text-lg mb-8 max-w-2xl mx-auto font-medium">
        Generate beautiful, customizable summary cards for your GitHub profile with GitGlyph.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setIsSuccess(false);
            }}
            placeholder="Enter GitHub Username"
            className="w-full px-6 py-4 bg-gh-input border-2 border-gh-border rounded-xl focus:ring-2 focus:ring-gh-blue focus:border-transparent outline-none transition-all placeholder:text-gray-500 text-gh-foreground shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`min-w-[180px] whitespace-nowrap px-8 py-4 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${
            isSuccess 
              ? 'bg-gh-neon text-gh-bg shadow-gh-neon/20' 
              : 'bg-gh-blue hover:bg-opacity-90 text-white shadow-gh-blue/20'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating...
            </>
          ) : isSuccess ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Generated!
            </>
          ) : (
            'Generate Card'
          )}
        </button>
      </form>
    </section>
  );
};

export default UsernameInput;
