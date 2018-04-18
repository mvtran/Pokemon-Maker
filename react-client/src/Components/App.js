import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';

import Utils from '../Utils.js';
import NavBar from './HeaderComponent/NavBar.js';
import Footer from './FooterComponent/Footer.js';

import PokemonContainer from './PokemonContainer.js';

//<Route name="home" exact path="/" component={PokemonContainer} />
class App extends Component {

  componentDidMount() {
    const Pokedex = require('pokeapi-js-wrapper');
    const P = new Pokedex.Pokedex({protocol: 'https'});

    P.getPokemonByName('volcarona') // with Promise
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err)
    });
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <PokemonContainer />

        </div>
      </Router>
    )
  }
}

export default App;
