import React from 'react';
import {Link} from 'react-router-dom';
import './games.css'
import { connect } from 'react-redux';
import { addGameFavorite } from '../../actions/index.js'

export function Game(props){
	return(
		<div className="card">
             <button alt="Add to favorite" className="favVg material-icons" onClick={() => props.addGameFavorite({title: props.name, id: props.id, img: props.img, genres: props.genres})}>star</button>
                <Link to={`/home/details/${props.id}`} className="titleLink">
            <p className="title">
                {props.name}                
            </p>  
            </Link>
           <img src={props.img} className="imgGame"></img>
           <p className="genres">{props.genres}</p>
		</div>
		)
}

// export default Game


function mapDispatchToProps(dispatch){
	return {
        addGameFavorite: game => dispatch(addGameFavorite(game)),

	}
}

export default connect(null,mapDispatchToProps)(Game)
