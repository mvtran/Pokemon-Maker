import React, { Component } from 'react';
import Utils from '../Utils.js';

import StatBar from './StatBar.js';

class PokemonStats extends Component {
  renderSingleBar(value) {
    return (
      <StatBar
        width= {(value/10) + "vw"}
        color= {"#" + Utils.getHexColor(value)}
      />
    );
  }

  renderInputField(statName, statValue) {
    return (
      <input
        type="number"
        value={statValue}
        min="1" max={this.props.stats.statMax}
        onChange = {(e) => this.props.onChange(statName,e)}
        onClick = {(e) => e.target.select()}
      />
    );
  }

  renderStatBars(statValues) {
    return Object.keys(statValues).map((stat, idx) => {
      return (
        <tr key={idx}>
          <td className="stat-input">
            {this.renderInputField(stat, statValues[stat])}
          </td>
          <td className="stat-name">
            {stat}:
          </td>
          <td className="stat-number">
            {statValues[stat]}
          </td>
          <td className="stat-bar">
            {this.renderSingleBar(statValues[stat])}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="stats-table">
        <tbody>
          {this.renderStatBars(this.props.stats.statValues)}
          <tr>
            <td><button onClick={() => this.props.onReset()}>Reset</button></td>
            <td>BST: </td>
            <td>{Utils.getBST(this.props.stats.statValues)}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default PokemonStats;
