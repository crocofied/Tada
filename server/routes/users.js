const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

router.post('/', (req, res) => {
    const { email, firstname, lastname, password, admin } = req.body;
    if (!email || !firstname || !lastname || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    prisma.user.create({
        data: {
            email,
            firstname,
            lastname,
            password: hashedPassword,
            admin: admin || false,
        }
    })
    .then(user => {
        res.status(201).json({
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            admin: user.admin,
        });
    })
    .catch(error => {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    );
});

module.exports = router;