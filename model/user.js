const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // SQLite only
  storage: path.join(__dirname, '../database/database.sqlite'),
});
const User = sequelize.define('User', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  // },
  name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

// User.sync().then(() =>
//   // Table created
//   User.create({
//     // id: 111,
//     name: 'clc',
//     password: 'gg',
//   })).then(() => {
//   User.findAll({ raw: true }).then((Notes) => {
//     console.log(Notes);
//   });
// });

module.exports = User;
