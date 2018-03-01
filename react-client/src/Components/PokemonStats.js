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
        onChange = {(statName, e) => this.props.onStatChange(statName, e)}
      />
    );
  }

  renderInputField(statName, statValue) {
    return (
      <input
        value={statValue}
        size="3"
        name={statName}
        onChange = {(e) => this.props.onStatChange(statName,e)}
        onClick = {(e) => e.target.select()}
        onBlur = {(e) => this.props.onBlur()}
      />
    );
  }

  renderStatNumber(stat) {
    return (
      <span onClick = {() => this.props.onStatClick()}>
        <label for={stat}>
          {stat}
        </label>
      </span>
    )
  }

  renderStats(statValues, isEditingStats) {
    return Object.keys(statValues).map((stat, idx) => {

      var statNumber = this.renderInputField(stat, statValues[stat]);
      if (isEditingStats)
        statNumber = this.renderStatNumber(statValues[stat]);

      return (
        <tr key={idx}>
          <td className="stat-name">
            {stat}:
          </td>
          <td className="stat-number">
            {statNumber}
          </td>
          <td className="stat-bar">
              {this.renderStatBar(stat, statValues[stat])}
          </td>
        </tr>
      );
    });
  }

  render() {
    var statValues = this.props.stats.statValues;
    var isEditingStats = this.props.stats.isEditingStats;

    return (
      <table className="stats-table">
        <tbody>
          <tr>
            <td></td>
          </tr>
          {this.renderStats(statValues, isEditingStats)}
          <tr>
            <td>BST: </td>
            <td className="stat-number">{Utils.getBST(statValues)}</td>
            <td className="justify-left"><button type="button" onClick={() => this.props.onReset()}>Reset</button></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default PokemonStats;
