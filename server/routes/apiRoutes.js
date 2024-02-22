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
router.post('/playback', (req, res) => {
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

router.get('/getSongs', async (req, res) => {
  const client = await pool.connect();
  console.log("Connected to the pg database");
  const response = await client.query("SELECT * FROM songs");
  res.status(200).json(response);
  client.release();
});

router.post('/getSongsSearch', async (req, res) => {
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

export default router;
