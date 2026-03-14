import React, { useState, useEffect } from 'react';
import TopNavbar from '../components/TopNavbar';
import UsernameInput from '../components/UsernameInput';
import ThemeGallery from '../components/ThemeGallery';
import SummaryCard from '../components/SummaryCard';
import ShareButton from '../components/ShareButton';
import Footer from '../components/Footer';
import GridBackground from '../components/GridBackground';
import Toast from '../components/Toast';
import { useGithubCards } from '../hooks/useGithubCards';

const DemoPage: React.FC = () => {
  const [username, setUsername] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('username') || 'octocat';
  });
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('theme') || 'default';
  });
  const { cards, isLoading, error, fetchCards } = useGithubCards();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('username', username);
    params.set('theme', selectedTheme);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
    
    fetchCards(username, selectedTheme);
  }, [username, selectedTheme, fetchCards]);

  const handleGenerate = (newUsername: string) => {
    setUsername(newUsername);
  };
  return (
    <div className="relative min-h-screen font-sans selection:bg-gh-blue/30 overflow-x-hidden">
      <GridBackground />
      {/* Top Progress Bar */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-[2px] z-[100] bg-gh-blue shadow-[0_0_10px_#58a6ff] animate-shimmer bg-[length:200%_100%] transition-opacity duration-300"></div>
      )}

      <div className="relative z-10">
        <TopNavbar />

        <main className="max-w-6xl mx-auto px-4 py-12">
        <UsernameInput onGenerate={handleGenerate} isLoading={isLoading} />
        
        <ThemeGallery 
          selectedTheme={selectedTheme} 
          onSelectTheme={setSelectedTheme} 
        />

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500 text-red-500 rounded-xl text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <SummaryCard
                key={index}
                title={card.title}
                markdown={card.markdown}
                svgUrl={card.svgUrl}
                isLoading={isLoading}
              />
            ))
          ) : !isLoading && !error && (
            <div className="col-span-full py-20 text-center text-gray-500 italic">
              Enter a username to generate summary cards.
            </div>
          )}
        </div>
      </main>

      <Footer />
      <Toast />
      </div>
      <ShareButton />
    </div>
  );
};

export default DemoPage;
