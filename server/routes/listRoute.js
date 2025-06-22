const express = require('express');
const { validateData } = require('../middleware/validationMiddleware');
const { createListSchema, editListSchema, deleteListSchema } = require('../schemas/listSchemas');
const { validateToken } = require('../controllers/userController');


const router = express.Router();

const { createList, getAllLists, getListById, editList, deleteList } = require('../controllers/listController');

router.post('/', validateData(createListSchema), validateToken, createList);
router.get('/', validateToken, getAllLists);
router.get('/:id', validateToken, getListById);
router.put('/:id', validateData(editListSchema), validateToken, editList);
router.delete('/:id', validateToken, deleteList);

module.exports = router;