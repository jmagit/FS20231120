const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Store', {
    storeId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'store_id'
    },
    managerStaffId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staff_id'
      },
      field: 'manager_staff_id'
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
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'last_update'
    }
  }, {
    sequelize,
    tableName: 'store',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "idx_fk_address_id",
        unique: true,
        fields: [
          { name: "manager_staff_id" },
        ]
      },
      {
        name: "idx_fk_store_address",
        fields: [
          { name: "address_id" },
        ]
      },
      {
        name: "PK__store__A2F2A30D67FAB5D6",
        unique: true,
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
};
