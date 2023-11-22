const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Language', {
    languageId: {
      autoIncrement: true,
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true,
      field: 'language_id'
    },
    name: {
      type: DataTypes.CHAR(20),
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
    tableName: 'language',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__language__804CF6B2B0C4CB5A",
        unique: true,
        fields: [
          { name: "language_id" },
        ]
      },
    ]
  });
};
