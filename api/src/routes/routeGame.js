const router = require('express').Router();
const {getGame, addVideogame} = require('../Handlers/vgHandler')
const { v4: uuidv4 } = require('uuid');
const {Videogame} = require('../db')

router.get('/:id', getGame)
router.post('/', addVideogame)
  ;

  // async function(req,res,next){
    
  //   const id = uuidv4();
  //   const videogameBody = {...req.body, id};
    
  
  //   try {
  //       const createdVideogame = await Videogame.create(videogameBody)
  //       res.json(createdVideogame)
  //   } catch(error){
  //       next(error)
  //   }
    
  
  //   console.log(videogameBody.name)
  // }
  module.exports = router;