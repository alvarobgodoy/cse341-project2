const { check } = require('express-validator');
 
exports.signupValidation = [
    check('name', 'Name is requied').not().isEmpty(),
    check('password', 'Password must be 8 or more characters').isLength({ min: 8 }),
    check('profession', 'Please include a valid profession').not().isEmpty()
]