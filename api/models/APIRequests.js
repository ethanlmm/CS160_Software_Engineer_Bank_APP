/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('APIRequests', {
    APIID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    InputJSON: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    OutputJSON: {
      type: DataTypes.STRING(10000),
      allowNull: true
    }
  }, {
    tableName: 'APIRequests'
  });
};
