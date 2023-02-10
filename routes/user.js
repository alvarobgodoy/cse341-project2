const express = require('express');
const router = express.Router();
const { signupValidation } = require('../services/validate')

const userController = require('../controllers/user');

router.get('/', userController.getAll);

router.post('/', signupValidation, userController.regNewUser);

router.put('/:id', userController.regNewUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
