const { Sequelize } = require('sequelize');
const initModels = require("../models-mysql/init-models");
const sequelize = new Sequelize('mysql://root:root@localhost:3306/cursos')
// const initModels = require("../models-mysql/init-models");
// const sequelize = new Sequelize('cursos', 'sa', 'P@$$w0rd', {
//     dialect: 'mssql',
//     host: 'localhost',
//     port: 1433,
//   });

exports.sequelize = sequelize
exports.dbContext = initModels(sequelize)