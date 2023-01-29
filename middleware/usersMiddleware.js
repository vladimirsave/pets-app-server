const bcrypt = require('bcrypt');
const e = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserByEmailModel } = require('../models/usersModels');
 

const passwordsMatch = (req, res, next) => {
  const { password, repassword } = req.body;
  if (password !== repassword) {
    const err = new Error("Passwords dont match")
    err.statusCode = 400
    next(err)
    return;
  }

  next();
};

const isNewUser = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    const err = new Error("User already exists")
    err.statusCode = 400
    next(err)
    return;
  }
  next();
};

const hashPwd = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
console.log (req.body.password);
console.log (hash);
    req.body.password = hash;
    next();
  });
};

const doesUserExist = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  if (!user) {
    res.status(400).send('User with this email does not exist');
    return;
  }
  req.body.user = user;
  console.log ('user exist');
  next();
};


const auth = (req, res, next) => {
  console.log ('AUTH', req.cookies.token);
  
  if(!req.cookies.token) {
    res.status(401).send('Must have access token')
    return
  }

  jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send('Unauthorized');
      return;
    }

    if (decoded) {
      req.body.userId = decoded.id;
      console.log('Decoded YES', decoded);
      next();
      return
    }
  });
};

module.exports = { passwordsMatch, isNewUser, hashPwd, doesUserExist, auth };
