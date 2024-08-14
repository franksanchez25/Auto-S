const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdenPlato = sequelize.define('OrdenPlato', {
  ORDEN_PLATO_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ORDEN_ID: { type: DataTypes.INTEGER, allowNull: false },
  PLATO_ID: { type: DataTypes.INTEGER, allowNull: false },
  CANTIDAD: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'orden_plato',
  timestamps: false
});

module.exports = OrdenPlato;