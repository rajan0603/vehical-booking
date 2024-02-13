const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Car = require('./Car');
const Bike = require('./Bike');
const User = require('./User');

const Booking = sequelize.define('Booking', {
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

Booking.belongsTo(User);
Booking.belongsTo(Car);
Booking.belongsTo(Bike);

module.exports = Booking;



