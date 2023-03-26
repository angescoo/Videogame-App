import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Games from '../Game/Game.js';
import Pagination from '../Pagination/Pagination.js';
import Filters from '../Filters/Filters.js';
import { getGame, getAllGames, addGameFavorite, searchGame, resetSearch } from '../../actions/index.js'
import './Videogame.css'

export function Videogame(props) {

  const [numeroPagina, setNumeroPagina] = useState(1);
  var [title, setTitle] = useState("")

  const grupo = 15;
  const conteoFinal = numeroPagina * grupo;
  const conteoInicial = conteoFinal - grupo;
  let vgames;

  props.filterBy === "All" && title === ''
    ? (vgames = props.videogames.slice(conteoInicial, conteoFinal))
    : (vgames = props.filteredVideogames.slice(conteoInicial, conteoFinal));

  useEffect(() => {
    console.log('revisar')
    props.getAllGames()
  }, [])

  useEffect(() => {
    console.log('revisar otro')
    props.searchGame(title)
  }, [title])




  function handleChange(event) {
    setTitle(event.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault();

    if (title.length === 0) {
      alert("Insert a valid game name")
    } else {
      props.searchGame(title)
    }



  }
  function handleClick(event) {
    props.resetSearch()
  }


  let videogameData = vgames.length === 0 ? 'No games' : vgames.map(game => {

    return (<div className="divGame" key={game.id}>
      <Games
        name={game.name}
        img={game.background_image}
        id={game.id}
        genres={game.genres}
      />


    </div>)
  })

  return (
    props.videogames.length === 0 ? <div className="loadContainer"><img src='https://media1.giphy.com/media/l4FGKbWgkhHVGXzTW/source.gif' className="loading"></img></div> :
      <div className="allHome">
        {/* ---------------------Buscador-------------------- */}
        <div className="searchContainer">
          <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <input
                className="inputSearch"
                placeholder="Search game"
                type="text"
                id="title"
                autoComplete="off"
                value={title}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button className="btnSearch material-icons" type="submit">search</button>
          </form>
        </div>
        <div className="ordContainer">
          <Filters />
        </div>

        {/*---------------PAGINADO BOTONES------------------*/}

        <div className="paginationBtns">
          <Pagination allVideogames={props.filteredVideogames.length > 0 || props.filterBy !== 'All' ? props.filteredVideogames : props.videogames} page={numeroPagina} setPage={setNumeroPagina}></Pagination>
        </div>


        {/*--------------------Games-----------------------*/}
        <div className="contenedor">
          <div className="gameDiv">
            <div className="videogame1">{videogameData}</div>
          </div>
        </div>
      </div>
  )
}

function mapStateToProps(state) {
  return {
    videogames: state.videogames,
    filterBy: state.filterBy,
    filteredVideogames: state.filteredVideogames,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addGameFavorite: game => dispatch(addGameFavorite(game)),
    getAllGames: () => dispatch(getAllGames()),
    getGame: nombre => dispatch(getGame(nombre)),
    searchGame: title => dispatch(searchGame(title)),
    resetSearch: () => dispatch(resetSearch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Videogame)

