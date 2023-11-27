const { Sequelize } = require('sequelize');
const initModels = require("./init-models");
const sequelize = new Sequelize('sakila', 'sa', 'P@$$w0rd', {
    dialect: 'mssql',
    host: process.env.DB_SERVER ?? 'localhost',
    port: 1433,
  });
exports.sequelize = sequelize
exports.dbContext = { ...initModels(sequelize), _sequelize: sequelize }
