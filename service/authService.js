const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../utils');

class AuthService {
    prisma;
    constructor() {
        this.prisma = new PrismaClient()
    }
    // async login(email, name, password) {
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

    async register({ email, password, full_name }) {
        const user = await this.prisma.user.count({
            where: {
                email
            }
        })
        if (user) throw new Error(`Email ${email} sudah digunakan`)
        const register = await this.prisma.user.create({
            data: {
                email,
                full_name,
                password
            }
        })
        if (!register) throw new Error('Gagal melakukan register')
        return register
    }
}

module.exports = { AuthService }