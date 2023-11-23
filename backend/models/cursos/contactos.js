const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contactos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tratamiento: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sexo: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "H"
    },
    nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    conflictivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    icono: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Contactos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Contactos",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
