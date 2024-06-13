const { PrismaClient } = require('@prisma/client')

class PollingService {
    prisma;
    constructor() {
        this.prisma = new PrismaClient()
    }

    async createPolling({ name, image_url, description, owner_id, deadline_at, category_id }) {
        const polling = await this.prisma.polling.count({
            where: {
                name
            }
        })
        if (polling) throw new Error(`${name} sudah terpakai`)
        return await this.prisma.polling.create({
            data: {
                name, image_url, description, owner_id, deadline_at, category_id
            }
        })
    }

    async allPolling({ category_id }) {
        let criteria = {}
        if (category_id) {
            criteria = {
                category_id
            }
        }
        return await this.prisma.polling.findMany({
            where: criteria,
            orderBy: {
                created_at: 'desc'
            }
        })
    }
}

module.exports = { PollingService }