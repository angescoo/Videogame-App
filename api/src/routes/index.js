const { Router } = require('express');


const routeGenres = require('./routeGenres.js');
const routeGames = require('./routeGames.js');
const routeGame = require('./routeGame.js');
const bodyParser = require('body-parser');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/genres', routeGenres);

router.use('/videogames', routeGames);

router.use('/videogame', routeGame);

module.exports = router;
