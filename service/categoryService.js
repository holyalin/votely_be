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
}

module.exports = { PollingService }