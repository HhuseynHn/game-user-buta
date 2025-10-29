import { useState, useEffect } from "react";

export const useSearchLogic = (mockGames, onGameSelect) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const RESULTS_LIMIT = 3;

  // Debug logging
  useEffect(() => {
    console.log('mockGames in hook:', mockGames);
    console.log('mockGames type:', typeof mockGames);
    console.log('mockGames is array:', Array.isArray(mockGames));
  }, [mockGames]);

  const filterGames = (term) => {
    console.log('Filtering with term:', term);
    console.log('Available games:', mockGames);

    // Add validation to prevent errors
    if (!term || !mockGames || !Array.isArray(mockGames)) {
      console.log('No term or mockGames invalid');
      return [];
    }

    const results = mockGames.filter(game => {
      // Ensure game object exists and has required properties
      if (!game || typeof game !== 'object') {
        console.log('Invalid game object:', game);
        return false;
      }

      const title = game.title || "";
      const genre = game.genre || "";
      const searchLower = term.toLowerCase();

      const titleMatch = title.toLowerCase().includes(searchLower);
      const genreMatch = genre.toLowerCase().includes(searchLower);

      return titleMatch || genreMatch;
    });

    console.log('Filter results:', results);
    return results;
  };

  const getDisplayResults = () => {
    if (showAllResults) return allResults;
    return allResults.slice(0, RESULTS_LIMIT);
  };

  const hasMoreResults = () => allResults.length > RESULTS_LIMIT;

  useEffect(() => {
    console.log('Search term changed:', searchTerm);

    if (searchTerm.length > 0) {
      const filtered = filterGames(searchTerm);
      console.log('Setting results:', filtered);
      setAllResults(filtered);
      setShowResults(true);
      setShowAllResults(false);
      setSelectedIndex(-1);
    } else {
      setAllResults([]);
      setShowResults(false);
      setShowAllResults(false);
    }
  }, [searchTerm, mockGames]);

  const handleKeyDown = (e) => {
    const displayResults = getDisplayResults();
    if (!showResults || displayResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < displayResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleGameSelect(displayResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setShowAllResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleGameSelect = (game) => {
    if (!game) return;

    setSearchTerm(game.title || "");
    setShowResults(false);
    setShowAllResults(false);
    setSelectedIndex(-1);
    onGameSelect?.(game);
  };

  const handleViewAll = () => {
    setShowAllResults(true);
    setSelectedIndex(-1);
  };

  return {
    searchTerm,
    allResults,
    showResults,
    showAllResults,
    selectedIndex,
    setSearchTerm,
    setShowResults,
    setShowAllResults,
    handleKeyDown,
    handleGameSelect,
    handleViewAll,
    getDisplayResults,
    hasMoreResults
  };
};