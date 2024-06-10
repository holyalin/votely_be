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

    async register({ email, password: rawPassword, full_name }) {
        if (rawPassword.length < 8) throw new Error('Tidak boleh kurang dari 8!')
        const password = await hashPassword(rawPassword)
        const register = await this.prisma.user.create({
            data: {
                email,
                full_name,
                password
            }
        })
        if(!register) throw new Error('Gagal melakukan register')
        return register
    }
}

module.exports = { AuthService }