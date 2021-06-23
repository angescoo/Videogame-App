import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';

import Games from '../Games/Games.js';
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

    const videogameData = vgames.map(game => {

        // let generos = [];

		// if(game.genres){
        // for(let i = 0; i < game.genres.length; i++) {
        //    generos.push(game.genres[i].name)
        //   } }
        
    


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
	<div className="allHome">

{/*---------------PAGINADO BOTONES------------------*/}

<div className="paginationBtns">
                 <Link to={`/home?pag=${numeroPagina - 1}`}>
					<button className="btnBack material-icons" onClick={() => {if(numeroPagina > 1) setNumeroPagina(numeroPagina - 1)}}>arrow_left</button>
			     </Link>
				    <button className="currentPage">{numeroPagina}</button>
				<Link to={`/home?pag=${numeroPagina + 1}`}>
			        <button className="btnNext material-icons" onClick={() => setNumeroPagina(numeroPagina + 1)}>arrow_right</button>
			    </Link>
		        </div>
		

{/*--------------------Games-----------------------*/}
<div className="contenedor">
				<div className="gameDiv">
					{
						props.videogames.length === 0? <img src='https://media1.giphy.com/media/l4FGKbWgkhHVGXzTW/source.gif' className="loading"></img> : <div className="videogame1">{videogameData}</div>
					}
                </div>

{/*---------------PAGINADO BOTONES------------------*/}

<div className="paginationBtns">
                 <Link to={`/home?pag=${numeroPagina - 1}`}>
					<button className="btnBack material-icons" onClick={() => {if(numeroPagina > 1) setNumeroPagina(numeroPagina - 1)}}>arrow_left</button>
			     </Link>
				    <button className="currentPage">{numeroPagina}</button>
				<Link to={`/home?pag=${numeroPagina + 1}`}>
			        <button className="btnNext material-icons" onClick={() => setNumeroPagina(numeroPagina + 1)}>arrow_right</button>
			    </Link>
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

