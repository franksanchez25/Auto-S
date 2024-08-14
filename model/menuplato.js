const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MenuPlato = sequelize.define('MenuPlato', {
  MENU_PLATO_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  MENU_ID: DataTypes.INTEGER,
  PLATO_ID: DataTypes.INTEGER
}, {
  tableName: 'menu_platos',
  timestamps: false
});

module.exports = MenuPlato;