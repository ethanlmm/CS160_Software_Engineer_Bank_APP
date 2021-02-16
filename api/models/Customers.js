/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customers', {
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FirstName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'Customers'
  });
};
