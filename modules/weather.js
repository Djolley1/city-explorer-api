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
// New
async function getWeather(req, res) {
  //New
  try {
    const cache = {};
    const { lat, lon } = req.query;
    // New
    const cacheKey = `${lat}:${lon}`;

    //New
    // if (cache[cacheKey]) {
    //   console.log('Weather data retireved from cache');
    //   return res.status(200).json(cache[cacheKey]);
    // }

    if (cache[cacheKey]) {
      let now = Date.now();
      let timePassed = (now - cache[key].timestamp) / 1000;
      if (timePassed < 3600) {
        console.log('time passed:', timePassed);
        console.log('Weather data retireved from cache', cache[cacheKey]);

        res.json(cache[cacheKey].forecasts);
        return
      }
    }
console.log('No weather in the cache')
      const apiKey = process.env.WEATHER_API_KEY;
      const weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKey}&lat=${lat}&lon=${lon}&days=5&units=I`);

      const weatherData = weatherResponse.data.data;


      const forecasts = weatherData.map(day => new Forecast(day));

      //New
      cache[cacheKey] = {
        timestamp: Date.now(),
        forecasts: forecasts
      };


      res.status(200).json(forecasts);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  module.exports = getWeather
