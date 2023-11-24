const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FilmText', {
    filmId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
      field: 'film_id'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'film_text',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__film_tex__349764A81301A548",
        unique: true,
        fields: [
          { name: "film_id" },
        ]
      },
    ]
  });
};
