const { PrismaClient } = require('@prisma/client')

class CategoryService {
    prisma;
    constructor() {
        this.prisma = new PrismaClient()
    }

    async createCategory({ name, owner_id }) {
        return await this.prisma.category.create({
            data: {
                name,
                owner_id
            }
        })
    }
}

module.exports = { CategoryService }