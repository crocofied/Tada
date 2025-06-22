const express = require('express');
const {validateData} = require('../middleware/validationMiddleware');
const { userRegistrationSchema, userLoginSchema, updateUserSchema} = require('../schemas/userSchemas');
const {validateToken} = require('../controllers/userController');


const router = express.Router();

const { registerUser, loginUser, updateUser } = require('../controllers/userController');

router.post('/', validateData(userRegistrationSchema), registerUser);
router.post('/login', validateData(userLoginSchema), loginUser);
router.post('/update', validateData(updateUserSchema), validateToken, updateUser);

module.exports = router;