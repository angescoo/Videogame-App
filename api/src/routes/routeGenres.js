const {Genre} = require('../db')
const {getGenres} = require('../Handlers/GenresHandler')
const router = require('express').Router();


router.get('/', getGenres)
  ;

  module.exports = router;