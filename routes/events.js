const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events');

router.get('/', eventsController.getAll);

module.exports = router;
