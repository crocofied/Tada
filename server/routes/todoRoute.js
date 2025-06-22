const express = require('express');
const { validateData } = require('../middleware/validationMiddleware');
const {createToDoSchema, getAllToDosSchema} = require('../schemas/todoSchemas');
const { validateToken } = require('../controllers/userController');


const router = express.Router();

const { createTodo, getAllTodos } = require('../controllers/todoController');
router.post('/', validateData(createToDoSchema), validateToken, createTodo);
router.get('/', validateData(getAllToDosSchema), validateToken, getAllTodos);

module.exports = router;