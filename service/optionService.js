
const { PrismaClient } = require('@prisma/client')

class OptionService {
    prisma;
    constructor() {
        this.prisma = new PrismaClient()
    }

    async optionDetail({ option_id, polling_id }) {
        return await this.prisma.option.findFirst({
            where: {
                option_id,
                polling_id
            }
        })
    }

    async createOption({ polling_id, name, image_url, owner_id }) {
        return await this.prisma.option.create({
            data: {
                polling_id, name, image_url, owner_id
            }
        })
    }

    async optionByPolling({ polling_id }) {
        return await this.prisma.option.findMany({
            where: {
                polling_id
            },
            orderBy: {
                created_at: 'desc'
            }
        })
    }
}

module.exports = { OptionService }
