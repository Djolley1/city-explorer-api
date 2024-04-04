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
  constructor(dayObj) {
    this.date = dayObj.datetime;
    this.description = dayObj.weather.description;
    this.minTemp = dayObj.min_temp;
    this.maxTemp = dayObj.max_temp;
  }
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.releaseDate = movieObj.release_date;
    this.overview = movieObj.overview;
  }
}

  app.get('/weather', async (req, res) => {
    try {
      const {lat, lon} = req.query;

      const apiKey = process.env.WEATHER_API_KEY; // Ensure you have an API key for the weather API
      const weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKey}&lat=${lat}&lon=${lon}&days=5&units=I`);
      
      const weatherData = weatherResponse.data.data;
      

    const forecasts = weatherData.map(day => new Forecast(day));


    res.status(200).json(forecasts);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Internal Server Error'});
      }  
  });

  app.get('/movies', async (req, res) => {
    // try {
      const { city } = req.query;

      const apiKeyMovie = process.env.MOVIE_API_KEY;
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKeyMovie}&language=en-US&query=${city}&page=1&include_adult=false`);
      
      
      const moviesData = response.data.results;
      
      const movies = moviesData.map(movie => new Movie(movie));
      console.log("movie data", movies)

      res.status(200).json(movies);
    // } catch (error) {
    //   console.error('Error fetching movie data:', error);
    //   res.status(500).json({ message: 'Internal Server Error'});
    // }
  })

  app.get('/', (req, res) => {
    res.send('Hello, this is your Express server!');
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });