const router = require('express').Router();
const axios = require('axios')
require('dotenv').config();
const {getAllGames} = require('../Handlers/vgHandler')
const {Videogame, Genre, videogamesxgenres} = require('../db')

const {
  API_KEY
} = process.env;

// router.get('/', getAllGames);

router.get('/', getAllGames );


  

  module.exports = router;