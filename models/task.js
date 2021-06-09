const Sequelize = require('sequelize');
const db = require('../utils/db');

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