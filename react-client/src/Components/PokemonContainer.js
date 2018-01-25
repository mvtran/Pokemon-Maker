import React, { Component } from 'react';
import Utils from '../Utils.js';

import PokemonStats from './PokemonStats.js';
import PokemonImage from './PokemonImage.js';

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

    }
    this.state = JSON.parse(JSON.stringify(this.defaultState));
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

  handleSlideChange(statName, e) {
    var newValue = Utils.validateNumber(e.target.value, this.state.statBounds);
    this.changeStat(statName, newValue);
  }

  reset() {
    this.setState(JSON.parse(JSON.stringify(this.defaultState)));
  }

  render() {
    return (
      <div className="pokemon-container">
        <PokemonStats
          stats = {this.state}
          onStatChange = {(statName, e) => this.handleStatChange(statName, e)}
          onSlideChange = {(statName, e) => this.handleSlideChange(statName, e)}
          onBlur = {() => this.handleStatBlur()}
          onReset = {() => this.reset()}
        />
      </div>
    )
  }
}

export default PokemonContainer;
