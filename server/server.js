// Dependencies
import express from 'express'; // Express.js    
const app = express(); 
import { Sequelize } from 'sequelize'; // Sequelize 
import dotenv from 'dotenv' // dotenv
import path from 'path'; // path
import cors from 'cors'; // cors
import sequelize from './config/database.js';

// Configuration
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = 6543;

sequelize.authenticate().then(() => {
    app.listen(port, () => console.log('Database connected successfully and app listening on port 3000'))
})

.catch((error)=>{
    console.log(error.message)
});


// app.listen(port, () => {
  //  console.log('Server is running on http://localhost:3000');
// });
