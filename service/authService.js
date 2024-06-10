const { PrismaClient } = require('@prisma/client');
const { hashPassword, comparePassword } = require('../utils');
const { sign } = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../constants')

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

    async login({ email, password }) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        const compare = await comparePassword(password, user?.password)
        if (user && compare) {
            const accessToken = await sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
            const refreshToken = await sign({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET);

            await prisma.token.create({
                data: {
                    token: refreshToken,
                    userId: user.id
                }
            });
        }
        return true
    }

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