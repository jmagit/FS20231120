const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FilmCategory', {
    filmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'film',
        key: 'film_id'
      },
      field: 'film_id'
    },
    categoryId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'category',
        key: 'category_id'
      },
      field: 'category_id'
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'last_update'
    }
  }, {
    sequelize,
    tableName: 'film_category',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "idx_fk_film_category_category",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "idx_fk_film_category_film",
        fields: [
          { name: "film_id" },
        ]
      },
      {
        name: "PK__film_cat__69C38A33038517DB",
        unique: true,
        fields: [
          { name: "film_id" },
          { name: "category_id" },
        ]
      },
    ]
  });
};
