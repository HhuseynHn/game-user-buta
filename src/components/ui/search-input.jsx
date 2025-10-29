"use client"
import { mockGames } from "@/mock/mock-games";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "./input";
import { useSearchLogic } from "./use-search-logic";
import Image from "next/image";
import { useRouter } from "next/navigation";


const SearchInput = ({ placeholder, className = "", onGameSelect }) => {
  const {
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
  } = useSearchLogic(mockGames, onGameSelect);

  const searchRef = useRef(null);
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        setShowAllResults(false);

      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowResults, setShowAllResults]);

  const handleSearch = () => {
    if (!searchTerm.trim()) return
    router.push(`/product-filter?search=${encodeURIComponent(searchTerm)}`)
  };

  const handleInputFocus = () => {
    if (allResults.length > 0) {
      setShowResults(true);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };
  const displayResults = getDisplayResults();
  const maxInitialResults = 5;
  const initialResults = showAllResults ? displayResults : displayResults.slice(0, maxInitialResults);
  const remainingCount = displayResults.length - maxInitialResults;

  return (
    <div className="relative" ref={searchRef}>
      <Input
        className={`px-4 py-2 border border-gray-300 rounded-lg
        text-sm placeholder:text-gray-400
        focus:outline-none focus:ring-0.5 focus:ring-red-800
        hover:border-red-800 transition-all duration-200 bg-inherit
        w-full sm:w-72 md:w-96 lg:w-[28rem] xl:w-[32rem] ${className}`}
        placeholder={placeholder || "Search for the game you want"}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyPress}
        autoComplete="off"
      />

      {/* Search Results Dropdown */}
      {showResults && displayResults.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
          {/* Results List */}
          <div
            className={`${showAllResults
              ? 'max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-800 hover:scrollbar-thumb-red-500'
              : 'max-h-auto'
              }`}
          >
            {initialResults.map((game, index) => (
              <div
                key={game.id}
                onClick={() => handleGameSelect(game)}
                className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 border-b border-gray-800 last:border-b-0
                  ${selectedIndex === index ? 'bg-red-900/30' : 'hover:bg-gray-800/50'}
                `}
              >
                {/* Game Image */}
                <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-800 border border-gray-700">
                  {game.image && (game.image.startsWith("/") || game.image.startsWith("http")) ? (
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex items-center justify-center w-full h-full text-2xl">
                      🎮
                    </span>
                  )}
                </div>

                {/* Game Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white truncate text-sm">
                    {game.name}
                  </h4>
                  {game.title && (
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {game.title}
                    </p>
                  )}

                  {/* Price Section */}
                  <div className="flex items-center gap-2 mt-1">
                    {game.discount && game.discount > 0 ? (
                      <>
                        <span className="text-xs font-bold text-white bg-red-600 px-1.5 py-0.5 rounded">
                          -{game.discount}%
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          ${game.originalPrice?.toFixed(2)}
                        </span>
                        <span className="text-sm font-bold text-red-500">
                          ${game.price?.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-bold text-white">
                        ${game.price ? Number(game.price).toFixed(2) : "0.00"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          {!showAllResults && remainingCount > 0 && (
            <button
              onClick={handleViewAll}
              className="w-full py-3 text-center text-sm font-semibold text-red-500 hover:text-red-400 bg-gray-900/50 hover:bg-gray-800/50 transition-colors duration-200 border-t border-gray-800"
            >
              View All Results ({remainingCount} more)
            </button>
          )}

          {/* Collapse Button */}
          {showAllResults && (
            <button
              onClick={() => setShowAllResults(false)}
              className="w-full py-3 text-center text-sm font-semibold text-gray-400 hover:text-gray-300 bg-gray-900/50 hover:bg-gray-800/50 transition-colors duration-200 border-t border-gray-800"
            >
              Show Less
            </button>
          )}
        </div>
      )}

      {/* No Results */}
      {showResults && searchTerm && displayResults.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700 p-6 text-center">
          <div className="text-gray-500 mb-2">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="text-white font-medium">No games found</p>
          <p className="text-gray-400 text-sm mt-1">Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
};

export default SearchInput;