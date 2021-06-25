import React, {useEffect, useState}  from 'react'
import { connect } from 'react-redux';
import './filter.css'

import { filterGame, getGame, getAllGames, orderByGenre, orderByCreator, getGenres} from '../../actions/index.js'
import Ordinances from '../Ordinances/ordinances.js'

export function Filtros(props){

	const [input, setInput] = useState("")

	useEffect(()=> {
     props.getGenres()	
	},[])

	  function handleChange(e) {

		setInput(e.target.value)
		  }


      //Filter by Genre
  const handleFilter = (e) => {
    props.orderByGenre(e.target.value);
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
		genres: state.genres

	}
}

function mapDispatchToProps(dispatch){
	return {
		filterGame:(a) => dispatch(filterGame(a)),
		getGame: (a) => dispatch(getGame(a)),
		getAllGames: () => dispatch(getAllGames()),
		orderByGenre:(a) => dispatch(orderByGenre(a)),
		orderByCreator: (a) => dispatch(orderByCreator(a)),
		getGenres:() => dispatch(getGenres())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtros)