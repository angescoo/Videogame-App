import { GET_ALL_GAMES, GET_GAME_DETAIL, GET_GAME, SORT_GAMES, SORT_RATING, FILTER_GAME, GET_GENRES, SEARCH_GAME, ORDER_BY_CREATOR, ORDER_BY_GENRE } from '../actions/index.js'



const initialState = {
  videogames:[],
	gameDetail:[],
  gameFavs:[],
	gameName:[],
  gameSorts:[],
  gameCreated:[],
	genres:[],
  filteredVideogames:[],
  filterBy:"All",
  };

  function rootReducer(state=initialState, action){
    
    if(action.type === GET_ALL_GAMES){
      return{
        ...state,
        videogames: action.payload
      }
    }
    if (action.type === GET_GAME_DETAIL){
      return{
        ...state,
        gameDetail: action.payload,
        gameName: action.payload.nombre
      }
    }
    if (action.type === GET_GAME){
      return{
        ...state,
        videogames: action.payload
      }
    }
    if (action.type === SORT_GAMES){
      console.log(action.payload)
      return{
        ...state,
        filteredVideogames: action.payload,
        filterBy: 'alpha'
      }
    }
    if (action.type === GET_GENRES){
      return{
        ...state,
        genres: action.payload
      
      }
    }
    if (action.type === SORT_RATING){
      return{
        ...state,
        filteredVideogames: action.payload,
        filterBy: 'rating'
      }
    }
    if (action.type === FILTER_GAME){
      return{
        ...state,
        videogames: [action.payload]
      }
    }
    if (action.type === "SEARCH_GAME") {
      return {
        ...state,
        gameName: action.payload
      };
  }
  if (action.type === "ADD_GAME_FAVORITE") {
    return {
      ...state,
      gameFavs: state.gameFavs.concat(action.payload)

    }
}

if(action.type === "REMOVE_GAME_FAVORITE"){
  return{
      ...state,
      gameFavs: state.gameFavs.filter(game => game.id !== action.payload.id)
  }
}
// --------------
if(action.type === "ORDER_BY_GENRE"){
  return {
    ...state,
    filteredVideogames: action.payload.videogameGenre,
        filterBy: action.payload.genre,
  }}
if(action.type === "ORDER_BY_CREATOR"){
  return {
    ...state,
    filteredVideogames: action.payload.videogameSource,
    filterBy: action.payload.source,
  }
}
  if(action.type === "RESET"){
    return {
      ...state,
      gameName: []
    }
  }

  
    return state;
  }
 

  
  export default rootReducer;