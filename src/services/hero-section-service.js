export class HeroSectionService {
  data = [
    {
      id: 1,
      imagePath: "https://i.playground.ru/p/_EMd1bMfWFxvR1oikevTiw.jpeg",
    },
    {
      id: 2,
      imagePath:
        "https://i.pinimg.com/736x/61/90/ec/6190ec11735c0d7f3a010258910b340f.jpg",
    },
    {
      id: 3,
      imagePath: "https://i.playground.ru/p/_EMd1bMfWFxvR1oikevTiw.jpeg",
    },
    {
      id: 4,
      imagePath:
        "https://i.pinimg.com/736x/61/90/ec/6190ec11735c0d7f3a010258910b340f.jpg",
    },
  ];
  async list() {

    return this.data
  }
}

export const heroSectionService=new HeroSectionService()