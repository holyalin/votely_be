const { PrismaClient } = require("@prisma/client");

class PollingService {
  async createPolling(user_id, category, title, name, img) {
    const prisma = new PrismaClient();
    return await prisma.polling.create({
      data: {
        user_id,
        category,
        title,
        name,
        img,
        deadline: new Date(),
        createdAt: new Date(),
      },
    });
  }
  // async polling(email, name, password) {
  //     const prisma = new PrismaClient()
  //     const test = await prisma.User.create({
  //         data: {
  //             email,
  //             name,
  //             password,
  //             created_at: new Date(),
  //         }
  //     })
  //     console.log({ test })
  //     return test
  // }

  // async register(email, name, password) {
  //     const prisma = new PrismaClient()
  //     const test = await prisma.User.create({
  //         data: {
  //             email,
  //             name,
  //             password,
  //             created_at: new Date(),
  //         }
  //     })
  //     console.log({ test })
  //     return test
  // }
}

module.exports = { PollingService };
