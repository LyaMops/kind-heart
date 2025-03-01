const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());


let database;

// Твій API-ключ
const apiKey = '0470a2fa-80a0-439f-a008-ef24bcda0b9a';

// Маршрут для '/Projects'
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://fabricate.mockaroo.com/api/v1/databases/KindHeart/api/Projects', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    database = response.data;
    res.json(database);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

app.get('/idinahuj', async (req, res) => {
  try {
    res.json(database)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

app.use(express.static('Недобре серце'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
