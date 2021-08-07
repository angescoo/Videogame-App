import React, {useEffect, useState}  from 'react'
import { connect } from 'react-redux';
import './filter.css'

import { filterGame, getGame, getAllGames, orderByGenre, orderByCreator, getGenres, getPlatforms, orderByPlatform} from '../../actions/index.js'
import Ordinances from '../Ordinances/ordinances.js'

export function Filtros(props){

	const [input, setInput] = useState("")

	useEffect(()=> {
     props.getGenres()	
	 props.getPlatforms()	
	},[])

	  function handleChange(e) {

		setInput(e.target.value)
		  }


      //Filter by Genre
  const handleFilter = (e) => {
    props.orderByGenre(e.target.value);
  };
  const handleFilterPlatforms = (e) => {
    props.orderByPlatform(e.target.value);
  };

  //Filter by Creator
  const handleCreator = (e) => {
    props.orderByCreator(e.target.value);
  };
	  
  	return(
  	<div className="filtros">

        <div className="filterGenres">
			  
			  <p>Filter by Genre</p>
			  <select className="selectGenres" onChange={(e) => handleFilter(e)}>
				<option default>All</option>
				{props.genres.map((G) => (
				  <option key={G.id} value={G.name}>{G.name}</option>
				))}
			  </select>
		</div>

		<div className="filterGenres">
			  
			  <p>Filter by Platform</p>
			  <select className="selectGenres" onChange={(e) => handleFilterPlatforms(e)}>
				<option default>All</option>
				{props.platforms.map((p) => (
				  <option key={p.id} value={p.name}>{p.name}</option>
				))}
			  </select>
		</div>
	      
		  <Ordinances />

	  
      <div className="filterCreator"> 
        <p>Filter by Creator</p>
        <select className="selectCreator" onChange={(e) => handleCreator(e)} >
          <option value = "allGames">All Games</option>
          <option value="Api">Api videogames</option>
          <option value="Created">User-created videogames</option>
        </select>
      </div>
      
  	</div>
  	)
}

function mapStateToProps(state){
	return {
		videogames: state.videogames,
		gameCreated: state.gameCreated,
		genres: state.genres,
		platforms: state.platforms

	}
}

function mapDispatchToProps(dispatch){
	return {
		filterGame:(a) => dispatch(filterGame(a)),
		getGame: (a) => dispatch(getGame(a)),
		getAllGames: () => dispatch(getAllGames()),
		orderByGenre:(a) => dispatch(orderByGenre(a)),
		orderByPlatform:(a) => dispatch(orderByPlatform(a)),
		orderByCreator: (a) => dispatch(orderByCreator(a)),
		getGenres:() => dispatch(getGenres()),
		getPlatforms:() => dispatch(getPlatforms())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtros)