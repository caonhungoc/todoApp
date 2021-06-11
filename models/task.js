const Sequelize = require('sequelize');
const db = require('@util/db');

// const OPEN_STATUS = 1;
// const CLOSE_STATUS = 2;
// const RE_OPEN_STATUS = 3;
// const REMOVED_STATUS = 4;

const task = db.sequelize.define('TASKs', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  title: Sequelize.STRING,
  statusID: Sequelize.INTEGER,
  userID: Sequelize.INTEGER,
  description: Sequelize.STRING,
  createdDate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  updatedDate: {
    type: Sequelize.DATE,
    allowNull: true
  }
}, {
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
})

module.exports.task = task;

module.exports.OPEN_STATUS = 1;
module.exports.CLOSE_STATUS = 2;
module.exports.RE_OPEN_STATUS = 3;
module.exports.REMOVED_STATUS = 4;