const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Service = require('../services/services');

const getAll = async (req, res, next) => {
  console.log('Get all users.');

  const result = await mongodb.getDb().db().collection('users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const regNewUser = async (req, res, next) => {
  console.log('Register new User.');

  let newUser  = {
    name: req.body.name,
    password: req.body.password,
    profession: req.body.profession,
  };

  newUser = Service.cleanObject(newUser);

  const insertResult = await mongodb.getDb().db().collection('users').insertOne(newUser);

  res.setHeader('Content-Type', 'application/json');
  if (insertResult.acknowledged) {
    res.status(201).json(insertResult);
  } else {
    res.status(500).json(insertResult.error);
  }
};

module.exports = { getAll, regNewUser };