/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ioMonitor', {
    reqID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Input',
        key: 'reqID'
      }
    },
    resID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Output',
        key: 'resID'
      }
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    finishTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pickup: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'ioMonitor'
  });
};
