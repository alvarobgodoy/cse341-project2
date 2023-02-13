const { check } = require('express-validator');
 
exports.signupValidation = [
    check('name', 'Name is requied').not().isEmpty(),
    check('password', 'Password must be 8 or more characters').isLength({ min: 8 }),
    check('profession', 'Please include a valid profession').not().isEmpty()
]

exports.createEventValidation = [
    check('name', 'Name is requied').not().isEmpty(),
    check('description', 'Description is requied').not().isEmpty(),
    check('date', 'Date is requied').not().isEmpty(),
    check('location', 'Location is requied').not().isEmpty(),
    check('speakers', 'Speakers is requied').not().isEmpty(),
    check('contactInfo', 'ContactInfo is requied').not().isEmpty(),
]