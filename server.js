const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const checker = require("./routes/user");
const itemChecker= require("./routes/item");

const app = express();

const db= require("./config/db");





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

app.use('/', require('./routes/index.js'));



app.listen(PORT, () => {
  console.log(`app is running on PORT:${PORT}`);
})
