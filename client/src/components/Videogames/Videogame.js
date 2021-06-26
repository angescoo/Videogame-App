import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Games from '../Games/Games.js';
import Pagination from '../Pagination/pagination.js';
import { getGame, getAllGames, addGameFavorite} from '../../actions/index.js'
import './Videogame.css'
import {Link} from 'react-router-dom';

export function Videogame(props){

	const [numeroPagina, setNumeroPagina] = useState(1); 

	const grupo = 15;
	const conteoFinal = numeroPagina * grupo;
	const conteoInicial = conteoFinal - grupo;
   let vgames;

	props.filterBy === "All"
    ? (vgames = props.videogames.slice(conteoInicial, conteoFinal))
    : (vgames = props.filteredVideogames.slice(conteoInicial, conteoFinal));


	// const vgames = props.videogames.slice(conteoInicial, conteoFinal)
 

	useEffect(()=> {
		props.getAllGames()
	},[])

    let videogameData = vgames.length === 0? 'No games' : vgames.map(game => {

       return (<div className="divGame" key={game.id}>
            <Games
            name={game.name}
            img={game.background_image}
            id={game.id}
            // genres={generos.join(" ")}
			genres={game.genres}
			/>
       

        </div>)
        })

	return (
		props.videogames.length === 0? <div className="loadContainer"><img src='https://media1.giphy.com/media/l4FGKbWgkhHVGXzTW/source.gif' className="loading"></img></div> :
	<div className="allHome">

{/*---------------PAGINADO BOTONES------------------*/}

			<div className="paginationBtns">
                  <Pagination allVideogames={props.filteredVideogames.length > 0 || props.filterBy !== 'All'? props.filteredVideogames : props.videogames} page={numeroPagina} setPage={setNumeroPagina}></Pagination>
	        </div>
		

{/*--------------------Games-----------------------*/}
<div className="contenedor">
				<div className="gameDiv">
					<div className="videogame1">{videogameData}</div>
                </div>

{/*---------------PAGINADO BOTONES------------------*/}

            <div className="paginationBtns">
                  <Pagination allVideogames={props.filteredVideogames.length > 0 || props.filterBy !== 'All'? props.filteredVideogames : props.videogames} page={numeroPagina} setPage={setNumeroPagina}></Pagination>
	        </div>
			</div>
		</div>
	)
}

function mapStateToProps(state){
	return {
		videogames: state.videogames,
		filterBy: state.filterBy,
		filteredVideogames: state.filteredVideogames,
	}
}

function mapDispatchToProps(dispatch){
	return {
        addGameFavorite: game => dispatch(addGameFavorite(game)),
		getAllGames: () => dispatch(getAllGames()),
		getGame: nombre => dispatch(getGame(nombre))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Videogame)

