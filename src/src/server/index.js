import { fileURLToPath } from "url";
import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";

const app = express();


const user = {

  email: "azk@gmail.com",
  password: "123"

}


// Serve static files from the 'public' directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.post("/check", (req, res)=>{
  if(req.body.email == user.email && req.body.password == user.password){
    res.json({signedIn: 1});
  }
  else{
    res.json({signedIn: 0});
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
