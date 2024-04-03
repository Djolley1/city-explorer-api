'use strict';

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const weatherData = require('./weather.json');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


class Forecast {
  constructor(datetime, description) {
    console.log("this is datetime", datetime)
    this.date = datetime;
    this.description = description;
  }
}

  app.get('/weather', async (req, res) => {
    try {
      const {lat, lon, searchQuery} = req.query;
      console.log(lat, lon, searchQuery)
      const foundCity = weatherData.find(cityObj => cityObj.lat === lat || cityObj.lon === lon || cityObj.city_name === searchQuery);
      console.log("found city", foundCity)

      const forecasts = foundCity.data.map(weatherObj => new Forecast(weatherObj.datetime, weatherObj.weather.description));
console.log("this is forecast", forecasts)
      res.status(200).send(forecasts);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ message: 'Internal Server Error'});
    }  
  });

  app.get('/', (req, res) => {
    res.send('Hello, this is your Express server!');
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });