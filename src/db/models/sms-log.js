const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class SmsLog extends Model {}

SmsLog.init({
  id:  {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  type: DataTypes.STRING,
  bulk_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  processor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  priority: {
    type: DataTypes.ENUM(1,2,3),
    defaultValue: 1
  },
  message: DataTypes.TEXT,
  is_sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }, 
  retry_count: DataTypes.INTEGER,
  sent_count: DataTypes.INTEGER,
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  }, 
  schedule_date: {
    type: DataTypes.DATE,
    allowNull: true
  }, 
  sys_generated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
 // Timestamps
 created_at: DataTypes.DATE,
 updated_at: DataTypes.DATE
}, { 
  sequelize, 
  modelName: 'sms_logs',
  timestamps: false
 });

module.exports = SmsLog;
