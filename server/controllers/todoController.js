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

const completeTodo = async (req, res) => {
    const { id } = req.params;
    const {completed} = req.body;
    
    try {
        const todo = await prisma.todo.update({
            where: { id },
            data: { completed: completed },
        });

        res.status(200).json(todo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the todo exists
        const todo = await prisma.todo.findUnique({
            where: { id },
        });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        await prisma.todo.delete({
            where: { id },
        });

        res.status(204).send("Todo deleted successfully");
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const editTodo = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const todo = await prisma.todo.update({
            where: { id },
            data: { name },
        });

        res.status(200).json(todo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    createTodo, 
    getAllTodos,
    completeTodo,
    deleteTodo,
    editTodo
};