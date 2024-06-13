const { PrismaClient } = require('@prisma/client')
const { OptionService } = require('./optionService');
const { formattingDate } = require('../utils');

class PollingService {
    prisma;
    optionService;
    constructor() {
        this.prisma = new PrismaClient()
        this.optionService = new OptionService()
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
                name, image_url, description, owner_id, deadline_at: formattingDate(deadline_at), category_id
            }
        })
    }

    async poll({ owner_id, polling_id, option_id }) {
        return await this.prisma.history.create({
            data: {
                owner_id,
                polling_id,
                option_id,
            }
        })
    }

    async checkPoll({ polling_id, option_id, owner_id }) {
        return await this.prisma.history.findFirst({
            where: {
                polling_id,
                option_id,
                owner_id
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

    async pollingDetail({ polling_id }) {
        const options = await this.optionService.optionByPolling({ polling_id })
        const polling = await this.prisma.polling.findFirst({
            where: {
                polling_id
            }
        })
        return {
            ...polling,
            options
        }
    }
}

module.exports = { PollingService }