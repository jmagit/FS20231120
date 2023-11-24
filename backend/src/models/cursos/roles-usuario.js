const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RolesUsuario', {
    idUsuario: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Usuarios',
        key: 'idUsuario'
      }
    },
    idRol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Roles',
        key: 'idRol'
      }
    }
  }, {
    sequelize,
    tableName: 'RolesUsuario',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_RolesUsuario",
        unique: true,
        fields: [
          { name: "idUsuario" },
          { name: "idRol" },
        ]
      },
    ]
  });
};
