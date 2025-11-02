export const generatedMock = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Premium Game ${i + 1}`,
  price: `$${(Math.random() * 60 + 10).toFixed(2)}`,
  originalPrice: `$${(Math.random() * 80 + 50).toFixed(2)}`,
  discount: `${Math.floor(Math.random() * 30 + 10)}%`,
  inStock: Math.random() > 0.2,
  guarantee: `${Math.floor(Math.random() * 3 + 1)} years`,
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 500 + 50),
  image:
    "https://pic.rutubelist.ru/video/2025-03-27/21/24/2124809b3643156a7871db7409722bde.jpg",
  category: ["Action", "Adventure", "RPG", "Strategy"][
    Math.floor(Math.random() * 4)
  ],
}));
