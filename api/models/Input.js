/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Input', {
    reqID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Priority: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Parameter: {
      type: DataTypes.JSON,
      allowNull: true
    },
    request: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'Input'
  });
};
