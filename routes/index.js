const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.use('/user', require('./user'));

router.use('/events', require('./events'));

module.exports = router;