const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Actor', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'actor_id'
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'last_name'
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate'),
      field: 'last_update'
    }
  }, {
    sequelize,
    tableName: 'actor',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "idx_actor_last_name",
        fields: [
          { name: "last_name" },
        ]
      },
      {
        name: "PK__actor__8B2447B5634539C5",
        unique: true,
        fields: [
          { name: "actor_id" },
        ]
      },
    ]
  });
};
