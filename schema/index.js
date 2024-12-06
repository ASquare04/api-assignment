const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
});

const Account = require('./User')(sequelize, Sequelize);
const RailService = require('./Train');
const Reservation = require('./Booking', sequelize, Sequelize);

module.exports = {
  sequelize,
  Account,
  RailService,
  Reservation,
};
