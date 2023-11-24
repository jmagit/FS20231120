var DataTypes = require("sequelize").DataTypes;
var _Contactos = require("./contactos");
var _Roles = require("./roles");
var _RolesUsuario = require("./roles-usuario");
var _Usuarios = require("./usuarios");

function initModels(sequelize) {
  var Contactos = _Contactos(sequelize, DataTypes);
  var Roles = _Roles(sequelize, DataTypes);
  var RolesUsuario = _RolesUsuario(sequelize, DataTypes);
  var Usuarios = _Usuarios(sequelize, DataTypes);

  Roles.belongsToMany(Usuarios, { as: 'idUsuarioUsuarios', through: RolesUsuario, foreignKey: "idRol", otherKey: "idUsuario" });
  Usuarios.belongsToMany(Roles, { as: 'idRolRoles', through: RolesUsuario, foreignKey: "idUsuario", otherKey: "idRol" });
  RolesUsuario.belongsTo(Roles, { as: "idRolRole", foreignKey: "idRol"});
  Roles.hasMany(RolesUsuario, { as: "rolesUsuarios", foreignKey: "idRol"});
  RolesUsuario.belongsTo(Usuarios, { as: "idUsuarioUsuario", foreignKey: "idUsuario"});
  Usuarios.hasMany(RolesUsuario, { as: "rolesUsuarios", foreignKey: "idUsuario"});

  return {
    Contactos,
    Roles,
    RolesUsuario,
    Usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
