'use strict';
const express = require('express');
const signUpRouter=express.Router();
const {users}=require('../module/index');
const bcrypt = require('bcrypt');

console.log(users);

signUpRouter.post('/signup', async (req,res,next) =>{
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      password:hashedPass,
      role:userRecord.role,
      token: userRecord.token,
      action:userRecord.action
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

module.exports= signUpRouter;