const { DataTypes } = require('sequelize');
const sequelize = require('../common/database');

const RailService = sequelize.define('RailService', {
  serviceName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trainCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  departureStation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  arrivalStation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = RailService;
