/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('APIResponses', {
    APIID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    APIKey: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OutputJSON: {
      type: DataTypes.STRING(10000),
      allowNull: false
    }
  }, {
    tableName: 'APIResponses'
  });
};
