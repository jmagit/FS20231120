const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Country', {
    countryId: {
      autoIncrement: true,
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
      field: 'country_id'
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'last_update'
    }
  }, {
    sequelize,
    tableName: 'country',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__country__7E8CD054C0E734D7",
        unique: true,
        fields: [
          { name: "country_id" },
        ]
      },
    ]
  });
};
