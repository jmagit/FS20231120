const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Roles', {
    idRol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Roles',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Roles",
        unique: true,
        fields: [
          { name: "idRol" },
        ]
      },
    ]
  });
};
