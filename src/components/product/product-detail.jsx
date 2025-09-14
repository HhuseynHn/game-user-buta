"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  ShoppingCart,
  Star,
  Heart,
  Share2,
  Shield,
  Truck,
  Plus,
  Minus,
  MessageSquare,
  Send,
  Clock,
  Gamepad2,
  Wifi,
  WifiOff,
  Play,
  Tag,
  Package,
  Calendar,
  User,
} from "lucide-react";

const ProductDetail = () => {
  const [count, setCount] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "Amazing game! Great graphics and gameplay.",
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      text: "Worth every penny. Highly recommended for RPG fans.",
      createdDate: "2024-01-12",
    },
    {
      id: 3,
      text: "Best game I've played this year. The story is incredible.",
      createdDate: "2024-01-10",
    },
  ]);

  const product = {
    name: "Cyberpunk 2077: Ultimate Edition",
    inStock: true,
    guarantee: "2 years",
    guaranteeContent:
      "Full warranty coverage including technical support and free updates",
    description:
      "Experience the ultimate cyberpunk adventure in Night City. An open-world, action-adventure story set in a world obsessed with power, glamour and body modification. Play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. Customize your character's cyberware, skillset and playstyle.",
    price: 59.99,
    discount: 25,
    type: "Digital Account",
    mode: "online",
    superCategory: "Games",
    subCategory: "Action RPG",
    image:
      "https://pic.rutubelist.ru/video/2025-03-27/21/24/2124809b3643156a7871db7409722bde.jpg",
    video:
      "https://pic.rutubelist.ru/video/2025-03-27/21/24/2124809b3643156a7871db7409722bde.jpg",
    rating: 4.6,
    reviewCount: 1247,
  };

  const discountedPrice = (
    (product.price * (100 - product.discount)) /
    100
  ).toFixed(2);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        text: newComment.trim(),
        createdDate: new Date().toISOString().split("T")[0],
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left - Product Image */}
          <div className="space-y-6">
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white px-3 py-2 rounded-full text-[10px] sm:text-sm font-medium">
                  {product.subCategory}
                </span>
              </div>

              {/* Mode Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                {product.mode === "online" ? (
                  <>
                    <Wifi className="w-4 h-4 text-green-400" />
                    <div className="text-green-400 text-[10px] sm:text-sm font-medium">
                      Online
                    </div>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-gray-400" />
                    <div className="text-gray-400 text-[10px] sm:text-sm font-medium">
                      Offline
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-0 sm:mb-2">
                <span className="text-gray-400 text-[10px] sm:text-sm">
                  {product.superCategory}
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 text-[10px] sm:text-sm">{product.type}</span>
              </div>

              <h1 className="text-2xl md:text-4xl font-bold mb-2 sm:mb-4 text-white">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 sm:w-4 h-3 sm:h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] sm:text-[15px] text-white font-medium">{product.rating}</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-xl sm:text-2xl font-bold text-green-400">
                  ${discountedPrice}
                </div>
                <sup className="text-[11px] sm:text-[15px] text-red-600 line-through">
                  ${product.price.toFixed(2)}
                </sup>
                {/* <span className="bg-red-600 text-[14px] text-white  rounded-lg font-bold">
                  -{product.discount}%
                </span> */}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-3 mb-2 sm:mb-4 mt-4 sm:mt-6">
                <div
                  className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${
                    product.inStock
                      ? "bg-green-400 animate-pulse"
                      : "bg-red-400"
                  }`}></div>
                <span
                  className={`text-[11px] sm:text-[15px] ${
                    product.inStock ? "text-green-400" : "text-red-400"
                  }`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
                {product.inStock && (
                  <span className="text-gray-400 text-[10px] sm:text-[14px]">• Instant delivery</span>
                )}
              </div>

              {/* count Selector */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center jusfity-center  rounded-lg">
                  <button
                    onClick={() => setCount(Math.max(1, count - 1))}
                    className="p-2 sm:p-3 bg-red-600 hover:bg-gray-700 transition-colors rounded-full">
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="px-4 py-3 text-[15px] sm:text-[18px] font-medium">
                    {count}
                  </div>
                  <button
                    onClick={() => setCount(count + 1)}
                    className="p-2 sm:p-3 bg-red-600 hover:bg-gray-700 transition-colors rounded-full">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-4">
                <button
                  className={`flex-1 py-2 sm:py-4 px-6 rounded-xl font-bold text-[10px] sm:text-lg transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 ${
                    product.inStock
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-2xl"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!product.inStock}>
                  <ShoppingCart className="hidden sm:block w-5 h-5" />
                  Add to Cart
                </button>
              </div>

              {/* Product Type & Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-gray-700">
                <div className="flex items-center gap-2 text-[12px] sm:text-[20px]">
                  <Tag className="w-4 sm:w-5 w-4 sm:h-5 text-blue-400" />
                  <div className="text-gray-400 text-[12px] sm:text-[18px]">Type:</div>
                  <div className="text-white text-[11px] sm:text-[16px]">{product.type}</div>
                </div>
            
              </div>
            </div>

            {/* Guarantee Section */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 sm:w-5 w-4 sm:h-5 text-green-400" />
                <div className="text-gray-400 text-[12px] sm:text-[18px]">
                  Guarantee: {product.guarantee}
                </div>
              </div>
              <p className="text-white text-[11px] sm:text-[17px]">
                {product.guaranteeContent}
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-6">Description</h2>
          <p className="text-gray-300 leading-relaxed text-[12px] sm:text-lg">
            {product.description}
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Game Trailer</h2>
          <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden group border border-gray-800 h-[500px] w-full">
            <Image
              src={product.video}
              alt={`${product.name} trailer`}
              fill
              className="object-cover"
            />

            {/* Video Play Button */}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <button className="w-12 sm:w-20 h-8 sm:h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-300 group-hover:scale-110 transform shadow-2xl">
                <Play className="w-8 h-8 text-white ml-1" />
              </button>
            </div>

            {/* Video Label */}
            <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 text-[11px] sm:text-[16px]">
              <Play className="w-3 sm:w-4 h-3 sm:h-4" />
              Official Trailer
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800">
          <h2 className="text-[14px] md:text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 sm:w-6 h-5 sm:h-6 text-red-500" />
            Comments ({comments.length})
          </h2>

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8 relative">
            <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none pr-12"
                rows={3}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900 hover:bg-gray-800 text-white p-1 sm:p-2 rounded-xl transition-colors flex items-center justify-center">
                <Send className="h-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-800 rounded-xl p-3 md:p-5 border border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 md:w-11 md:h-11 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="">
                      <div className="font-medium text-white">Anonymous</div>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Calendar className="w-3 sm:w-4 sm:h-4 h-3" />
                        <div className="text-[10px] sm:text-[13px]">
                          {new Date(comment.createdDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="pl-3 pt-1 text-gray-300 leading-relaxed text-[11px] sm:text-[14px]">{comment.text}</p>
              </div>
            ))}

            {comments.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
