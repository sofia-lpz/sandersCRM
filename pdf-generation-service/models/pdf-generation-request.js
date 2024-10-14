const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  template_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'complete', 'failed'),
    defaultValue: 'pending',
  },
  s3_key: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  schema: process.env.DATABASE_SCHEMA,
});

module.exports = Request;
