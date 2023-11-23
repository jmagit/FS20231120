const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Usuarios', {
    idUsuario: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    roles: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'Usuarios',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Usuarios",
        unique: true,
        fields: [
          { name: "idUsuario" },
        ]
      },
    ]
  });
};
