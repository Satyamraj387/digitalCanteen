const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const dbController= require("./controllers/dbController");
const checker = require("./routes/user");
const itemChecker= require("./routes/item");

const app = express();

const db= require("./config/db");
// const insertUser= require("./config/db");




app.use(cors())
app.use(bodyParser.json());

const connectDB = async function () {
    try {
      await db.connect();
      console.log("Successfully connected to the Database.");
    } catch (error) {
      console.log("Error in connecting to the database .", error);
    }
  };
connectDB();
app.get('/', async (req, res) => {
    try {
        
        const results = await db.query('SELECT * FROM users1');
        // console.log("trying")
        res.json(results);
         
    } catch (err) {
        console.log(err);
    }
})

app.listen(PORT, () => {
  console.log(`app is running on PORT:${PORT}`);
})
