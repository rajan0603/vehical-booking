const sequelize = require('../database');
const cars = require('./Car');
const bikes = require('./Bike');
const users = require('./User');
const bookings = require('./Booking');

cars.hasMany(bookings);
bikes.hasMany(bookings);
users.hasMany(bookings);
bookings.belongsTo(users);

module.exports = {
  sequelize,
  cars,
  bikes,
  users,
  bookings
};



