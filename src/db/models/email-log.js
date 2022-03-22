const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config');

class EmailLog extends Model {}

EmailLog.init({
    id:  {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    bulk_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type: DataTypes.STRING,
    message: DataTypes.TEXT,
    is_sent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }, 
    priority: {
        type: DataTypes.ENUM(1,2,3),
        defaultValue: 1
    },
    email_to: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    retry_count: DataTypes.INTEGER,
    sent_count: DataTypes.INTEGER,
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
  modelName: 'email_logs',
  timestamps: false
 });

module.exports = EmailLog;
