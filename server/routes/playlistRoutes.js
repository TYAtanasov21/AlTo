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

router.post('/createPlaylist', async (req, res) =>{
    const client = await pool.connect();
    try{
        const user_id = req.body.user_id;
        const playlist_name = req.body.playlist_name;

        const checkResult = await client.query("SELECT COUNT(*) FROM playlists WHERE playlist_name = $1 AND user_id = $2", [playlist_name, user_id]);
        const check = checkResult.rows[0].count;
        console.log(check);
        if(check == 0){
            await client.query("INSERT INTO playlists (user_id, playlist_name) VALUES ($1, $2)", [user_id, playlist_name]);
            console.log(`${user_id} has created playlist named ${playlist_name}`);
            res.status(200).json({success: true, message: "Created new playlist"});
        }
        else {
            console.log(`${user_id} already has playlist named ${playlist_name}`);
            res.status(400).json({success: true, message: "This playlist already exists"});
        }
    } catch (error) {
        console.error("Error during creation of playlist:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      } finally {
        client.release();
      }
});

router.post('/addSong', async (req,res) =>{
  const client = await pool.connect();
  console.log("Connected to the pg database");
  try {

    const playlist_id = req.body.playlist_id;
    const song_id = req.body.song_id;
    const query = "INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2)";
    await client.query(query, [playlist_id, song_id]);
    console.log("Added to database");
    res.status(200).json({message: `Song with id ${song_id} added sucessfully into playlist with id ${playlist_id}`});
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    client.release();
  }

});

router.post('/getPlaylistByID', async (req, res) => {
  const client = await pool.connect();
  try {
    const playlist_id = req.body.playlist_id; 
    const result = await client.query("SELECT * FROM playlists WHERE playlist_id = $1", [playlist_id]); // Correct parameter usage
    const data = result.rows[0];
    res.status(200).json({ success: true, message: 'Playlist retrieved', playlist: data });
  } catch (error) {
    console.error("Error retrieving playlist:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  } finally {
    client.release();
  }
});

router.post('/getPlaylists', async (req, res) => {
    const client = await pool.connect();
    try {
        const user_id = req.body.user_id;
        const result = await client.query("SELECT * FROM playlists WHERE user_id = $1", [user_id]);
        const data = result.rows;
        res.status(200).json({ success: true, message: 'Playlists retrieved', playlists: data });
    } catch (error) {
        console.error("Error retrieving playlists:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    } finally {
        client.release();
    }
});


export default router;
