const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Category', {
    categoryId: {
      autoIncrement: true,
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true,
      field: 'category_id'
    },
    name: {
      type: DataTypes.STRING(25),
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
    tableName: 'category',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__category__D54EE9B5BDC056BD",
        unique: true,
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
};
