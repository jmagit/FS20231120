const { Sequelize } = require('sequelize');
const initModels = require("./init-models");
const sequelize = new Sequelize('cursos', 'sa', 'P@$$w0rd', {
    dialect: 'mssql',
    host: 'localhost',
    port: 1433,
  });
exports.sequelize = sequelize
exports.dbContext = initModels(sequelize)
