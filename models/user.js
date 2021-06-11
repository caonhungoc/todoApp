const Sequelize = require('sequelize');
const db = require('@util/db');

const user = db.sequelize.define('USERs', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  roleID: Sequelize.INTEGER,
  status: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
})

module.exports.user = user;