const {Genre} = require('../db')
const axios = require('axios')
require('dotenv').config();
const {
    API_KEY
  } = process.env;


 async function getGenres(req, res, next) {

  const myGenres = await Genre.findAll();
  if(myGenres.length > 0){

    res.json(myGenres)
  } else {

  const genresApi = axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
  .then(response => {

    res.json(response.data.results)
    response.data.results.forEach(g => {
      var genres = Genre.findOrCreate({
        where:{
          id: g.id,
          name: g.name 
        }
      })
      return genres
    })

   
  }).catch(err => next(err))}

  
}

module.exports = {
  getGenres,
}