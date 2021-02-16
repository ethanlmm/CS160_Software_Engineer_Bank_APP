/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Accounts', {
    AccountID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    AccountName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.00'
    },
    Type: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    Status: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'A'
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'CustomerID'
      }
    }
  }, {
    tableName: 'Accounts'
  });
};
