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
    try {
      const user = req.body.user;
      const song = req.body.song;
      const playlist = req.body.playlist;
  
      const checkResult = await client.query("SELECT COUNT(*) FROM liked_songs WHERE user_id = $1 AND song_id = $2", [user.id, song.id]);
      const likeCount = checkResult.rows[0].count;
  
        await client.query("INSERT INTO liked_songs (user_id, song_id) VALUES ($1, $2)", [user.id, song.id]);
        console.log(`Added ${song.title} to ${user.name}'s liked songs`);

  
      res.status(200).json({ success: true, message: 'Song liked successfully' });
    } catch (error) {
      console.error("Error during liking song:", error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    } finally {
      client.release();
    }

});

router.post('/getPlaylists', async (req, res) => {
    const client = await pool.connect();
    try {
        const user_id = req.body.user_id;
        const result = await client.query("SELECT playlist_id FROM playlists WHERE user_id = $1", [user_id]);
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
