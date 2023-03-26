const { Videogame, Genre, videogamesxgenres, videogamesxplatforms, Console } = require('../db')
const axios = require('axios')
require('dotenv').config();
const {
  API_KEY
} = process.env;

const { v4: uuidv4 } = require('uuid');


function isUUID(uuid) {
  let s = "" + uuid;

  s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
  if (s === null) {
    return false;
  }
  return true;
}


async function getAllGames(req, res, next) {
  if (req.query.name) {
    const videogameApi = axios.get(
      `https://api.rawg.io/api/games?search=${req.query.name}&key=${API_KEY}&page_size=15`
    );
    const myVideogames = Videogame.findAll();

    Promise.all([videogameApi, myVideogames])
      .then((response) => {
        let [resVideogameApi, resMyVideogames] = response;
        return res.json(resMyVideogames.concat(resVideogameApi.data.results));
      })
      .catch((err) => next(err));
  } else {
    var allvideogames = [];

    var videogameApi = `https://api.rawg.io/api/games?key=${API_KEY}`

    for (let i = 0; i < 5; i++) {
      let videogames = (await axios.get(videogameApi)).data
      videogameApi = videogames.next
      let gameData = videogames.results.map((game) => {

        let generos = [];
        let plataforma = [];

        if (game.genres) {
          for (let i = 0; i < game.genres.length; i++) {
            generos.push(game.genres[i].name)
          }
        }

        if (game.platforms) {
          for (let i = 0; i < game.platforms.length; i++) {
            plataforma.push(game.platforms[i].platform.name)
          }
        }

        var videogame = {
          name: game.name,
          background_image: game.background_image,
          genres: generos.join(", "),
          // platforms: game.platforms.map((p) => p.platform.name).filter(p => p != null).join(', '),
          platforms: plataforma.join(', '),
          source: "Api",
          id: game.id,
          rating: game.rating
        };
        return videogame
      })
      allvideogames = allvideogames.concat(gameData)
    }
    let myVideogames = await Videogame.findAll({ include: Genre })
    let dbGames = myVideogames.map((database) => database.toJSON())
    dbGames.forEach(dbg => {

      let generos = [];

      if (dbg.genres) {
        for (let i = 0; i < dbg.genres.length; i++) {
          generos.push(dbg.genres[i].name)
        }
      }


      dbg.source = "Created",
        dbg.genres = generos.join(" ")
    });
    allvideogames = allvideogames.concat(dbGames)

    res.json(allvideogames)
  }
}



function getGame(req, res, next) {


  if (isUUID(req.params.id)) {
    Videogame.findByPk(req.params.id, { include: [{ model: Genre }, { model: Console }] })
      .then(function (game) {
        if (!game) {
          return res.status(404).send('No existe un juego con ese ID')
        } else {
          return res.json(game)
        }
      }).catch(e => next(e))
  } else {
    const videogameApi = axios.get(`https://api.rawg.io/api/games/${req.params.id}?key=${API_KEY}`)
      .then(response => res.json({
        id: response.data.id,
        name: response.data.name,
        background_image: response.data.background_image,
        description: response.data.description,
        released: response.data.released,
        rating: response.data.rating,
        platforms: response.data.platforms,
        genres: response.data.genres,
      }))
      .catch(err => next(err))
  }
}

// async function addVideogame(req,res,next){

//     const id = uuidv4();
//     const videogameBody = {...req.body, id};

//     try {
//         const createdVideogame = await Videogame.create(videogameBody)
//         res.json(createdVideogame)
//     } catch(error){
//         next(error)
//     }


//     console.log(videogameBody.name)
// }

async function addVideogame(req, res, next) {
  const id = uuidv4();
  // const videogameBody = {...req.body, id};
  try {
    const createdVideogame = await Videogame.create({
      id: id,
      name: req.body.name,
      description: req.body.description,
      rating: req.body.rating,
      released: req.body.released,
      platforms: req.body.platforms,
      genres: req.body.genres,
      background_image: req.body.picture
    })
    var videogameId = createdVideogame.id
    var genreId = req.body.genres;
    var platformId = req.body.platforms;
    var newGame = createdVideogame;

    var relations = []
    var relations2 = []

    // genreId.map(g => {
    //     relations.push(
    //         {videogameId:videogameId,
    //          genreId: g}
    //     )
    // })

    genreId.map(g => {
      createdVideogame.addGenre(g)
    })

    platformId.map(p => {
      createdVideogame.addConsole(p)
    })



    // videogamesxgenres.bulkCreate(relations)
    // videogamesxplatforms.bulkCreate(relations2)
    res.json(newGame)
  } catch (error) {
    next(error)
  }

}

module.exports = {
  getAllGames,
  getGame,
  addVideogame

}