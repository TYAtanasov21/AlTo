import { dirname } from "path";
import { fileURLToPath } from "url";
import express from 'express';

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();

const PORT = 3000;

const filePath = __dirname + "/../../public/index.html";

app.get("/", (req, res) => {
  
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(err.status || 500).end();
    }
  });
  // res.sendFile(filePath);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));