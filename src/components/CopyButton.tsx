import React, { useState } from 'react';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Dispatch a custom event for toast notification if implemented globally
      const event = new CustomEvent('show-toast', { detail: 'Copied to clipboard!' });
      window.dispatchEvent(event);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="relative p-2 bg-gh-foreground/10 hover:bg-gh-foreground/20 rounded-lg transition-colors text-gh-foreground group"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <svg className="w-4 h-4 text-gh-neon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      )}
    </button>
  );
};

export default CopyButton;
