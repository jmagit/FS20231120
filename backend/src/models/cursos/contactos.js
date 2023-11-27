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
      allowNull: true,
      validate: {
        isIn: [['Sr.', 'Sra.', 'Srta.', 'Dr.', 'Dra.', 'Ilmo.', 'Ilma.', 'Excmo.', 'Excma.']],
      }
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1,100],
      }
    },
    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1,100],
      }
    },
    telefono: {
      type: DataTypes.STRING(11),
      allowNull: true,
      validate: {
        is: /^(\d{3}\s){2}\d{3}$/,
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isEmail: true, 
      }
    },
    sexo: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "H",
      validate: {
        isIn: [['H', 'M']],
      }
    },
    nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isBefore: (new Date()).toDateString(), 
      }
    },
    avatar: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        isUrl: true, 
      }
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
