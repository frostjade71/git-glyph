import React from 'react';
import CopyButton from './CopyButton';

interface SummaryCardProps {
  title: string;
  markdown: string;
  svgUrl?: string; // Add svgUrl prop
  isLoading?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, markdown, svgUrl, isLoading }) => {
  return (
    <article className="bg-[var(--card)] border border-[var(--border)] rounded-xl transition-all duration-300 card-hover-effect flex flex-col h-full shadow-sm overflow-visible">
      <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--card)]/50 relative rounded-t-xl">
        <h3 className="font-bold text-gh-foreground">{title}</h3>
        <CopyButton textToCopy={markdown} />
      </div>
      
      <div className="flex-grow p-4 min-h-[160px] flex items-center justify-center relative bg-[#090c10] overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full skeleton-shimmer rounded-lg"></div>
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-lg overflow-hidden">
            {svgUrl ? (
              <img 
                src={svgUrl} 
                alt={title} 
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = ''; // Clear src on error
                  (e.target as HTMLImageElement).alt = 'Failed to load preview';
                }}
              />
            ) : (
              <div className="text-gray-500 italic text-sm border border-dashed border-gh-border p-8 rounded-lg w-full text-center">
                Preview for {title}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 bg-gh-foreground/5 relative border-t border-[var(--border)] rounded-b-xl overflow-hidden">
        <code className="text-[13px] font-mono text-gh-foreground/70 break-all leading-relaxed block">
          {markdown}
        </code>
      </div>
    </article>
  );
};

export default SummaryCard;
