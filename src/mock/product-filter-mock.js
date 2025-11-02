export  const allProductsMock = Array.from({ length: 48 }, (_, i) => ({
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
