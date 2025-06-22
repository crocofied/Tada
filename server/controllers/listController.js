const { PrismaClient } = require('../prisma/generated/prisma/client');

const prisma = new PrismaClient();

const createList = async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.id;

    try {
        const list = await prisma.list.create({
            data: {
                name,
                description: description || null, 
                userId,
            },
        });

        res.status(201).json(list);
    } catch (error) {
        console.error('Error creating list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllLists = async (req, res) => {
    const userId = req.user.id;

    try {
        const lists = await prisma.list.findMany({
            where: { userId },
        });

        res.status(200).json(lists);
    } catch (error) {
        console.error('Error fetching lists:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createList,
    getAllLists,
}