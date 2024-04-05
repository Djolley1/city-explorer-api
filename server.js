'use strict';

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const weatherData = require('./weather.json');
const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//New code
const cache = {};

app.use(cors());
app.use(express.json());

app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
