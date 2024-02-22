import express from 'express';
import bcrypt from 'bcrypt';
import pkg from 'pg';
const { Pool } = pkg;

const router = express.Router();
const pool = new Pool({
    host: 'alto.postgres.database.azure.com',
    user: 'alto',
    password: 'NOIT_2024',
    database: 'alto',
    port: 5432,
    ssl: true,
});

const saltRounds = 10;

router.post('/signIn', async (req, res) => {
pool.connect()
    .then(client => {
      console.log('Connected to the pg database');

      return client.query('SELECT * FROM users WHERE email = $1', [req.body.email])
        .then(result => {
          if (result.rows.length > 0) {
            const user = result.rows[0];
            if (bcrypt.compareSync(req.body.password, user.password)) {
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

router.post('/register', async (req, res) => {
    try {
        const username = req.body.name;
        const email = req.body.mail;
        const password = req.body.pass;
    
        if (!username || !email) {
          return res.status(400).json({ code: 0, message: 'Username and email are required' });
        }
    
        const client = await pool.connect();
        console.log("Connected to the pg database");
    
        const check1 = await client.query("SELECT COUNT(*) FROM users WHERE username = $1", [username]);
        const check2 = await client.query("SELECT COUNT(*) FROM users WHERE email = $1", [email]);
    
        if (check1.rows[0].count > 0) {
          res.status(200).json({ code: 2, message: 'Username already exists' });
        } else if (check2.rows[0].count > 0) {
          res.status(200).json({ code: 3, message: 'Email already taken' });
        } else {
          const hashedPassword = bcrypt.hashSync(password, saltRounds);
          res.status(200).json({ code: 1, message: 'Registration successful' });
          return client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
        }
    
        client.release();
      } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).json({ signedIn: false, message: 'Internal Server Error' });
      }
});

export default router;
