const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;


const app = express();

const db= require("./config/db");


// const session= require('express-session');
// const passport= require('passport');
// const passportLocal= require('./config/passport-local-strategy');
// const passportJWT = require ('./config/passport-jwt-strategy');
// const passportgoogle = require('./config/passport-google-oauth2-strategy');





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
