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



const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// app.post("/check", (req, res) =>{
//   client.connect()
//   .then(() => {
//     console.log('Connected to the PostgreSQL database');
              
//     client.end()
//       .then(() => console.log('Disconnected from the PostgreSQL database'))
//       .catch(error => console.error('Error discon  necting from the database:', error));
//   })
//   .catch(error => console.error('Error connecting to the database:', error));
// });

app.post("/check", (req, res)=>{
  client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');

    // Execute the SELECT query
    return client.query('SELECT * FROM users');
  })
  .then(result => {
    // Process the query results

    const foundUser = result.rows.find(user => user.email === req.body.email);

    if (foundUser) {
      // User found, check password
      if (foundUser.password === req.body.password) {
        console.log("You have logged in");
        res.status(200).json({ signedIn: true });

      } else {
        console.log("Invalid credentials");
        res.status(200).json({ signedIn: false });
      }
    } else {
      console.log("User not found");
      res.status(200).json({ signedIn: false });
    }
    // Disconnect from the PostgreSQL server

  })
  .then(() => {
    console.log('Disconnected from the PostgreSQL database');
  })
  .catch(error => {
    console.error('Error:', error);
  });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
