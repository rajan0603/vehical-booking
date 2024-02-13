const Sequelize = require('sequelize');
const sequelize = new Sequelize('vehical-data', 'rajan', 'Rajan@060399', {
  host: 'localhost',
  dialect: 'mysql' // or any other SQL dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.CarType = require('./CarType')(sequelize, Sequelize);
db.Vehicle = require('./Vehicle')(sequelize, Sequelize);
db.Booking = require('./Booking')(sequelize, Sequelize);

// Associations
db.CarType.hasMany(db.Vehicle);
db.Vehicle.belongsTo(db.CarType);
db.Vehicle.hasMany(db.Booking);
db.Booking.belongsTo(db.Vehicle);

module.exports = db;
