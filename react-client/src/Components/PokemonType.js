import React, { Component } from 'react';
import Utils from '../Utils.js';

const typeList = {
  'None': 'white',
  'Normal': '#A8A878',
  'Fire': '#F08030',
  'Water': '#6890F0',
  'Grass': '#78C850',
  'Electric': '#F8D030',
  'Ice': '#98D8D8',
  'Psychic': '#F85888',
  'Dark': '#705848',
  'Fairy': '#EE99AC',
  'Dragon': '#7038F8',
  'Rock': '#B8A038',
  'Ground': '#E0C068',
  'Steel': '#B8B8D0',
  'Fighting': '#C03028',
  'Flying': '#A890F0',
  'Ghost': '#705898',
  'Poison': '#A040A0',
  'Bug': '#A8B820'
};


class PokemonType extends React.Component {
  renderType(which) {
    var type = this.props.type[which-1];

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

          // have current type selected
          if (list[i] == this.props.type[0] || list[i] == this.props.type[1]) {
            types.push(<option
              key={i + " " + whichType} id={list[i] + whichType} value={list[i]} selected>
                {list[i]}
              </option>);
          } else {
            types.push(<option
              key={i + " " + whichType} id={list[i] + whichType} value={list[i]}>
                {list[i]}
              </option>);
          }
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
        <input type="hidden" name="type-1" value={this.props.type[0]}/>
        <input type="hidden" name="type-2" value={this.props.type[1]}/>
      </div>
    )
  }
}

export default PokemonType;
