import React, { Component } from 'react';
import Utils from '../Utils.js';

// TODO: replace with actual colors (color picker on in-game sprites)
const typeList = {
  'None': 'white',
  'Fire': 'orange',
  'Water': 'dodgerblue',
  'Grass': 'limegreen',
  'Electric': 'gold',
  'Ice': 'paleturquoise',
  'Psychic': 'deeppink',
  'Dark': 'black',
  'Fairy': 'pink',
  'Dragon': 'blue',
  'Rock': 'chocolate',
  'Ground': 'goldenrod',
  'Steel': 'silver',
  'Fighting': 'red',
  'Flying': 'deepskyblue',
  'Ghost': 'darkviolet',
  'Normal': 'burlywood',
  'Poison': 'purple',
  'Bug': 'yellowgreen'
};


class PokemonType extends React.Component {
  renderType(which) {
    if (which == 1) {
      var type = this.props.type[0];
    } else {
      var type = this.props.type[1];
    }

    if (type == null) {
      type = "Normal";
    } else if (type == "None") {
      return <div className="type" style={{'visibility': 'hidden'}}></div>
    }

    return <div className="type" style={{'background-color': typeList[type]}}>{type}</div>
  }

  renderOptions(whichType) {
    let types = [];
    var first = this.props.type[0], second = this.props.type[1];
    var list = Object.keys(typeList);
    for (let i = 0; i < list.length; i++) {

        // exclude type if primary/secondary type is already it
        if (
            whichType == 1 && list[i] != "None" &&
            whichType == 1 && list[i] != second ||
            whichType == 2 && list[i] != first
          ){

          types.push(<option key={i} id={list[i] + whichType} value={list[i]}>{list[i]}</option>);
        }
    }
    return types;
  }

  renderTypePicker(whichType) {
    return (
      <select
        className = "type-dropdown"
        onChange={(e, which) => this.props.onDropdownSelected(e, whichType)}>
          <option value="" disabled selected>Select type</option>
          {this.renderOptions(whichType)}
      </select>
    )
  }

  render() {
    return (
      <div>
        <div id="type-1">
          {this.renderType(1)}
          {this.renderTypePicker(1)}
        </div>
        <div id="type-2">
          {this.renderType(2)}
          {this.renderTypePicker(2)}
        </div>
      </div>
    )
  }
}

export default PokemonType;
