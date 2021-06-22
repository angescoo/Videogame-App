import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAllGames, getGameDetail, getGenres } from '../../actions/index.js';

import './creategame.css';


export function CreateGame(props){

	const [input, setInput] = useState({
	    name: "",
	    rating: "",
	    description: "",
	    released: "",
      platforms: [],
      genres: []

 	})


 	function handleChange(e) {

    setInput({
	      ...input,
	      [e.target.name]: e.target.value
    	})
  	}

  function handlePais (e) {
    
    props.getGameDetail(e.target.value)

    
    setInput({
      ...input,
      [e.target.name]:[...input.id, e.target.value]

    })




  }



  	useEffect(() => {
    props.getAllGames()
    props.getGenres()
    
  	}, [])
    console.log(props.genres)


     function handleSubmit(e) {
  		e.preventDefault()
  		window.location.href = "http://localhost:3000/home"
     axios.post('http://localhost:3001/videogame',{
      name: input.name, 
      description: input.description,
      genres: ['blablablabla'],
      platforms: input.platforms,
      background_image: URL('')
    })

      

  	}

    


	 return(
    <div className="contForm">

      <div className="creat">
        <div className="asdd">
         
          <h1>Create Videogame</h1>
        </div>
        <div className="desc">
          <p className="textCreate"> <strong>Welcome to the videogame creation page!</strong> <br/><br/>
          If you are interested in creating your own game THIS is your time to show what you are made of</p>
        </div>
      </div>



	 	<form className="form" onSubmit={handleSubmit}>

	 	<div>
        <p className="texto">Videogame Name</p>
          <input
            placeholder="Name"
            type="text"
            name="name"
            required="required"
            value={input.name}
            onChange={handleChange}
            className="inpputs"
          />
        </div>

        <div>
        <p className="texto">Videogame Rating (1-5)</p>
          <select className="selects" name="rating" value={input.rating} onChange={handleChange} required>
            <option value="">Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div>
        <p className="texto">Description</p>
          <input
            placeholder="Description"
            type="text"
            name="description"
            // required="required"
            value={input.description}
            onChange={handleChange}
            style={{marginTop: "10px"}, {marginBottom: "5px"}}
            className="inpputs"
          />
        </div>

        <div>
        <p className="texto">Released</p>
          <input type="date" className="selects" name="released" value={input.released} onChange={handleChange} required>
           
          </input>
        </div>
        <div className="ALL">
        <div>
          <p className="texto">Genres</p>
          <div>
          { props.genres && props.genres.map(g => {
           return (
            <div>
              <input type="checkbox" name={g.name} value={g.name}></input>
            <label for={g.name} className="texto"> {g.name}</label>
            </div> 
            
           )
         })}
         </div>
        </div>
        <div>
          <p className="texto">Platforms</p>
          <select className="selects" name="platforms" /*value={input.platforms}*/ onChange={handleChange} required multiple>
            <option value="">Platforms</option>
            <option value="1">Xbox One</option>
            <option value="2">Xbox 360</option>
            <option value="3">Xbox X/S</option>
            <option value="4">PS3</option>
            <option value="5">PS4</option>
          </select>
          
          
        </div>
        </div>
        <input className="cract" type="submit" value="Create Videogame" />
	 	</form>
    </div>
	 	)
}

function mapStateToProps(state) {
  return {
    videogames: state.videogames,
    gameName: state.gameName,
    genres: state.genres
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllGames:() => dispatch(getAllGames()),
    getGameDetail: (id) => dispatch(getGameDetail(id)),
    getGenres: () => dispatch(getGenres())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)