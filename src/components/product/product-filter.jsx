"use client";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ShoppingCart,
  Star,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  SlidersHorizontal,
} from "lucide-react";

const ProductFilter = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedSuperCategory, setSelectedSuperCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const itemsPerPage = 12;

  // Mock data
  const allProducts = Array.from({ length: 48 }, (_, i) => ({
    id: i + 1,
    name: `Game Title ${i + 1}`,
    price: Math.floor(Math.random() * 80 + 10),
    originalPrice: Math.floor(Math.random() * 100 + 50),
    discount: Math.floor(Math.random() * 50 + 10),
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 1000 + 100),
    image:
      "https://pic.rutubelist.ru/video/2025-03-27/21/24/2124809b3643156a7871db7409722bde.jpg",
    mode: ["online", "offline", "both"][Math.floor(Math.random() * 3)],
    superCategory: ["Games", "Software", "DLC"][Math.floor(Math.random() * 3)],
    subCategory: ["Action", "Adventure", "RPG", "Strategy", "Sports", "Racing"][
      Math.floor(Math.random() * 6)
    ],
    inStock: Math.random() > 0.2,
  }));

  const filterOptions = {
    modes: ["online", "offline", "both"],
    superCategories: ["Games", "Software", "DLC"],
    subCategories: [
      "Action",
      "Adventure",
      "RPG",
      "Strategy",
      "Sports",
      "Racing",
    ],
  };

  // Filter products based on criteria
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Text search
      if (
        searchText &&
        !product.name.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return false;
      }

      // Mode filter
      if (selectedMode && product.mode !== selectedMode) {
        return false;
      }

      // Price range filter
      if (priceRange.min && product.price < parseInt(priceRange.min)) {
        return false;
      }
      if (priceRange.max && product.price > parseInt(priceRange.max)) {
        return false;
      }

      // Category filters
      if (
        selectedSuperCategory &&
        product.superCategory !== selectedSuperCategory
      ) {
        return false;
      }
      if (selectedSubCategory && product.subCategory !== selectedSubCategory) {
        return false;
      }

      return true;
    });
  }, [
    searchText,
    selectedMode,
    priceRange,
    selectedSuperCategory,
    selectedSubCategory,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const clearFilters = () => {
    setSearchText("");
    setSelectedMode("");
    setPriceRange({ min: "", max: "" });
    setSelectedSuperCategory("");
    setSelectedSubCategory("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Browse Games</h1>
          <p className="text-[12px] sm:text-[16px] text-gray-400">Find your next favorite game</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Filter className="w-5 h-5 text-red-500" />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-white-500 hover:text-red-400 text-sm font-medium transition-colors">
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Search Input */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Search games..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Mode Filter */}
                <div>
                  <label className="block text-sm font-medium mb-3">Mode</label>
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="">All Modes</option>
                    {filterOptions.modes.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      placeholder="Min"
                      className=" w-[100px] flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <span className="text-gray-400 self-center">-</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      placeholder="Max"
                      className=" w-[100px] flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Super Category */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Category
                  </label>
                  <select
                    value={selectedSuperCategory}
                    onChange={(e) => setSelectedSuperCategory(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="">All Categories</option>
                    {filterOptions.superCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sub Category */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Sub Category
                  </label>
                  <select
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="">All Sub Categories</option>
                    {filterOptions.subCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold">
                  {filteredProducts.length} Games Found
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}>
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div
                className={`grid gap-6 mb-8 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}>
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-700 transform hover:-translate-y-2 ${
                      viewMode === "list" ? "flex" : ""
                    }`}>
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ${
                        viewMode === "list" ? "w-48 h-32" : "h-48"
                      }`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Stock Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            product.inStock
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-1 ${
                              product.inStock ? "bg-emerald-400" : "bg-red-400"
                            }`}
                          />
                          {product.inStock ? "In Stock" : "Out"}
                        </span>
                      </div>

                      {/* Discount Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          -{product.discount}%
                        </span>
                      </div>

                      {/* Mode Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                          {product.mode}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                      {/* Category */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-red-600 text-white rounded-full">
                          {product.subCategory}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-bold text-lg text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400 ml-1">
                          {product.rating}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold !text-red">
                          ${product.price}
                        </span>
                        <span className="text-sm !text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          className={`flex-1 py-2 px-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                            product.inStock
                              ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transform hover:scale-105"
                              : "bg-gray-700 text-gray-400 cursor-not-allowed"
                          }`}
                          disabled={!product.inStock}>
                          <ShoppingCart className="hidden sm:block w-4 h-4" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                   
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">
                  No games found
                </h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                  <span className="text-white">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
