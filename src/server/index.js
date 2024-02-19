import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';

import pkg from 'pg';
import { error } from 'console';
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

const saltRounds = 10; 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/auth/signIn', (req, res) => {
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

app.post("/auth/register", async (req, res) => {
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

app.post("/api/playback", (req, res) => {
  const { action, audioFileUrl } = req.body;

  try {
    if (action === 'play') {
      const sound = new Audio();
      sound.src = audioFileUrl;
      sound.play();
    } else if (action === 'pause') {
      sound.pause();
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing playback request:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/', (req, res) =>{
  res.sendFile("C:/Users/alexk/Documents/AlTo/src/server/index.html");
});

app.post('/insertSong', async (req, res) => {
  const client = await pool.connect();
  console.log("Connected to the pg database");

  try {
    const query = "INSERT INTO songs (title, author, duration, song_url, photo_url) VALUES ($1, $2, $3, $4, $5)";
    const request = req.body;


    await client.query(query, [request.title, request.author, request.duration, request.song_url, request.photo_url]);
    console.log("Added to database");

    res.status(200).send("Song added successfully");
  } catch (error) {
    console.error("Error adding song to database:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    client.release();
  }
});

async function getAudioDuration(audioUrl) {
  return new Promise((resolve, reject) => {
    mp3Duration(audioUrl, (err, duration) => {
      if (err) {
        reject(err);
      } else {
        resolve(Math.round(duration));
      }
    });
  });
}

app.get("/api/getSongs", async (req, res) =>{
  const client = await pool.connect();
  console.log("Connected to the pg database");
  const response = await client.query("SELECT * FROM songs");
  res.status(200).json(response);
  client.release();
});

app.post("/api/getSongsSearch", async (req, res) =>{
  const client = await pool.connect();
  console.log("Connected to the pg database");
  if(req.body.filterValue == 0){
    const response = await client.query("SELECT * FROM songs WHERE LOWER(title) LIKE LOWER($1);", [`%${req.body.searchValue}%`]);
    res.status(200).json(response);
  }
  else {
    const response = await client.query("SELECT * FROM songs WHERE LOWER(title) LIKE LOWER($1) AND class_year = $2;", [`%${req.body.searchValue}%`, req.body.filterValue]);
    res.status(200).json(response);
  }
  client.release();
});
app.post("/api/postUser", async (req, res) => {
  try {
    const client = await pool.connect();
    console.log('Connected to the pg database');

    const password = req.body.password;
    const email = req.body.email;

    const response = await client.query("SELECT * FROM users WHERE email = $1", [email]);

    if (response.rows.length > 0) {
      const user = response.rows[0];
      // Compare the provided password with the hashed password stored in the database
      if (bcrypt.compareSync(password, user.password)) {
        console.log(user);
        res.status(200).json(user);
      } else {
        console.log('Invalid password');
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      console.log('User not found');
      res.status(404).json({ message: 'User not found' });
    }

    client.release(); // Release the connection in the success case
  } catch (error) {
    console.error('Error querying user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post("/api/likeSong", async (req, res) => {
  const client = await pool.connect();

  try {
    const user = req.body.user;
    const song = req.body.song;

    const checkResult = await client.query("SELECT COUNT(*) FROM liked_songs WHERE user_id = $1 AND song_id = $2", [user.id, song.id]);
    const likeCount = checkResult.rows[0].count;

    if (likeCount === '0') {  // Note: comparing with the string '0' because COUNT(*) returns a string
      await client.query("INSERT INTO liked_songs (user_id, song_id) VALUES ($1, $2)", [user.id, song.id]);
      console.log(`Added ${song.title} to ${user.name}'s liked songs`);
    } else {
      console.log("User has already liked this song!");
    }

    res.status(200).json({ success: true, message: 'Song liked successfully' });
  } catch (error) {
    console.error("Error during liking song:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  } finally {
    client.release();
  }
});

app.post("/api/getLikedSongs", async (req, res) => {
  const client = await pool.connect();

  try {
    const user_id = req.body.user_id;

    const query = "SELECT songs.* FROM songs JOIN liked_songs ON songs.id = liked_songs.song_id WHERE liked_songs.user_id = $1";
    const values = [user_id];

    const result = await client.query(query, values);

    res.json(result); // Send only the data rows
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    client.release();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




