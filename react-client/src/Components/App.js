import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';

import * as C from '../Constants.js';
import NavBar from './HeaderComponent/NavBar.js';
import Footer from './FooterComponent/Footer.js';

import PokemonContainer from './PokemonContainer.js';

//<Route name="home" exact path="/" component={PokemonContainer} />
class App extends Component {

  constructor(props) {
    super(props);
    const pokeapi = require('../../../node_modules/pokeapi-js-wrapper');
    const options = {
      protocol: 'https',
      versionPath: '/api/v2/',
      cache: true,
      timeout: 60 * 1000 // 60 seconds
    }
    const dex = new pokeapi.Pokedex(options);
    this.state = {
      P: dex,
      cache: []
    }
  }

  componentDidMount() {
    // load data and stuff here
    var interval = {
      limit: 802, // how many pokemon
      offset: 0
    }
    var _this = this;

    //TODO: just populate list of names like this so autosuggest menu works
    this.state.P.getPokemonsList(interval)
      .then(function(res) {
        var updatedState = _this.state;
        updatedState.cache = res["results"];
        _this.setState(updatedState);
      })
      .catch(function(err) {
        console.log("FAILURE AT THE START WAHAHAHA");
        console.log(err)
      });
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <PokemonContainer
            P = {this.state.P}
            cache = {this.state.cache}
          />

        </div>
      </Router>
    )
  }
}

export default App;
