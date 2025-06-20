const express = require('express');
const {validateData} = require('../middleware/validationMiddleware');
const {userRegistrationSchema} = require('../schemas/userSchemas');


const router = express.Router();

const {registerUser} = require('../controllers/userController');

router.post('/', validateData(userRegistrationSchema), registerUser);

module.exports = router;