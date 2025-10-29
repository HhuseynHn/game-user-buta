export const bestSellerProducts = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Best Seller Game ${i + 1}`,
  price: `$${(Math.random() * 80 + 20).toFixed(2)}`,
  originalPrice: `$${(Math.random() * 100 + 60).toFixed(2)}`,
  discount: `${Math.floor(Math.random() * 40 + 15)}%`,
  inStock: Math.random() > 0.15,
  guarantee: `${Math.floor(Math.random() * 3 + 1)} years`,
  rating: (Math.random() * 1.5 + 3.5).toFixed(1),
  reviews: Math.floor(Math.random() * 1000 + 100),
  soldCount: Math.floor(Math.random() * 5000 + 1000),
  image:
    "https://pic.rutubelist.ru/video/2025-03-27/21/24/2124809b3643156a7871db7409722bde.jpg",
  category: ["Action", "Adventure", "RPG", "Strategy", "Sports"][
    Math.floor(Math.random() * 5)
  ],
  rank: i + 1,
  isTopSeller: i < 3,
}));

