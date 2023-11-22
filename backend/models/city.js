const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('City', {
    cityId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'city_id'
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    countryId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: 'country',
        key: 'country_id'
      },
      field: 'country_id'
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'last_update'
    }
  }, {
    sequelize,
    tableName: 'city',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "idx_fk_country_id",
        fields: [
          { name: "country_id" },
        ]
      },
      {
        name: "PK__city__031491A982F3414C",
        unique: true,
        fields: [
          { name: "city_id" },
        ]
      },
    ]
  });
};
