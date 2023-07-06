const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())
app.use(bodyParser.json());

const client = require('./config/db');

app.get('/', async (req, res) => {
    try {
        const results = await client.query('SELECT * FROM your_table');
        res.json(results);
    } catch (err) {
        console.log(err);
    }
})
app.listen(PORT, () => {
  console.log(`app is running on PORT:${PORT}`);
})