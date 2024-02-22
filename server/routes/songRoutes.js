import express from 'express';
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

router.post('/insertSong', async (req, res) => {
    const client = await pool.connect();
  console.log("Connected to the pg database");
  try {
    const query = "INSERT INTO songs (title, author, duration, song_url, photo_url, class_year) VALUES ($1, $2, $3, $4, $5, $6)";
    const request = req.body;
    await client.query(query, [request.title, request.author, request.duration, request.song_url, request.photo_url, request.class_year]);
    console.log("Added to database");
    res.status(200).send("Song added successfully");
  } catch (error) {
    console.error("Error adding song to database:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    client.release();
  }
});

export default router;
