const express = require('express');
const { validateData } = require('../middleware/validationMiddleware');
const {createToDoSchema, getAllToDosSchema, completeToDoSchema, editTodoSchema} = require('../schemas/todoSchemas');
const { validateToken } = require('../controllers/userController');


const router = express.Router();

const { createTodo, getAllTodos, completeTodo, editTodo, deleteTodo } = require('../controllers/todoController');
router.post('/', validateData(createToDoSchema), validateToken, createTodo);
router.get('/', validateData(getAllToDosSchema), validateToken, getAllTodos);
router.put('/:id/complete', validateData(completeToDoSchema), validateToken, completeTodo);
router.put('/:id', validateData(editTodoSchema), validateToken, editTodo);
router.delete('/:id', validateToken, deleteTodo);

module.exports = router;