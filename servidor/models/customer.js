const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customer', {
    customerId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'customer_id'
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'store',
        key: 'store_id'
      },
      field: 'store_id'
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    addressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'address',
        key: 'address_id'
      },
      field: 'address_id'
    },
    active: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "Y"
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'create_date'
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'last_update'
    }
  }, {
    sequelize,
    tableName: 'customer',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "idx_fk_address_id",
        fields: [
          { name: "address_id" },
        ]
      },
      {
        name: "idx_fk_store_id",
        fields: [
          { name: "store_id" },
        ]
      },
      {
        name: "idx_last_name",
        fields: [
          { name: "last_name" },
        ]
      },
      {
        name: "PK__customer__CD65CB840C20EA1B",
        unique: true,
        fields: [
          { name: "customer_id" },
        ]
      },
    ]
  });
};
