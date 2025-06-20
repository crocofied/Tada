const z = require('zod');

const userRegistrationSchema = z.object({
    email: z.string().email(),
    firstname: z.string().min(1, 'First name is required'),
    lastname: z.string().min(1, 'Last name is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    admin: z.boolean().optional(),
});

module.exports = {
    userRegistrationSchema,
};