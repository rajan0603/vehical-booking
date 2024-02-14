const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Bike = sequelize.define('Bike', {
  vehicleType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Bike;


