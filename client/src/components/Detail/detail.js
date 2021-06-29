import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getGameDetail } from '../../actions/index';

import './detail.css'

 function Detalles(props){

	 useEffect(() => {
    const id = props.match.params.id;
     props.getGameDetail(id)
  }, [])



 if(props.gameDetail.description){
     props.gameDetail.description = (props.gameDetail.description).replace(/(<([^>]+)>)/ig, '')
 }

 var genres = ['', '']

if(props.gameDetail.genres){

 var genres = [];

 for(let i = 0; i < props.gameDetail.genres.length; i++) {
    genres.push(props.gameDetail.genres[i].name)
   } 


 } 
     
     var platforms = []

	 if(props.gameDetail.consoles){
	   
		for(let i = 0; i < props.gameDetail.consoles.length; i++) {
		   platforms.push(props.gameDetail.consoles[i].name)
		  } 
	   
	   
		} 
 
 if(props.gameDetail.platforms){

	if(Array.isArray(props.gameDetail.platforms)){
    for(let i = 0; i < props.gameDetail.platforms.length; i++) {
       platforms.push(props.gameDetail.platforms[i].platform.name)
      } } else {
		platforms.push(props.gameDetail.platforms)
	  }
   
    }


	return(

		<div className="contdetail">
		<div className="cardetail">
		<div className="arriba">
			<img src={props.gameDetail.background_image} alt={props.gameDetail.name} className="imgDetail"/>
			<div className="detail">
			<h2 className="titleGame">{props.gameDetail.name}</h2>
			<h3 className="descriptionGame">{props.gameDetail.description}</h3>
			<div className="pContainer">
				<p>Rating: {props.gameDetail.rating || 'sin rating'}</p>
				<p>Released: {props.gameDetail.released || 'sin fecha'}</p>
				<p>Genres: {genres.join(", ") || 'sin genres'}  </p>
				<p>Platforms: {platforms.join(", ")} </p>
			</div>
			
            
			</div>
		</div>


		</div>
		</div>
		)

}

function mapStateToProps(state){
	return {
		gameDetail: state.gameDetail
	}
}

function mapDispatchToProps(dispatch){
	return{
		getGameDetail:(id) => dispatch(getGameDetail(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Detalles)
