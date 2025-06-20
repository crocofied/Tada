const { PrismaClient } = require('../prisma/generated/prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
    const { email, firstname, lastname, password, admin } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Check if there is already an admin
        let isAdmin = admin || false;
        const adminUser = await prisma.user.findFirst({ where: { admin: true } });
        if (!adminUser) {
            isAdmin = true;
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                firstname,
                lastname,
                password: hashedPassword,
                admin: isAdmin,
            }
        });

        res.status(201).json({
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            admin: user.admin,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const loginUser = async (req, res) => { 
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            admin: user.admin,
            token,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    registerUser,
    loginUser,
};