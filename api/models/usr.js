/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usr', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    psw: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'usr'
  });
};
