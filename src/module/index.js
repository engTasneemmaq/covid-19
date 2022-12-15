'use strict';
require('dotenv').config();
const users = require('./users');
const { Sequelize, DataTypes } = require('sequelize');
const recordModel = require('./record-model');
const DataCollection= require('./Collection');
const userModel = require('./users');


const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions =
process.env.NODE_ENV === "production"
     ? {
         dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false}
         },
     }
     : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const recordsTable = recordModel(sequelize, DataTypes);
const userTable = userModel(sequelize, DataTypes);

console.log(userTable);

const recordCollection = new DataCollection(recordsTable);


//relations database
userTable.hasMany(recordsTable); //one user has many record
recordsTable.belongsTo(userTable); //one record has one user

module.exports = {
    db: sequelize,
    users: userModel(sequelize, DataTypes),
    recordCollection:recordCollection,
};
