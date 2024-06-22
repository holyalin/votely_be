const { PrismaClient } = require("@prisma/client");

class OptionService {
  prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async optionDetail({ option_id, polling_id }) {
    return await this.prisma.option.findFirst({
      where: {
        option_id,
        polling_id,
      },
    });
  }

  async createOption({ polling_id, name, image_url, owner_id }) {
    if (!polling_id || isNaN(parseInt(polling_id))) {
      throw new Error("Invalid or missing polling_id");
    }
    return await this.prisma.option.create({
      data: {
        polling_id: parseInt(polling_id), // Convert polling_id to an integer
        name,
        image_url,
        owner_id: parseInt(owner_id), // Ensure owner_id is also an integer
      },
    });
  }

  async optionByPolling({ polling_id }) {
    return await this.prisma.option.findMany({
      where: {
        polling_id,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }
}

module.exports = { OptionService };
