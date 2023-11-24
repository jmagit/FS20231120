const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Film', {
    filmId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
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
    },
    releaseYear: {
      type: DataTypes.STRING(4),
      allowNull: true,
      field: 'release_year'
    },
    languageId: {
      type: DataTypes.TINYINT,
      allowNull: false,
      references: {
        model: 'language',
        key: 'language_id'
      },
      field: 'language_id'
    },
    originalLanguageId: {
      type: DataTypes.TINYINT,
      allowNull: true,
      references: {
        model: 'language',
        key: 'language_id'
      },
      field: 'original_language_id'
    },
    rentalDuration: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 3,
      field: 'rental_duration'
    },
    rentalRate: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false,
      defaultValue: 4.99,
      field: 'rental_rate'
    },
    length: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    replacementCost: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false,
      defaultValue: 19.99,
      field: 'replacement_cost'
    },
    rating: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "G"
    },
    specialFeatures: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'special_features'
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'last_update'
    }
  }, {
    sequelize,
    tableName: 'film',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "idx_fk_language_id",
        fields: [
          { name: "language_id" },
        ]
      },
      {
        name: "idx_fk_original_language_id",
        fields: [
          { name: "original_language_id" },
        ]
      },
      {
        name: "PK__film__349764A880F6DFA4",
        unique: true,
        fields: [
          { name: "film_id" },
        ]
      },
    ]
  });
};
