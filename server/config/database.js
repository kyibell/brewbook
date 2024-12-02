import Sequelize from 'sequelize';
import * as dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({path: `${__dirname}/../../.env`}); // Had to find the env file like this because wasn't detecting the file

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, { // Create a new Sequelize instance for database config
    dialect: 'postgres',
    host: process.env.DB_HOST, // Host parameter
    port: process.env.DB_PORT, // Port Parameter
    logging: false, // Turn off logging for errors
    dialectOptions: {
        ssl: {
            require: true, // SSL required for Supabase
            rejectUnauthorized: false, 
        },
    },
});

export default sequelize; // Export object