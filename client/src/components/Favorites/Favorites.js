import React from "react";
import { connect } from "react-redux";
import { removeGameFavorite } from "../../actions/index";
import { Link } from 'react-router-dom';
import './Favorites.css';

export function ConnectedList(props){

    return (
      <div className="divFavorite">   
        <ul>
          {
            props.videogames.length === 0? <div className="noFavoriteContainer"><p className="noFavorites">No favorites yet</p></div> :
          Array.isArray(props.videogames) && props.videogames.map((el, i) => (
            <div key={i} className="favContainer">
              <Link to={`/home/details/${el.id}`} className="favTitle"><h4 className="favTitle">{el.title}</h4></Link>
             <img src={el.img} className="imgFav"/>
             <p className="genFav">{el.genres}</p>
             <button className="favBtn material-icons" onClick={() => props.removeGameFavorite({title: el.Title, id: el.id, img: el.background_img})}>delete</button>
            </div>
          )
          )  
        }
        </ul>

        
      </div>
    );
  
}



function mapStateToProps(state) {
  return {
    videogames: state.gameFavs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeGameFavorite: game => dispatch(removeGameFavorite(game))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedList);