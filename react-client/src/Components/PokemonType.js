import React, { Component } from 'react';
import Utils from '../Utils.js';

// TODO: replace with actual colors (color picker on in-game sprites)
const colorFor = {
  'Fire': 'orange',
  'Water': 'dodgerblue',
  'Grass': 'green',
  'Electric': 'yellow',
  'Ice': 'aqua',
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
  'Bug': 'yellowgreen',
};

function PokemonType(props) {
  return <div className="type" style={{'background-color': colorFor[props.name]}}>{props.name}</div>
}

export default PokemonType;
