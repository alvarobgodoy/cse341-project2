const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events');

// All events
router.get('/', eventsController.getAll);

// Individual by id
router.get('/:id', eventsController.getEvent);

// Create event
router.post('/', eventsController.createEvent);

// Create event
router.put('/:id', eventsController.updateEvent);

// New attendee
// router.post('/:id&:userId', eventsController.postAttendee);

// Delte event
router.delete('/:id', eventsController.deleteEvent);


module.exports = router;
