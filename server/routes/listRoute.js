const express = require('express');
const { validateData } = require('../middleware/validationMiddleware');
const { createListSchema, getListByIdSchema } = require('../schemas/listSchemas');
const { validateToken } = require('../controllers/userController');


const router = express.Router();

const { createList, getAllLists, getListById } = require('../controllers/listController');

router.post('/', validateData(createListSchema), validateToken, createList);
router.get('/', validateToken, getAllLists);
router.get('/:id', validateToken, getListById);

module.exports = router;