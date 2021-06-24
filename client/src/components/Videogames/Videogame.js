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
   const totalPages = Math.ceil(props.videogames.length / 15);
   const allPages = [];
   for(let i = 1; i <= totalPages; i++){
     allPages.push(i)
   }

   console.log(allPages)
	props.filterBy === "All"
    ? (vgames = props.videogames.slice(conteoInicial, conteoFinal))
    : (vgames = props.filteredVideogames.slice(conteoInicial, conteoFinal));


	// const vgames = props.videogames.slice(conteoInicial, conteoFinal)
 

	useEffect(()=> {
		props.getAllGames()
	},[])

    const videogameData = vgames.map(game => {

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

		const pageData = allPages.map(p => {
            if(p === allPages[0] || p === allPages[allPages.length - 1]){

			}
			else if (p === numeroPagina - 1 || p === numeroPagina - 2 || p === numeroPagina + 1 || p === numeroPagina + 2){
			return (
				<Link to={`/home?pag=${p}`}>
				<button className="currentPage" onClick={() => setNumeroPagina(p)}>{p}</button>
				</Link>				
			)} 
			else if ( p === numeroPagina ) {
				return (
					<Link to={`/home?pag=${p}`}>
					<button className="current" onClick={() => setNumeroPagina(p)}>{p}</button>
					</Link>				
				)	
			}

			 })

	return (
		props.videogames.length === 0? <div className="loadContainer"><img src='https://media1.giphy.com/media/l4FGKbWgkhHVGXzTW/source.gif' className="loading"></img></div> :
	<div className="allHome">

{/*---------------PAGINADO BOTONES------------------*/}
<div className="paginationBtns">
                 { allPages[0] === numeroPagina? null : 
					 <Link to={`/home?pag=${numeroPagina - 1}`}>
					<button className="btnBack material-icons" onClick={() => {if(numeroPagina > 1) setNumeroPagina(numeroPagina - 1)}}>arrow_left</button>
			     </Link>}
				 <Link to={`/home?pag=${allPages[0]}`}>
			         <button className={numeroPagina === allPages[0]? "current" : "currentPage"} onClick={() => setNumeroPagina(allPages[0])}>{allPages[0]}</button>
			     </Link>
			    {
					(numeroPagina -2) - allPages[0] >= 2? <button className="range">...</button> : null
				}
				 {pageData}
				{
					allPages[allPages.length - 1] - (numeroPagina + 2) >= 2? <button className="range">...</button> : null
				}
				 <Link to={`/home?pag=${allPages[allPages.length - 1]}`}>
			<button className={numeroPagina === allPages[allPages.length - 1]? "current" : "currentPage"} onClick={() => setNumeroPagina(allPages[allPages.length - 1])}>{allPages[allPages.length - 1]}</button>
			</Link>
			    {
				     allPages[allPages.length - 1] === numeroPagina? null :
				 <Link to={`/home?pag=${numeroPagina + 1}`}>
			        <button className="btnNext material-icons" onClick={() => setNumeroPagina(numeroPagina + 1)}>arrow_right</button>
			    </Link>}
		        </div>
		

{/*--------------------Games-----------------------*/}
<div className="contenedor">
				<div className="gameDiv">
					<div className="videogame1">{videogameData}</div>
                </div>

{/*---------------PAGINADO BOTONES------------------*/}

<div className="paginationBtns">
                 { allPages[0] === numeroPagina? null : 
					 <Link to={`/home?pag=${numeroPagina - 1}`}>
					<button className="btnBack material-icons" onClick={() => {if(numeroPagina > 1) setNumeroPagina(numeroPagina - 1)}}>arrow_left</button>
			     </Link>}
				 <Link to={`/home?pag=${allPages[0]}`}>
			         <button className={numeroPagina === allPages[0]? "current" : "currentPage"} onClick={() => setNumeroPagina(allPages[0])}>{allPages[0]}</button>
			     </Link>
			    {
					(numeroPagina -2) - allPages[0] >= 2? <button className="range">...</button> : null
				}
				 {pageData}
				{
					allPages[allPages.length - 1] - (numeroPagina + 2) >= 2? <button className="range">...</button> : null
				}
				 <Link to={`/home?pag=${allPages[allPages.length - 1]}`}>
			<button className={numeroPagina === allPages[allPages.length - 1]? "current" : "currentPage"} onClick={() => setNumeroPagina(allPages[allPages.length - 1])}>{allPages[allPages.length - 1]}</button>
			</Link>
			    {
				     allPages[allPages.length - 1] === numeroPagina? null :
				 <Link to={`/home?pag=${numeroPagina + 1}`}>
			        <button className="btnNext material-icons" onClick={() => setNumeroPagina(numeroPagina + 1)}>arrow_right</button>
			    </Link>}
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

