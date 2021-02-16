/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('idGen', {
    ID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    nextID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'idGen'
  });
};
