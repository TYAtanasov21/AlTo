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

router.post('/postUser', async (req, res) => {
    try {
        const client = await pool.connect();
        console.log('Connected to the pg database');
    
        const password = req.body.password;
        const email = req.body.email;
    
        const response = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    
        if (response.rows.length > 0) {
          const user = response.rows[0];
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
    
        client.release();
      } catch (error) {
        console.error('Error querying user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
});

router.post('/likeSong', async (req, res) => {
const client = await pool.connect();
  try {
    const user = req.body.user;
    const song = req.body.song;

    const checkResult = await client.query("SELECT COUNT(*) FROM liked_songs WHERE user_id = $1 AND song_id = $2", [user.id, song.id]);
    const likeCount = checkResult.rows[0].count;

    if (likeCount === '0') {
      await client.query("INSERT INTO liked_songs (user_id, song_id) VALUES ($1, $2)", [user.id, song.id]);
      console.log(`Added ${song.title} to ${user.name}'s liked songs`);
    } else {
      await client.query("DELETE FROM liked_songs WHERE user_id = $1 AND song_id = $2", [user.id, song.id]);
      console.log(`Removed ${song.title} from ${user.name}'s liked songs`);
    }

    res.status(200).json({ success: true, message: 'Song liked successfully' });
  } catch (error) {
    console.error("Error during liking song:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  } finally {
    client.release();
  }

});

router.post('/getLikedSongs', async (req, res) => {
    const client = await pool.connect();
    try {
      const user_id = req.body.user_id;
  
      const query = "SELECT songs.* FROM songs JOIN liked_songs ON songs.id = liked_songs.song_id WHERE liked_songs.user_id = $1";
      const values = [user_id];
  
      const result = await client.query(query, values);
  
      res.json(result);
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Internal Server Error");
    } finally {
      client.release();
    }
});

export default router;
