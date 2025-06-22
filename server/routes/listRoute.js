const express = require('express');
const { validateData } = require('../middleware/validationMiddleware');
const { createListSchema } = require('../schemas/listSchemas');
const { validateToken } = require('../controllers/userController');


const router = express.Router();

const { createList } = require('../controllers/listController');

router.post('/', validateData(createListSchema), validateToken, createList);

module.exports = router;