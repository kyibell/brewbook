// Dependencies
import express from "express"; // Express.js
const app = express();
import { Sequelize } from "sequelize"; // Sequelize
import * as dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from "cors"; // cors
import sequelize from "./config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({path: `${__dirname}/../../.env`});


// Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.DB_PORT;

sequelize.authenticate().then(() => {
    app.listen(port, () =>
      console.log(
        `Database connected successfully and app listening on port ${port}`
      )
    );
  })

  .catch((error) => {
    console.log(error.message);
  });

// app.listen(port, () => {
//  console.log('Server is running on http://localhost:3000');
// });
