const z = require('zod');

const createToDoSchema = z.object({
    listId: z.string().min(1, 'List ID is required'),
    name: z.string().min(1, 'Todo name is required'),
});

const getAllToDosSchema = z.object({
    listId: z.string().min(1, 'List ID is required'),   
});

const completeToDoSchema = z.object({
    completed: z.boolean(),
});

const editTodoSchema = z.object({
    name: z.string().min(1, 'Todo name is required'),
});

module.exports = {
    createToDoSchema,
    getAllToDosSchema,
    completeToDoSchema,
    editTodoSchema,
}