const sequelize = require('../database');
const Car = require('./Car');
const Bike = require('./Bike');
// const User = require('./User');
const Booking = require('./Booking');

// Define associations
Car.hasMany(Booking);
Bike.hasMany(Booking);
Booking.belongsTo(Car);
Booking.belongsTo(Bike);

module.exports = {
  sequelize,
  Car,
  Bike,
  Booking
};



