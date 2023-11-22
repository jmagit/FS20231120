const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Address', {
    addressId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'address_id'
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    address2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    district: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'city',
        key: 'city_id'
      },
      field: 'city_id'
    },
    postalCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'postal_code'
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'last_update'
    }
  }, {
    sequelize,
    tableName: 'address',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "idx_fk_city_id",
        fields: [
          { name: "city_id" },
        ]
      },
      {
        name: "PK__address__CAA247C95E71215E",
        unique: true,
        fields: [
          { name: "address_id" },
        ]
      },
    ]
  });
};
