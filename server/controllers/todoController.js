const { PrismaClient } = require('../prisma/generated/prisma/client');

const prisma = new PrismaClient();

const createTodo = async (req, res) => {
    const { listId, name } = req.body;

    try {

        const todo = await prisma.todo.create({
            data:{
                name,
                listId
            }
        })
        
        res.status(201).json(todo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllTodos = async (req, res) => {
    const { listId } = req.query;

    try {
        const todos = await prisma.todo.findMany({
            where: { listId },
        });

        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createTodo, 
    getAllTodos,
};