import React, { Component } from 'react';
import Utils from '../Utils.js';

import PokemonName from './PokemonName.js';
import PokemonStats from './PokemonStats.js';
import PokemonImage from './PokemonImage.js';
import PokemonType from './PokemonType.js';
import PokemonAbility from './PokemonAbility.js';
import SearchBar from './SearchBar.js';
import ImageInsertion from './ImageInsertion.js';


/* Contains all information for the custom pokemon */
class PokemonContainer extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      name: "Pokemon Name",
      isEditingName: false,
      statValues: {
        "HP": 50,
        "Attack": 50,
        "Defense": 50,
        "Special Attack": 50,
        "Special Defense": 50,
        "Speed": 50,
      },
      statBounds: [1, 255],
      currentImage: "../../assets/placeholder.png",
      type: ["Normal", "Flying"]
    }
    this.state = JSON.parse(JSON.stringify(this.defaultState));
    this.handleSubmitImage = this.handleSubmitImage.bind(this);
  }

  changeStat(stat, value) {
    var updatedState = this.state;
    updatedState.statValues[stat] = value;
    this.setState(updatedState);
  }

  handleEditName() {
    var updatedState = this.state;
    updatedState.isEditingName = true;
    this.setState(updatedState);
  }

  handleNameBlur(e) {
    var updatedState = this.state;
    if (e.target.value)
      updatedState.name = e.target.value;
    updatedState.isEditingName = false;
    this.setState(updatedState);
  }

  changeEditingStatus() {
    var updatedState = this.state;
    updatedState.isEditingStats = true;
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

  onDropdownSelected(e, which) {
    var updatedState = this.state;

    if (which == 1) {
      updatedState.type[0] = e.target.value;
    } else if (which == 2) {
      updatedState.type[1] = e.target.value;
    }

    this.setState(updatedState);
  }

  statReset() {
    var updatedState = this.state;
    updatedState.statValues = JSON.parse(JSON.stringify(this.defaultState.statValues));
    this.setState(updatedState);
  }

  componentDidMount() {
    // implemented in App.js
  }

  render() {
    // <ImageInsertion
    //   handleSubmitImage = {() => this.handleSubmitImage()}
    // />

    return (
      <div className="pokemon-container">
        <form action="/save" method="POST">

          <PokemonName
            name = {this.state.name}
            onClick = {() => this.handleEditName()}
            onBlur = {(e) => this.handleNameBlur(e)}
            isEditingName = {this.state.isEditingName}
           />

          <div className="pokemon-image-container">
            <PokemonImage
              src={this.state.currentImage}/>
          </div>

          <div className = "vertical">
            <div className = "pokemon-type-container">
              <h3>Type</h3>
              <PokemonType
                type = {this.state.type}
                onDropdownSelected = {(e, which) => this.onDropdownSelected(e, which)}
                />
            </div>

            <div className = "pokemon-ability-container">

            </div>
          </div>

          <div className="pokemon-stats-container">
            <PokemonStats
              state = {this.state}
              onStatClick = {() => this.changeEditingStatus()}
              onStatChange = {(statName, e) => this.handleStatChange(statName, e)}
              onBlur = {() => this.handleStatBlur()}
              onReset = {() => this.statReset()}
            />
          </div>

        </form>
      </div>
    )
  }
}

export default PokemonContainer;
