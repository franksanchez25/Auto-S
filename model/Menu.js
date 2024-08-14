const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Plato = require('./plato');
const MenuPlato = require('./menuplato');

const Menu = sequelize.define('Menu', {
  MENU_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  MENU_FECHA: DataTypes.DATE,
  MENU_DIAS: DataTypes.STRING,
  INGRESADO_POR: DataTypes.INTEGER,
  FECHA_REGISTRO: DataTypes.DATE
}, {
  tableName: 'menus',
  timestamps: false
});

// Relación de muchos a muchos con Platos a través de MenuPlato
Menu.belongsToMany(Plato, { through: MenuPlato, foreignKey: 'MENU_ID' });
Plato.belongsToMany(Menu, { through: MenuPlato, foreignKey: 'PLATO_ID' });

module.exports = Menu;