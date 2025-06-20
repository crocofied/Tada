const express = require('express');
const {validateData} = require('../middleware/validationMiddleware');
const { userRegistrationSchema, userLoginSchema} = require('../schemas/userSchemas');


const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController');

router.post('/', validateData(userRegistrationSchema), registerUser);
router.post('/login', validateData(userLoginSchema), loginUser);

module.exports = router;