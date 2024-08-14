const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const PlatoTipo = require('./platoTipo'); // Importa el modelo PlatoTipo

const Plato = sequelize.define('Plato', {
  PLATO_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  NOMBRE: DataTypes.STRING,
  PRECIO: DataTypes.DECIMAL,
  FECHA_REGISTRO: DataTypes.DATE,
  PLATO_TIPOS_ID: { type: DataTypes.INTEGER, allowNull: true },
  INGRESADO_POR: DataTypes.INTEGER
}, {
  tableName: 'platos',
  timestamps: false
});

Plato.belongsTo(PlatoTipo, { foreignKey: 'PLATO_TIPOS_ID' });

module.exports = Plato;