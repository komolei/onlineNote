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

const Note = sequelize.define('Note', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  // },
  uid: {
    type: Sequelize.STRING,
  },
  context: {
    type: Sequelize.STRING,
  },
});
// Note.drop();
// Note.sync({ force: true });
// Note.sync({ force: true }).then(() =>
//   // Table created
//   Note.create({
//     // id: 111,
//     uid:'komolei',
//     context: 'clc',
//   })).then(() => {
//   Note.findAll({ raw: true }).then((Notes) => {
//     console.log(Notes);
//   });
// });

Note.findAll({ raw: true }).then((Notes) => {
  console.log(Notes);
});


// Note.findAll({ raw: true, where: { id: 1 } }).then((Notes) => {
//   console.log(Notes);
// });
//
// Note.destroy({ where: { id: 1 } }).then(r => console.log(r));

module.exports = Note;
