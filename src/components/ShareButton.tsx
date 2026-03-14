import React from 'react';

const ShareButton: React.FC = () => {
  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    
    // Use global toast system
    const event = new CustomEvent('show-toast', { detail: 'Copied sharing link!' });
    window.dispatchEvent(event);
  };

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gh-blue text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-40 border-none outline-none group"
      title="Share your cards"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    </button>
  );
};

export default ShareButton;
