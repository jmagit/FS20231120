const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FilmActor', {
    actorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'actor',
        key: 'actor_id'
      },
      field: 'actor_id'
    },
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
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'last_update'
    }
  }, {
    sequelize,
    tableName: 'film_actor',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "idx_fk_film_actor_actor",
        fields: [
          { name: "actor_id" },
        ]
      },
      {
        name: "idx_fk_film_actor_film",
        fields: [
          { name: "film_id" },
        ]
      },
      {
        name: "PK__film_act__086D31FFED0F7DD4",
        unique: true,
        fields: [
          { name: "actor_id" },
          { name: "film_id" },
        ]
      },
    ]
  });
};
