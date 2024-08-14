const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./clientes'); // Asegúrate de tener este modelo importado
const Menu = require('./Menu');
const Plato = require('./plato');

const Orden = sequelize.define('Orden', {
  ORDEN_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  CLIENTE_ID: { type: DataTypes.INTEGER, allowNull: false },
  ESTADO: { type: DataTypes.TINYINT, defaultValue: 0 }, // 0: Pendiente, 1: Confirmado, 2: Completado, etc.
  TOTAL: { type: DataTypes.DECIMAL(10, 0), allowNull: false }
}, {
  tableName: 'orden',
  timestamps: false
});

// Relación con Cliente
Orden.belongsTo(Cliente, { foreignKey: 'CLIENTE_ID' });

// Relación muchos a muchos con Platos si deseas agregar platos a la orden
Orden.belongsToMany(Plato, { through: 'OrdenPlato', foreignKey: 'ORDEN_ID' });

module.exports = Orden;