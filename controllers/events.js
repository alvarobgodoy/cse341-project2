const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Service = require('../services/services');

const getAll = async (req, res, next) => {
  // #swagger.description = 'Get all events'
  console.log('Get all events.');

  const result = await mongodb.getDb().db().collection('events').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getEvent = async (req, res, next) => {
  // #swagger.description = 'Get individual event by Id'
  console.log('Get event.')

  const eventId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('events').find({ _id: eventId });

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const newAttendee = async (req, res, next) => {
  // #swagger.description = 'Get individual event by Id'
  console.log('Post new attendee.')

  const eventId = req.params.id;
  const userId = req.params.userId;
};

const createEvent = async (req, res, next) => {
  console.log('Create event.')

  const newEvent = {
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
    speakers: req.body.speakers,
    contactInfo: req.body.contactInfo,
    attendees: [],
  }

  const insertResult = await mongodb.getDb().db().collection('events').insertOne(newEvent);

  res.setHeader('Content-Type', 'application/json');
  if (insertResult.acknowledged) {
    res.status(201).json(insertResult);
  } else {
    res.status(500).json(insertResult.error);
  }
};

const updateEvent = async (req, res, next) => {
  console.log('Create event.')

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
  console.log(eventId, eventInfo)

  const updateResult = await mongodb.getDb().db().collection('events').updateOne({ _id: eventId }, { $set: eventInfo });

  res.setHeader('Content-Type', 'application/json');
  if (updateResult.acknowledged) {
    res.status(201).json(updateResult);
  } else {
    res.status(500).json(updateResult.error);
  }
};

const deleteEvent = async (req, res, next) => {
  console.log('Delete event.')

  const eventId = new ObjectId(req.params.id);

  const deleteResult = await mongodb.getDb().db().collection('events').deleteOne({ _id: eventId });

  res.setHeader('Content-Type', 'application/json');
  if (deleteResult.acknowledged) {
    res.status(204).json(deleteResult);
  } else {
    res.status(500).json(deleteResult.error);
  }
};

module.exports = { getAll, getEvent, newAttendee, createEvent, updateEvent, deleteEvent };
