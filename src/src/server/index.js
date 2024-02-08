import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";

import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: "alto.postgres.database.azure.com",
  user: "alto",
  password: "NOIT_2024",
  database: "alto",
  port: 5432,
  ssl: true, 
});


client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');

    client.end()
      .then(() => console.log('Disconnected from the PostgreSQL database'))
      .catch(error => console.error('Error discon  necting from the database:', error));
  })
  .catch(error => console.error('Error connecting to the database:', error));

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.post("/check", (req, res)=>{
  if(req.body.email == user.email && req.body.password == user.password){
    res.json({signedIn: 1});
  }
  else{
    res.json({signedIn: 0});
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
