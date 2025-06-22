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
            orderBy: {
                name: 'desc',
            },
        });

        res.status(200).json(lists);
    } catch (error) {
        console.error('Error fetching lists:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getListById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const list = await prisma.list.findUnique({
            where: { id},
            include: {
                todos: {
                    orderBy: {
                        updatedAt: 'asc',
                    },
                },
            },
        });

        if (!list || list.userId !== userId) {
            return res.status(404).json({ error: 'List not found' });
        }

        res.status(200).json(list);
    } catch (error) {
        console.error('Error fetching list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}   

const editList = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user.id;

    try {
        const list = await prisma.list.update({
            where: { id },
            data: {
                name,
                description: description || null,
            },
        });
        if (!list || list.userId !== userId) {
            return res.status(404).json({ error: 'List not found' });
        }

        res.status(200).json(list);
    } catch (error) {
        console.error('Error updating list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteList = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        // Check if the list exists and belongs to the user
        const existingList = await prisma.list.findUnique({
            where: { id },
        });
        if (!existingList || existingList.userId !== userId) {
            return res.status(404).json({ error: 'List not found' });
        }
        const list = await prisma.list.delete({
            where: { id },
        });

        if (!list || list.userId !== userId) {
            return res.status(404).json({ error: 'List not found' });
        }

        res.status(200).json({ message: 'List deleted successfully' });
    } catch (error) {
        console.error('Error deleting list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createList,
    getAllLists,
    getListById,
    editList,
    deleteList,
}