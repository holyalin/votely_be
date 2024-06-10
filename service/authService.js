const { PrismaClient } = require('@prisma/client');
const { comparePassword } = require('../utils');
const { sign, verify } = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../constants')

class AuthService {
    prisma;
    constructor() {
        this.prisma = new PrismaClient()
    }

    async token(token) {
        const storedToken = await this.prisma.token.findUnique({ where: { token } });
        if (!storedToken) throw new Error('Tidak ditemukan');

        verify(token, refreshTokenSecret, (err, user) => {
            if (err) throw new Error('Terjadi masalah');
            const accessToken = sign({ id: user.id, email: user.email }, accessTokenSecret, { expiresIn: '30d' });
            return accessToken
        });
    }

    async login({ email, password }) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        const compare = await comparePassword(password, user?.password)
        if (user && compare) {
            const accessToken = await sign({ id: user.user_id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
            const refreshToken = await sign({ id: user.user_id, email: user.email }, REFRESH_TOKEN_SECRET);
            await this.prisma.token.create({
                data: {
                    token: refreshToken,
                    user_id: user.user_id
                }
            })
            return { access_token: accessToken, refresh_token: refreshToken, user: { email: user?.email, full_name: user?.full_name } }
        }
        return false
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