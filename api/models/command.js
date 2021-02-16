/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('command', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    command: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'command'
  });
};
