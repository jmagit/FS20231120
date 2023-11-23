const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Inventory', {
    inventoryId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'inventory_id'
    },
    filmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'film',
        key: 'film_id'
      },
      field: 'film_id'
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
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'last_update'
    }
  }, {
    sequelize,
    tableName: 'inventory',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "idx_fk_film_id",
        fields: [
          { name: "film_id" },
        ]
      },
      {
        name: "idx_fk_film_id_store_id",
        fields: [
          { name: "store_id" },
          { name: "film_id" },
        ]
      },
      {
        name: "PK__inventor__B59ACC48437076EE",
        unique: true,
        fields: [
          { name: "inventory_id" },
        ]
      },
    ]
  });
};
