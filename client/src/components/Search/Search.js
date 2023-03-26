import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { addGameFavorite, searchGame, resetSearch } from "../../actions/index.js"
import './Search.css';



export function Search(props) {

  var [title, setTitle] = useState("")


  function handleChange(event) {
    setTitle(event.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault();

    if (title.length === 0) {
      alert("Insert a valid game name")
    } else {
      props.searchGame(title)
      setTitle("")
    }



  }
  function handleClick(event) {
    props.resetSearch()
  }


  return (
    <div className="searchContainer">
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <div>

          <input
            className="inputSearch"
            placeholder="Search game"
            type="text"
            id="title"
            autoComplete="off"
            value={title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="btnSearch material-icons" type="submit">search</button>
        <input className="reset material-icons" value="restore" type="reset" onClick={(e) => handleClick(e)}></input>

      </form>

      <ul className="resultSearch">


        {/* Aqui tienes que escribir tu codigo para mostrar la lista de peliculas */}
        {

          props.videogames && props.videogames.map((el, i) => (
            <div key={i} className="resultIndividual">

              <NavLink className="linkResult" to={`/home/details/${el.id}`}> {el.name} </NavLink>

              <button onClick={() => props.addGameFavorite({ title: el.name, id: el.id, img: el.background_image })}>Add to fav</button>
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
    videogames: state.gameName
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addGameFavorite: game => dispatch(addGameFavorite(game)),
    searchGame: title => dispatch(searchGame(title)),
    resetSearch: () => dispatch(resetSearch())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);