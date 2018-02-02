import React, { Component } from 'react';
import Utils from '../Utils.js';

import PokemonStats from './PokemonStats.js';
import PokemonImage from './PokemonImage.js';
import PokemonAbility from './PokemonAbility.js';

/* Contains all information for the custom pokemon */
class PokemonContainer extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      statValues: {
        "HP": 50,
        "Attack": 50,
        "Defense": 50,
        "Special Attack": 50,
        "Special Defense": 50,
        "Speed": 50,
      },
      statBounds: [1, 255],
      currentImage: "../../assets/placeholder.png"
    }
    this.state = JSON.parse(JSON.stringify(this.defaultState));
    this.handleSubmitImage = this.handleSubmitImage.bind(this);
  }

  changeStat(stat, value) {
    var updatedState = this.state;
    updatedState.statValues[stat] = value;
    this.setState(updatedState);
  }

  handleStatChange(statName, e) {
    var newValue = Utils.validateNumber(e.target.value, this.state.statBounds);
    this.changeStat(statName, newValue);
  }

  // 0 is allowed only temporarily if user wants to clear input
  handleStatBlur() {
    for (var stat in this.state.statValues)
      if (this.state.statValues[stat] == 0)
        this.changeStat(stat, 1);
  }

  handleSubmitImage(e) {
    var updatedState = this.state;
    updatedState.currentImage = document.getElementById("image-url").value;
    this.setState(updatedState);
    e.preventDefault();
  }

  reset() {
    this.setState(JSON.parse(JSON.stringify(this.defaultState)));
  }

  render() {
    return (
      <div className="pokemon-container">
        <form action="/save" method="POST">

          <div className="image-input">
            <form onSubmit={this.handleSubmitImage}>
              <label>
                Image URL:<br/>
                <input type="text" value={this.state.value} id="image-url"
                  onClick = {(e) => e.target.select()} />
              </label>
              <input type="submit" value="Submit" id="image-submit-button" />
            </form>
          </div>
          <div className="pokemon-image-box">
            <PokemonImage
              src={this.state.currentImage}/>
          </div>
          <div className="pokemon-stats">
            <PokemonStats
              stats = {this.state}
              onStatChange = {(statName, e) => this.handleStatChange(statName, e)}
              onBlur = {() => this.handleStatBlur()}
              onReset = {() => this.reset()}
            />
          </div>
          <br/>
          <button type="submit">Submit Stats</button>
          <br/>
          <a href="/test">Test Page</a>
        </form>
      </div>
    )
  }
}

export default PokemonContainer;
