import React, { Component } from 'react';
import Utils from '../Utils.js';

import StatBar from './StatBar.js';

class PokemonStats extends Component {
  renderStatBar(statName, statValue) {
    return (
      <StatBar
        stats = {this.props.stats}
        statName = {statName}
        statValue = {statValue}
        color = {"#" + Utils.getHexColor(statValue)}
        onChange = {(statName, e) => this.props.onSlideChange(statName, e)}
      />
    );
  }

  renderInputField(statName, statValue) {
    return (
      <input
        value={statValue}
        size="3"
        onChange = {(e) => this.props.onStatChange(statName,e)}
        onClick = {(e) => e.target.select()}
        onBlur = {(e) => this.props.onBlur()}
      />
    );
  }

  renderStats(statValues) {
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
            {this.renderStatBar(stat, statValues[stat])}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="stats-table">
        <tbody>
          {this.renderStats(this.props.stats.statValues)}
          <tr>
            <td><button onClick={() => this.props.onReset()}>Reset</button></td>
            <td>BST: </td>
            <td className="stat-number">{Utils.getBST(this.props.stats.statValues)}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default PokemonStats;
