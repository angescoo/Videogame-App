import './App.css';


import React from "react";

import Favorites from "./components/Favorites/Favorites";
import Landingpage from './components/Landingpage/Landingpage.js'
import Search from "./components/Search/Search";
import NavBar from "./components/NavBar/NavBar";
import { Route } from "react-router-dom";
import Videogame from "./components/Videogames/Videogame";
import CreateGame from "./components/CreateGame/CreateGame";
import Details from "./components/Details/Details.js";
import Filters from './components/Filters/Filters.js'


function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Landingpage} />
      <div className="NavContainer">
        <Route path="/home" component={NavBar} />
      </div>
      <Route path="/home/favs" component={Favorites} />
      <Route exact path="/home" component={Videogame} />
      <Route exact path="/home/details/:id" component={Details} />
      <Route exact path="/home/create" component={CreateGame} />

    </React.Fragment>
  );
}

export default App;
