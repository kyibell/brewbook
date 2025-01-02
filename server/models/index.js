import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import * as configJson from '../config/config.js';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


const initModels = async () => {
  const fileList =
    fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })

  const modelList = await Promise.all(fileList.map(async (file) => await import(path.join(__dirname, file))));

  const importedModelList = await Promise.all(modelList.map(async (model) => {
    const { default: modelFile } = await model;
    const creadtedModel = modelFile(sequelize, Sequelize.DataTypes);
    db[creadtedModel.name] = creadtedModel;
    return creadtedModel;
  }));

  importedModelList.map((model) => {
    if (db[model.name].associate) {
      db[model.name].associate(db);
    }
  })

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  db.sequelize.sync();
}

initModels();

export default db;
