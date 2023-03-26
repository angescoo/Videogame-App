export const GET_ALL_GAMES = 'GET_ALL_GAMES'
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL'
export const GET_GAME = 'GET_GAME'
export const SORT_GAMES = 'SORT_GAMES'
export const SORT_RATING = 'SORT_RATING'
export const FILTER_GAME = 'FILTER_GAME'
export const GET_GENRES = 'GET_GENRES'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const ASD = 'Order-A-Z';
export const DES = 'Order-Z-A';
export const HASD = 'RATING_ASD';
export const HDES = 'RATING_DES';
export const SEARCH_GAME = "SEARCH_GAME";
export const ORDER_BY_GENRE = 'ORDER_BY_GENRE';
export const ORDER_BY_CREATOR = 'ORDER_BY_CREATOR';



export function getAllGames() {
  return function (dispatch) {
    return fetch('http://localhost:3001/videogames')
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_ALL_GAMES, payload: json })
      })
  }
}

export function getGame(name) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogames?name=${name}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_GAME, payload: json })
      })
  }
}

export function getGameDetail(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogame/${id}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_GAME_DETAIL, payload: json })
      })
  }
}


export function getGenres() {
  return function (dispatch) {
    return fetch('http://localhost:3001/genres')
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_GENRES, payload: json })
      })
  }
}

export function getPlatforms() {
  return function (dispatch) {
    return fetch('http://localhost:3001/platforms')
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_PLATFORMS, payload: json })
      })
  }
}


export function sort(orden, ogames) {

  let games = [...ogames]
  games.sort((a, b) => {


    var nombreA = a.name.toUpperCase()
    var nombreB = b.name.toUpperCase()

    if (orden === ASD) {
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1
      }
      return 0
    }
    if (orden === DES) {
      if (nombreA < nombreB) {
        return 1;
      }
      if (nombreA > nombreB) {
        return -1
      }
      return 0
    }
  })
  return function (dispatch) {
    dispatch({ type: SORT_GAMES, payload: games })
  }
}

export function sortRating(orden, oRating) {
  let rating = [...oRating]

  rating.sort(function (a, b) {

    var ratingA = parseFloat(a.rating)
    var ratingB = parseFloat(b.rating)



    if (orden === HASD) {
      if (ratingA < ratingB) {
        return -1;
      }
      if (ratingA > ratingB) {
        return 1
      }
      return 0
    }
    if (orden === HDES) {
      if (ratingA < ratingB) {
        return 1;
      }
      if (ratingA > ratingB) {
        return -1
      }
      return 0
    }
  })
  return function (dispatch) {
    dispatch({ type: SORT_RATING, payload: rating })
  }
}

export function filterGame(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogame/${id}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: FILTER_GAME, payload: json })
      })
  }
}

export function addGameFavorite(payload) {
  return { type: "ADD_GAME_FAVORITE", payload };
}

export function removeGameFavorite(payload) {
  return { type: "REMOVE_GAME_FAVORITE", payload }

}

// export function searchGame(titulo) {
//   return function(dispatch) {
//     return fetch(`http://localhost:3001/videogames?name=${titulo}`)
//       .then(response => response.json())
//       .then(json => {
//         dispatch({ type: SEARCH_GAME, payload: json });
//       });
//   };
// }


export function searchGame(titulo) {
  return function (dispatch, getState) {
    const filteredGames = getState().videogames.slice().filter((game) => (game.name.toLowerCase()).includes(titulo))
    dispatch({ type: SEARCH_GAME, payload: filteredGames });
  }
}

// --------------------

export const orderByGenre = (genres) => (dispatch, getState) => {
  let filteredGames = [];

  if (genres === "All") {
    filteredGames = getState().videogames.slice();
  } else {
    filteredGames = getState()
      .videogames.slice()
      .filter((game) =>
        (game.genres /*|| []*/).includes(genres)
      )
  };
  dispatch({
    type: "ORDER_BY_GENRE",
    payload: {
      genres,
      videogameGenre: filteredGames,
    },
  });
};

export const orderByPlatform = (platform) => (dispatch, getState) => {
  let filteredGames = [];

  if (platform === "All") {
    filteredGames = getState().videogames.slice();
  } else {
    filteredGames = getState()
      .videogames.slice()
      .filter((game) =>
        (game.platforms || '').includes(platform)
      )
  };
  dispatch({
    type: "ORDER_BY_PLATFORM",
    payload: {
      platform,
      videogamePlatform: filteredGames,
    },
  });
};

export const orderByCreator = (source) => (dispatch, getState) => {
  if (source === "allGames") {
    let allVideogames = getState().filteredVideogames.length === 0 ? getState().videogames.slice() : getState().filteredVideogames.slice()
    dispatch({
      type: "ORDER_BY_CREATOR",
      payload: {
        source,
        videogameSource: allVideogames,
      },
    });
  } else {
    let videogameSource = getState().filteredVideogames.length === 0 ? getState().videogames.slice() : getState().filteredVideogames.slice()
      .filter(function (G) {
        return G.source === source
      });
    dispatch({
      type: "ORDER_BY_CREATOR",
      payload: {
        videogameSource,
        source,
      },
    });
  }
};

export const resetSearch = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET",
    });
  };
};