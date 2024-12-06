const { DataTypes } = require('sequelize');
const sequelize = require('../common/database');
const Train = require('./Train');

const Reservation = sequelize.define('Reservation', {
  reservationId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  linkedTrainId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  seatAvailability: {
    type: DataTypes.ENUM('available', 'reserved'),
    defaultValue: 'available',
  },
});

Reservation.belongsTo(Train, { foreignKey: 'linkedTrainId', targetKey: 'trainCode' });

module.exports = Reservation;
