import React, { Component } from 'react';

import PokemonStats from './PokemonStats.js';

/* Contains all information for the custom pokemon */
class PokemonContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        "HP": 50,
        "Attack": 50,
        "Defense": 50,
        "Special Attack": 50,
        "Special Defense": 50,
        "Speed": 50,
      },
      statMax: 255,
    };
  }

  handleStatChange(statName, e) {
    var newValue = e.target.value;
    if (newValue < 1) {
      newValue = 1;
    } else if (newValue > this.state.statMax) {
      newValue = this.state.statMax;
    }

    var updatedValues = {...this.state.values};
    updatedValues[statName] = parseInt(newValue, 10);
    this.setState({...this.state, values: updatedValues});
  }

  reset() {
    this.setState({...this.state,
      values: {
        "HP": 50,
        "Attack": 50,
        "Defense": 50,
        "Special Attack": 50,
        "Special Defense": 50,
        "Speed": 50,
      },
    });
  }

  render() {
    return (
      // other stuff like name, picture, moves, etc.
      <PokemonStats
        stats = {this.state}
        onChange = {(statName, e) => this.handleStatChange(statName, e)}
        onReset = {() => this.reset()}
      />
    )
  }
}

export default PokemonContainer;
