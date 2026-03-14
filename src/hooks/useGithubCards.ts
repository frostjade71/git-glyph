import { useState, useCallback } from 'react';

interface CardData {
  title: string;
  svgUrl: string;
  markdown: string;
}

interface UseGithubCardsReturn {
  cards: CardData[];
  isLoading: boolean;
  error: string | null;
  fetchCards: (username: string, theme: string) => void;
}

const API_BASE = 'https://github-profile-summary-cards.vercel.app/api/cards';

export const useGithubCards = (): UseGithubCardsReturn => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMarkdown = (title: string, svgUrl: string, username: string) => {
    return `[![${title}](${svgUrl})](https://github.com/${username})`;
  };

  const fetchCards = useCallback(async (username: string, theme: string) => {
    if (!username) return;

    setIsLoading(true);
    setError(null);

    try {
      const endpoints = [
        { key: 'profile-details', title: 'Profile Details' },
        { key: 'repos-per-language', title: 'Repos Per Language' },
        { key: 'most-commit-language', title: 'Most Commit Language' },
        { key: 'stats', title: 'Stats' },
        { key: 'productive-time', title: 'Productive Time', params: '&utcOffset=8' },
      ];

      const newCards = endpoints.map((endpoint) => {
        const svgUrl = `${API_BASE}/${endpoint.key}?username=${username}&theme=${theme}${endpoint.params || ''}`;
        return {
          title: endpoint.title,
          svgUrl,
          markdown: generateMarkdown(endpoint.title, svgUrl, username),
        };
      });

      // Synthetic delay to show loading state if desired, but here we just set it
      setCards(newCards);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError('Failed to fetch cards. Please ensure the username is valid and has public activity.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { cards, isLoading, error, fetchCards };
};
