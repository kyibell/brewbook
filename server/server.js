// Dependencies
import express from "express"; // Express.js
const app = express();
import { Sequelize } from "sequelize"; // Sequelize
import * as dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from "cors"; // cors
import sequelize from "./config/database.js";
import authrouter from "./routes/authrouter.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({path: `${__dirname}/../../.env`});


// Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authrouter);

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

