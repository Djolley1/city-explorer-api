'use strict'

const axios = require('axios');

class Movie {
    constructor(movieObj) {
        console.log(movieObj);
      this.title = movieObj.title;
      this.releaseDate = movieObj.release_date;
      this.overview = movieObj.overview;
      this.posterPath = movieObj.poster_path;
    }
  };

  //New
async function getMovies(req, res) {
  //New
    try {
        const cache = {};
        const { city } = req.query;
        //New
        const cacheKey = `movies_${city}`;

        //New
        // if (cache[cacheKey]) {
        //   console.log('Movies data retrieved from cache');
        //   return res.status(200).json(cache[cacheKey]);
        // }

        if (cache[cacheKey]) {
          let now = Date.now();
          let timePassed = (now - cache[key].timestamp) / 1000;
          if (timePassed < 3600) {
            console.log('time passed:', timePassed);
            console.log('Movie data retrieved from cache', cache[cacheKey]);

            res.json(cache[cacheKey].movies);
            return
          }
        }
        console.log('No movies in cache')
  
        const apiKeyMovie = process.env.MOVIE_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKeyMovie}&language=en-US&query=${city}&page=1&include_adult=false`);
        
        
        const moviesData = response.data.results;
        
        const movies = moviesData.map(movie => new Movie(movie));
        console.log("movie data", movies)

        //New
        cache[cacheKey] = {
          timestamp: Date.now(),
          movies: movies
        };
        
  
        res.status(200).json(movies);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        res.status(500).json({ message: 'Internal Server Error'});
      }
    };

    module.exports = getMovies