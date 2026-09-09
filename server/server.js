const express = require('express');
const fetch = require('node-fetch');
const axios = require('axios');
require('dotenv').config();


const app = express();
const PORT = 3001; //port #

//Allows frontend requests (CORs)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

async function getAccessToken() {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({grant_type: 'client_credentials'}),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':
          'Basic ' + 
          Buffer.from(
            process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
          ).toString('base64'),    
      },   
    }
  );
  return response.data.access_token;
}


app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).send({ error: 'Missing query' });

  try {
    const token = await getAccessToken();
    const searchRes = await axios.get(
      `https://api.spotify.com/v1/search`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          q: query,
          type: 'track',
          limit: 5,
        },
      }
    );

    const tracks = searchRes.data.tracks.items;
    res.send({ tracks });
  } catch (err) {
    console.error('❌ Spotify Search Error:', err.response?.data || err.message || err);
    res.status(500).send({ error: 'Something went wrong' });
  }
});


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

