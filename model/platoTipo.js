const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlatoTipo = sequelize.define('PlatoTipo', {
  PLATO_TIPOS_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  NOMBRE: { type: DataTypes.STRING, allowNull: true },
  FECHA_REGISTRO: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
  INGRESADO_POR: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'plato_tipos',
  timestamps: false
});

module.exports = PlatoTipo;