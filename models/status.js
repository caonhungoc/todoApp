const Sequelize = require('sequelize');
const db = require('@util/db');

const status = db.sequelize.define('STATUSs', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING
}, {
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
})

module.exports.status = status;