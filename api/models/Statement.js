/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Statement', {
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true
    },
    command: {
      type: DataTypes.STRING(4000),
      allowNull: true
    }
  }, {
    tableName: 'Statement'
  });
};
