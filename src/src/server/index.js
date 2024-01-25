import { fileURLToPath } from "url";
import express from 'express';
import path from 'path';
import { dirname } from "path";
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Send the 'index.html' file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
