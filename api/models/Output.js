/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Output', {
    resID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Result: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'Output'
  });
};
