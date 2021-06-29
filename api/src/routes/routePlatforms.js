const { Console } = require('../db')
const router = require('express').Router();
const axios = require('axios')
require('dotenv').config();
const {
    API_KEY
  } = process.env;


router.get('/', async (req, res, next) => {

    const myPlatforms = await Console.findAll();
    if(myPlatforms.length > 0){
      res.json(myPlatforms)
    } else {
    const platformsApi = axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    .then(response => {
      res.json(response.data.results)
      response.data.results.forEach(p => {
        var platforms = Console.findOrCreate({
          where:{
            id: p.id,
            name: p.name 
          }
        })
        return platforms
      })
    }).catch(err => next(err))}    
  }
)


  module.exports = router;