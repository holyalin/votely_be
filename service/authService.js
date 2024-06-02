const { PrismaClient } = require('@prisma/client')

class AuthService {
    async login(email, name, password) {
        const prisma = new PrismaClient()
        const test = await prisma.User.create({
            data: {
                email,
                name,
                password,
                created_at: new Date(),
            }
        })
        console.log({ test })
        return test
    }

    async register(email, name, password) {
        const prisma = new PrismaClient()
        const test = await prisma.User.create({
            data: {
                email,
                name,
                password,
                created_at: new Date(),
            }
        })
        console.log({ test })
        return test
    }
}

module.exports = { AuthService }