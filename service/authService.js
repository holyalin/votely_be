const { PrismaClient } = require('@prisma/client')

class AuthService {
    async login(email, name) {
        const prisma = new PrismaClient()
        const test = await prisma.User.create({
            data: {
                email,
                name,
                created_at: new Date(),
            }
        })
        console.log({ test })
        return test
    }
}

module.exports = { AuthService }