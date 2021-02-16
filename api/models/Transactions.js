/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Transactions', {
    TransactionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SourceAccount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Accounts',
        key: 'AccountID'
      }
    },
    DestinationAccount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Accounts',
        key: 'AccountID'
      }
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'CustomerID'
      }
    },
    Amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    Status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'Pending'
    },
    TimeOfTransaction: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'Transactions'
  });
};
