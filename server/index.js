import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pkg from 'pg';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import songRoutes from './routes/songRoutes.js';
import userRoutes from './routes/userRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';

const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const pool = new Pool({    
  host: 'alto.postgres.database.azure.com',
  user: 'alto',
  password: 'NOIT_2024',
  database: 'alto',
  port: 5432,
  ssl: true,});

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/song', songRoutes);
app.use('/user', userRoutes);
app.use('/playlist', playlistRoutes);


// app.get('/', (req, res) => {
//   res.sendFile("C:/Users/alexk/Documents/AlTo/server/addSongs.html");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
