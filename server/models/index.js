import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import configModule from '../config/config.js'; // Import the config module

// Resolve __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine environment
const env = process.env.NODE_ENV || 'development';
const config = configModule[env]; // Use the environment-specific config

// Initialize Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Initialize an empty db object
const db = {};

// Dynamically import all model files
const files = fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js');

for (const file of files) {
  const modelPath = path.join(__dirname, file);
  const model = (await import(modelPath)).default(sequelize, DataTypes);
  db[model.name] = model;
}

// Setup model associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add Sequelize instance to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
