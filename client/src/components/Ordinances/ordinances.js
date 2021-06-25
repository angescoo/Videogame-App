import React from 'react'
import { connect } from 'react-redux';

import {sort, sortRating, ASD, DES, HASD, HDES} from '../../actions/index.js';

import './ordinances.css'

export function Ordenamientos(props){

	

	function handleDispatchOrder(event) {
    if (event.target.value === ASD || event.target.value === DES) {
			if(props.filteredVideogames && props.filteredVideogames.length > 0){
				props.sort(event.target.value, props.filteredVideogames)
			} else {
				props.sort(event.target.value, props.videogames)
			}
		    
    	}
  	}
  	function handleDispatchRating(event) {
    if (event.target.value === HASD || event.target.value === HDES) {
		if(props.filteredVideogames && props.filteredVideogames.length > 0){
			props.sortRating(event.target.value, props.filteredVideogames)
		} else {
			props.sortRating(event.target.value, props.videogames)
		}
         
      		
			  
    	}
  	}


  	return(
  		<div className="orderContainer">

              <div className="orderAlpha">
                <p>Order by Alphabetically</p>
		  		<select className="selectAlpha" onChange={handleDispatchOrder}>
				    <option>Order Alphabetically</option>
				    <option value={ASD}>Ascendant (A - Z)</option>
				    <option value={DES}>descendant (Z - A)</option>
				 </select>
				 </div>
                <div className="orderRating">
					<p>Order by Rating</p>
				<select className="selectRating" onChange={handleDispatchRating}>
				    <option>Order by Rating</option>
				    <option value={HASD}>Ascendant</option>
				    <option value={HDES}>descendant</option>
				 </select>
				 </div>
			

  		</div>
  	)
}

function mapStateToProps(state){
	return {
		videogames: state.videogames,
		filteredVideogames: state.filteredVideogames,
		filterBy: state.filterBy

	}
}

function mapDispatchToProps(dispatch){
	return {
		sort: (a, b) => dispatch(sort(a, b)),
		sortRating: (a, b) => dispatch(sortRating(a, b))
	}}

export default connect(mapStateToProps,mapDispatchToProps)(Ordenamientos)