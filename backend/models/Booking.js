const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Car = require('./Car');
const Bike = require('./Bike');
// const User = require('./User');

const Booking = sequelize.define('Booking', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numOfWheels: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  vehicleType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});



module.exports = Booking;



