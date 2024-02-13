const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Bike = sequelize.define('Bike', {
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('cruiser', 'sports'),
    allowNull: false
  },
  numberOfWheels: {
    type: DataTypes.INTEGER,
    defaultValue: 2
  }
});

module.exports = Bike;


