const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Notification extends Model {}

Notification.init({
  id:  {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  customer_id: DataTypes.STRING,
  message: DataTypes.TEXT,
  data: {
    type: DataTypes.TEXT, 
    allowNull: true
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
  notification_type: {
      type: DataTypes.STRING, 
      allowNull: true
  },
 // Timestamps
 created_at: DataTypes.DATE,
}, { 
  sequelize, 
  modelName: 'notifications',
  timestamps: false
 });

module.exports = Notification;


