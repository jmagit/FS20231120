const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Staff', {
    staffId: {
      autoIncrement: true,
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true,
      field: 'staff_id'
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
    addressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'address',
        key: 'address_id'
      },
      field: 'address_id'
    },
    picture: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
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
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'last_update'
    }
  }, {
    sequelize,
    tableName: 'staff',
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
        name: "PK__staff__1963DD9DC480A268",
        unique: true,
        fields: [
          { name: "staff_id" },
        ]
      },
    ]
  });
};
