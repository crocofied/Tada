const z = require('zod');

const createListSchema = z.object({
    name: z.string().min(1, 'List name is required'),   
    description: z.string().optional(),
});

const editListSchema = z.object({
    name: z.string().min(1, 'List name is required'),
    description: z.string().optional(),
});

module.exports = {
    createListSchema,
    editListSchema,
}