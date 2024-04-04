'use strict';

const axios = require('axios');

class Forecast {
    constructor(dayObj) {
      this.date = dayObj.datetime;
      this.description = dayObj.weather.description;
      this.minTemp = dayObj.min_temp;
      this.maxTemp = dayObj.max_temp;
    }
  }
  
    async function getWeather(req, res) {
    try {
      const {lat, lon} = req.query;
  
      const apiKey = process.env.WEATHER_API_KEY;
      const weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKey}&lat=${lat}&lon=${lon}&days=5&units=I`);
      
      const weatherData = weatherResponse.data.data;
      
  
    const forecasts = weatherData.map(day => new Forecast(day));
  
  
    res.status(200).json(forecasts);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Internal Server Error'});
      }  
  };

  module.exports = getWeather
