const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Service = require('../services/services');
const { validationResult } = require('express-validator');

const getAll = async (req, res, next) => {
  console.log('Get all users.');
  // #swagger.tags = ['Users']
  
  try {
    const result = await mongodb.getDb().db().collection('users').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const regNewUser = async (req, res, next) => {
  console.log('Register new User.');
  // #swagger.tags = ['Users']

  try {
    let newUser  = {
      name: req.body.name,
      password: req.body.password,
      profession: req.body.profession,
      attendsTo: []
    };
  
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      res.status(500).json(errors)
    } else {
      newUser.password = Service.hashPassword(newUser.password);
      const insertResult = await mongodb.getDb().db().collection('users').insertOne(newUser);
  
      res.setHeader('Content-Type', 'application/json');
      if (insertResult.acknowledged) {
        res.status(201).json(insertResult);
      } else {
        res.status(500).json(insertResult.error);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res, next) => {
  console.log('Update user.')
  // #swagger.tags = ['Users']

  try {
    const userId = new ObjectId(req.params.id);
    let userInfo = {
      name: req.body.name,
      password: req.body.password,
      profession: req.body.profession
    }
    
    userInfo = Service.cleanObject(userInfo);

    if(userInfo.password) {
      // Hash password
      userInfo.password = Service.hashPassword(userInfo.password);
    }

    const updateResult = await mongodb.getDb().db().collection('users').updateOne({ _id: userId }, { $set: userInfo });

    res.setHeader('Content-Type', 'application/json');
    if (updateResult.acknowledged) {
      res.status(204).json(updateResult);
    } else {
      res.status(500).json(updateResult.error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteUser = async (req, res, next) => {
  console.log('Delete user.')
  // #swagger.tags = ['Users']

  try {
    const userId = new ObjectId(req.params.id);

    const deleteResult = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId });

    res.setHeader('Content-Type', 'application/json');
    if (deleteResult.acknowledged) {
      res.status(200).json(deleteResult);
    } else {
      res.status(500).json(deleteResult.error | 'Error');
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { getAll, regNewUser, deleteUser, updateUser };