const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const AgentController = {
    findAll: async (req, res) => {
        try {
            const agents = await prisma.agent.findMany({
                include: {
                    image: true,
                }
            })
            res.status(200).json(agents)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    findById: async (req, res) => {
        try {
            const id = req.params.id
            const agent = await prisma.agent.findUnique({
                where: {
                    id: Number(id)
                },
                include: {
                    image: true,
                }
            })
            res.status(200).json(agent)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    create: async (req, res) => {
        try {
            const agent = req.body
            const newAgent = await prisma.agent.create({
                data: agent
            })
            res.status(201).json(newAgent)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            const agent = req.body
            const updatedAgent = await prisma.agent.update({
                where: {
                    id: Number(id)
                },
                data: agent
            })
            res.status(200).json(updatedAgent)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            await prisma.agent.delete({
                where: {
                    id: Number(id)
                }
            })
            res.status(204).json()
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
module.exports = AgentController