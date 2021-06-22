import './App.css';


import React from "react";

import Favorites from "./components/Favorites/Favorites";
import landingpage from './components/Landingpage/landingpage.js'
import buscador from "./components/Buscador/buscador";
import NavBar from "./components/NavBar/NavBar";
import { Route } from "react-router-dom";
import Videogame from "./components/Videogames/Videogame";
import creategame from "./components/CreateGame/creategame";
import detail from "./components/Detail/detail";
import filters from './components/Filters/filters.js'


function App() {
  return (
      <React.Fragment>
        <Route exact path="/" component={landingpage}/>
        <div className="NavContainer">
        <Route  path="/home" component={NavBar} />
          {/* <NavBar /> */}
          </div>
          <Route exact path="/home" component={buscador} />
          

          <Route path="/home/favs" component={Favorites} />
         <div className="ordContainer"> 
         <Route exact path="/home" component={filters} />
         </div>
          <Route exact path="/home" component={Videogame} />
          <Route exact path="/home/details/:id" component={detail}/>
          <Route exact path="/home/create" component={creategame}/>

      </React.Fragment>
  );
}

export default App;
