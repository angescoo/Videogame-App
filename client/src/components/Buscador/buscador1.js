import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import {addMovieFavorite, getMovies, resetSearch} from "../../actions/index.js"
import './buscador.css';



export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  handleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.props.getMovies(this.state.title)
    this.state.title = ''

  }
 handleClick(event){
    this.props.resetSearch()
  }

  render() {
    const { title } = this.state;
    
    return (
      <div className="searchContainer">
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div>

            <input
            className="inputSearch"
            placeholder="Search game"
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button className="btnSearch" type="submit">Search</button>
        <input className="reset" value="Reset" type="reset" onClick={(e)=> this.handleClick(e)}></input>

        </form>
        
        <ul className="resultSearch">
      
          
         {/* Aqui tienes que escribir tu codigo para mostrar la lista de peliculas */}
        { 
        
          this.props.videogames && this.props.videogames.map((el, i) => (
            <div key={i} className="resultIndividual">
              
             <NavLink className="linkResult" to={`/home/details/${el.id}`}> {el.name} </NavLink>

             <button onClick={() => this.props.addMovieFavorite({title: el.name, id: el.id, img: el.background_image})}>Add to fav</button>
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
    videogames: state.gameName
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: movie => dispatch(addMovieFavorite(movie)),
    getMovies: title => dispatch(getMovies(title)),
    resetSearch: () => dispatch(resetSearch())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buscador);