'use strict';

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const weatherData = require('./weather.json');

dotenv.config();

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const cities = [
  {name: 'Seattle', lat: '47.6062', lon: '-122.3321'},
  {name: 'Paris', lat: '48.8566', lon: '2.3522'},
  {name: 'Amman', lat: '31.9454', lon: '35.9284'}
];


  app.get('/weather', async (req, res) => {
    try {
      const {lat, lon, searchQuery} = req.query;
      console.log(lat, lon, searchQuery)
      const city = cities.find(city => city.lat === lat || city.lon === lon || city.name.toLowerCase() === searchQuery.toLowerCase());
      

      if (!city) {
        return res.status(404).json({message: 'City not found' });
      }

      // const weatherResponse = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.VITE_LOCATION_ACCESS_TOKEN}&q=${searchQuery}&format=json`);
      
      const cityWeatherData = weatherData.data[searchQuery.toLowerCase()];

      if (!cityWeatherData) {
        return res.status(404).json({ message: 'Weather data not available for the city'});
      }

      const forecasts = cityWeatherData.map(weather => new Forecast(weather.date, weather.description));

      res.json(forecasts);
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