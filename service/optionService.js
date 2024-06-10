const { PrismaClient } = require("@prisma/client");

class OptionService {
  constructor() {}

  async addOption(categoryId, name, img, name_category) {
    try {
      const prisma = new PrismaClient();
      const option = await prisma.Option.create({
        data: {
          categoryId: categoryId,
          name: name,
          img: img,
          name_category: name_category,
          createdAt: new Date(),
        },
      });
      return option;
    } catch (error) {
      console.error("Error adding option:", error);
      throw error;
    }
  }

  async showAllOptions() {
    try {
      const prisma = new PrismaClient();
      const options = await prisma.Option.findMany({
        include: {
          category: true,
        },
      });
      return options;
    } catch (error) {
      console.error("Error fetching options:", error);
      throw error;
    }
  }
}

module.exports = { OptionService };