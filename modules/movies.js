'use strict'

const axios = require('axios');

class Movie {
    constructor(movieObj) {
      this.title = movieObj.title;
      this.releaseDate = movieObj.release_date;
      this.overview = movieObj.overview;
    }
  };

async function getMovies(req, res) {
    try {
        const { city } = req.query;
  
        const apiKeyMovie = process.env.MOVIE_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKeyMovie}&language=en-US&query=${city}&page=1&include_adult=false`);
        
        
        const moviesData = response.data.results;
        
        const movies = moviesData.map(movie => new Movie(movie));
        console.log("movie data", movies)
  
        res.status(200).json(movies);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        res.status(500).json({ message: 'Internal Server Error'});
      }
    };

    module.exports = getMovies