const { PrismaClient } = require("@prisma/client");

class HomepageService {
  async showAllOption() {
    const prisma = new PrismaClient();
    return await prisma.polling.findMany();
  }
}

module.exports = { HomepageService };