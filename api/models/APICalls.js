/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('APICalls', {
    APIID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    APIKey: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    InputJSON: {
      type: DataTypes.STRING(1000),
      allowNull: false
    }
  }, {
    tableName: 'APICalls'
  });
};
