import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';

import Utils from '../Utils.js';
import NavBar from './HeaderComponent/NavBar.js';
import Footer from './FooterComponent/Footer.js';

import PokemonContainer from './PokemonContainer.js';

//<Route name="home" exact path="/" component={PokemonContainer} />
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <PokemonContainer />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
