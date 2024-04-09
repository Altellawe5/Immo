const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { checkBlackList, tokenBlacklist } = require('../middleware/checkBlackList')

const AdminControllers = {
    register: async (req, res) => {
        try {
            const { email, password, firstName, lastName } = req.body
            let admin = await prisma.user.findUnique({ where: { email } })
            if (admin) {
                return res.status(400).json({ message: "Admin already exists" })
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            admin = await prisma.user.create(
                {
                    data: {
                        email,
                        password: hashedPassword,
                        firstName,
                        lastName
                    }
                }
            )
            res.status(201).json({ message: "Admin created", admin })
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const admin = await prisma.user.findUnique({ where: { email } })
            if (!admin) {
                return res.status(400).json({ message: "Admin does not exist" })
            }
            const isMatch = await bcrypt.compare(password, admin.password)
            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect password" })
            }


            const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.json({ token, admin })
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    findById: async (req, res) => {
        try {
            const id = req.params.id
            const admin = await prisma.user.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    firstName: true,
                    lastName: true,
                    email: true
                }
            })
            if (!admin) {
                return res.status(400).json({ message: "Admin does not exist" })
            }
            res.status(200).json(admin)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    deleteAdmin: async (req, res) => {
        try {
            const id = req.params.id
            const admin = await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            })
            if (!admin) {
                return res.status(400).json({ message: "Admin does not exist" })
            }
            res.json({ message: "Admin deleted" })
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    findAll: async (req, res) => {
        try {
            const admins = await prisma.user.findMany({
                select: {
                    firstName: true,
                    lastName: true,
                    email: true
                },
                orderBy: [{ firstName: "desc" }]
            })
            res.status(200).json(admins)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    logout: async (req, res) => {
        try {
            const token = req.headers['x-auth-token'];
            if (!token) {
                return res.status(401).json({ message: 'Token is blacklisted' });
            }
            tokenBlacklist.push(token)
            res.json({ message: "Logged out" })
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
module.exports = AdminControllers