const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Service = require('../services/services');
const { validationResult } = require('express-validator');

const getAll = async (req, res, next) => {
  console.log('Get all events.');
  // #swagger.tags = ['Events']
  // #swagger.description = 'Get all events'

  try {
    mongodb.getDb().db().collection('events').find().toArray((err, lists) => {
      if(err) {
        res.status(400).json(err)
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch(err) {
    res.status(500).json(err);
  }
};

const getEvent = async (req, res, next) => {
  console.log('Get event.')
  // #swagger.tags = ['Events']
  // #swagger.description = 'Get individual event by Id'

  try {
    const eventId = new ObjectId(req.params.id);
    mongodb.getDb().db().collection('events').find({ _id: eventId }).toArray((err, lists) => {
      if(err) {
        res.status(400).json(err)
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch(err) {
    res.status(500).json(err);
  }
};

const newAttendee = async (req, res, next) => {
  console.log('Post new attendee.')
  // #swagger.tags = ['Events']
  // #swagger.description = 'Get individual event by Id'

  const eventId = req.params.id;
  const userId = req.params.userId;
};

const createEvent = async (req, res, next) => {
  console.log('Create event.')
  // #swagger.tags = ['Events']
  // #swagger.description = 'Create new event'

  try {
    const newEvent = {
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      speakers: req.body.speakers,
      contactInfo: req.body.contactInfo,
      attendees: [],
    }
  
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      res.status(500).json(errors)
    } else {
      const insertResult = await mongodb.getDb().db().collection('events').insertOne(newEvent);
  
      res.setHeader('Content-Type', 'application/json');
      if (insertResult.acknowledged) {
        res.status(201).json(insertResult);
      } else {
        res.status(500).json(insertResult.error);
      }
    }
  } catch(err) {
    res.status(500).json(err);
  }
};

const updateEvent = async (req, res, next) => {
  console.log('Update event.')
  // #swagger.tags = ['Events']
  // #swagger.description = 'Update information of an event'

  try {
    const eventId = new ObjectId(req.params.id);
    let eventInfo = {
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      speakers: req.body.speakers,
      contactInfo: req.body.contactInfo
    }
    
    eventInfo = Service.cleanObject(eventInfo);

    const updateResult = await mongodb.getDb().db().collection('events').updateOne({ _id: eventId }, { $set: eventInfo });

    res.setHeader('Content-Type', 'application/json');
    if (updateResult.acknowledged) {
      res.status(204).json(updateResult);
    } else {
      res.status(500).json(updateResult.error);
    }
  } catch(err) {
    res.status(500).json(err);
  }
};

const deleteEvent = async (req, res, next) => {
  console.log('Delete event.')
  // #swagger.tags = ['Events']
  // #swagger.description = 'Delete event by id'

  try {
    const eventId = new ObjectId(req.params.id);

    const deleteResult = await mongodb.getDb().db().collection('events').deleteOne({ _id: eventId });

    res.setHeader('Content-Type', 'application/json');
    if (deleteResult.acknowledged) {
      res.status(200).json(deleteResult);
    } else {
      res.status(500).json(deleteResult.error);
    }
  } catch(err) {
    res.status(500).json(err);
  }
};

module.exports = { getAll, getEvent, newAttendee, createEvent, updateEvent, deleteEvent };
