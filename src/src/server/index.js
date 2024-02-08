import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'alto.postgres.database.azure.com',
  user: 'alto',
  password: 'NOIT_2024',
  database: 'alto',
  port: 5432,
  ssl: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/auth/signIn', (req, res) => {
  pool.connect()
    .then(client => {
      console.log('Connected to the PostgreSQL database');

      return client.query('SELECT * FROM users WHERE email = $1', [req.body.email])
        .then(result => {
          if (result.rows.length > 0) {
            const user = result.rows[0];
            if (user.password === req.body.password) {
              console.log('You have logged in');

              res.status(200).json({ signedIn: true });
            } else {
              console.log('Invalid credentials');
              res.status(200).json({ signedIn: false, message: 'Invalid credentials' });
            }
          } else {
            console.log('User not found');
            res.status(404).json({ signedIn: false, message: 'User not found' });
          }
        })
        .catch(error => {
          console.error('Error executing the query:', error);
          res.status(500).json({ signedIn: false, message: 'Internal Server Error' });
        })
        .finally(() => {
          client.release();
        });
    })
    .catch(error => {
      console.error('Error connecting to the database:', error);
      res.status(500).json({ signedIn: false, message: 'Internal Server Error' });
    });
});


app.post("/auth/register", (req, res)=>{
  pool.connect();
}); 

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
