const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('categoryName', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Category
