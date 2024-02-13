const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database connection details
const sequelize = new Sequelize('vehicle', 'root', 'Rajan@060399', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
