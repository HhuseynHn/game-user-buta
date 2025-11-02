export const recommendedProductsMock = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    name: `Recommended Game ${i + 1}`,
    price: `$${(Math.random() * 70 + 25).toFixed(2)}`,
    originalPrice: `$${(Math.random() * 90 + 50).toFixed(2)}`,
    discount: `${Math.floor(Math.random() * 35 + 20)}%`,
    inStock: Math.random() > 0.1,
    guarantee: `${Math.floor(Math.random() * 3 + 1)} years`,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 800 + 150),
    image: "https://pic.rutubelist.ru/video/2025-03-27/21/24/2124809b3643156a7871db7409722bde.jpg",
    category: ["Action", "Adventure", "RPG", "Strategy", "Sports", "Indie", "Simulation"][Math.floor(Math.random() * 7)],
    reasonType: ["Similar to your favorites", "Based on your wishlist", "Friends are playing", "Trending in your region", "Perfect for your playtime"][Math.floor(Math.random() * 5)],
  }));
  