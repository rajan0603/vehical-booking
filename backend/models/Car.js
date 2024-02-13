const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Car = sequelize.define('Car', {
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('hatchback', 'suv', 'sedan'),
    allowNull: false
  },
  numberOfWheels: {
    type: DataTypes.INTEGER,
    defaultValue: 4
  }
});

module.exports = Car;



