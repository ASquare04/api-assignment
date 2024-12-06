const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
  }
);

sequelize.authenticate()
  .then(() => console.log('🚀 Connection to the database was successful!'))
  .catch(err => {
    console.error('⛔ Could not connect to the database.');
    console.error('💡 Error Message:', err.message);
    console.error('🔍 Full Error Details:', err);
  });

module.exports = sequelize;
