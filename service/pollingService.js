const { PrismaClient } = require('@prisma/client')

class CategoryService {
    prisma;
    constructor() {
        this.prisma = new PrismaClient()
    }

    async createCategory({ name, owner_id }) {
        const category = await this.prisma.category.count({
            where: {
                name
            }
        })
        if (category) throw new Error(`${name} sudah terpakai`)
        return await this.prisma.category.create({
            data: {
                name,
                owner_id
            }
        })
    }

    async allCategory() {
        return await this.prisma.category.findMany({})
    }
}

module.exports = { CategoryService }