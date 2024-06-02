const { PrismaClient } = require('@prisma/client')

class CategoryService {
    async category(name_category) {
        const prisma = new PrismaClient()
        const test = await prisma.Category.create({
            data: {
                name_category,
            }
        })
        return test
    }

    async showAllCategory () {
        const prisma = new PrismaClient()
        const category = await prisma.Category.findMany();
        return category
    }
}

module.exports = { CategoryService }