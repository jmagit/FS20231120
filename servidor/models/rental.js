const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rental', {
    rentalId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'rental_id'
    },
    rentalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'rental_date'
    },
    inventoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'inventory',
        key: 'inventory_id'
      },
      field: 'inventory_id'
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_id'
      },
      field: 'customer_id'
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'return_date'
    },
    staffId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staff_id'
      },
      field: 'staff_id'
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'last_update'
    }
  }, {
    sequelize,
    tableName: 'rental',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "idx_fk_customer_id",
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "idx_fk_inventory_id",
        fields: [
          { name: "inventory_id" },
        ]
      },
      {
        name: "idx_fk_staff_id",
        fields: [
          { name: "staff_id" },
        ]
      },
      {
        name: "idx_uq",
        unique: true,
        fields: [
          { name: "rental_date" },
          { name: "inventory_id" },
          { name: "customer_id" },
        ]
      },
      {
        name: "PK__rental__67DB611AB96CC8F0",
        unique: true,
        fields: [
          { name: "rental_id" },
        ]
      },
    ]
  });
};
