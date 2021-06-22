import React, { Component } from "react";
import { connect } from "react-redux";
import { removeGameFavorite } from "../../actions/index";
import { Link } from 'react-router-dom';
import './Favorites.css';

export class ConnectedList extends Component {

  render() {
    return (
      <div className="pruebita">
        <h2>Favorites Videogames</h2>
     
        <ul>
          {/* Aqui deberias poner tu lista de peliculas! */}
          {
          Array.isArray(this.props.videogames) && this.props.videogames.map((el, i) => (
            <div key={i} className="favContainer">
             <img src={el.img} className="imgFav"/>
             <Link to={`/home/details/${el.id}`}><p className="favTitle">{el.title}</p>  </Link>
             <button className="favBtn" onClick={() => this.props.removeGameFavorite({title: el.Title, id: el.id, img: el.background_img})}>X</button>
            </div>
          )
          )  
        }
        </ul>

        
      </div>
    );
  }
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