const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  CLIENTE_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  USUARIO_ID: DataTypes.INTEGER,
  NOMBRE: DataTypes.STRING,
  APELLIDO: DataTypes.STRING,
  CEDULA: DataTypes.STRING,
  PASAPORTE: DataTypes.STRING,
  SEXO: DataTypes.TINYINT,
  TELEFONO: DataTypes.STRING,
  DIRECCION: DataTypes.STRING,
  FECHA_NACIMINETO: DataTypes.DATE,
  CORREO: DataTypes.STRING,
  CLAVE: DataTypes.STRING,
  FECHA_REGISTRO: DataTypes.DATE
}, {
  tableName: 'cliente',
  timestamps: false
});

module.exports = Cliente;