
const { Sequelize } = require('sequelize');

require('dotenv').config({ path: '.dev.env' });

const sequelize = new Sequelize(process.env.MYSQL_DB_DATABASE, 
  process.env.MYSQL_DB_USERNAME, process.env.MYSQL_DB_PASSWORD, {
  host: process.env.MYSQL_DB_HOST,
  dialect:  'mysql',
  pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
});



sequelize.authenticate().then(()=>{
  console.log('Connection to MYSQL database has been established successfully.');
}).catch(err => {

  //send to sentry
  console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;


