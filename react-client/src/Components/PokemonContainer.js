import React, { Component } from 'react';
import Utils from '../Utils.js';

import PokemonName from './PokemonName.js';
import PokemonStats from './PokemonStats.js';
import PokemonImage from './PokemonImage.js';
import PokemonType from './PokemonType.js';
import PokemonAbility from './PokemonAbility.js';
import SearchBar from './SearchBar.js';
import ImageInsertion from './ImageInsertion.js';
import SearchPokemon from './SearchPokemon.js';


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
      type: ["Normal", "None"]
    }
    this.state = JSON.parse(JSON.stringify(this.defaultState));
    this.handleSubmitImage = this.handleSubmitImage.bind(this);
    this.handleSearchPokemon = this.handleSearchPokemon.bind(this);
  }

  changeStat(stat, value) {
    var updatedState = this.state;
    updatedState.statValues[stat] = value;
    this.setState(updatedState);
  }

  changeType(which, newType, isSingleTyped) {
    var updatedState = this.state;
    newType = newType.charAt(0).toUpperCase() + newType.substr(1);

    updatedState.type[which] = newType;
    if (isSingleTyped)
      updatedState.type[1] = "None";
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

  handleSubmitImage() {
    var updatedState = this.state;
    var image = document.getElementById("image-url").value;
    if (image == "") {
      updatedState.currentImage = "../../assets/placeholder.png";
    } else {
      updatedState.currentImage = image;
    }
    this.setState(updatedState);
  }

  handleSearchPokemon() {
    var pokemon = document.getElementById("search-pokemon").value;

    if (pokemon) {
      const Pokedex = require('pokeapi-js-wrapper');
      const P = new Pokedex.Pokedex({protocol: 'https'});

      var _this = this; // this becomes undefined if not stored here

      P.getPokemonByName(pokemon)
      .then(function(res) {

        if (res.types.length == 1) {
          _this.changeType(0, res.types[0]["type"]["name"], true);
        } else if (res.types.length == 2) {
          _this.changeType(0, res.types[1]["type"]["name"], false);
          _this.changeType(1, res.types[0]["type"]["name"], false);
        }

        var hp = res.stats[5].base_stat,
            atk = res.stats[4].base_stat,
            def = res.stats[3].base_stat,
            spa = res.stats[2].base_stat,
            spd = res.stats[1].base_stat,
            spe = res.stats[0].base_stat;

        _this.changeStat("HP", hp);
        _this.changeStat("Attack", atk);
        _this.changeStat("Defense", def);
        _this.changeStat("Special Attack", spa);
        _this.changeStat("Special Defense", spd);
        _this.changeStat("Speed", spe);
      })
      .catch(function(err) {
        console.log("FAILURE HAHAHAHAHAHA");
        console.log(err)
      });
    }
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

  resetEverything(e) {
    this.setState(JSON.parse(JSON.stringify(this.defaultState)));
    e.preventDefault();
  }

  componentDidMount() {
    // implemented in App.js
  }

  render() {

    return (
      <div className="pokemon-container">
        <form action="/save" method="POST">

          <div className="pokemon-name-container">
            <PokemonName
              name = {this.state.name}
              onClick = {() => this.handleEditName()}
              onBlur = {(e) => this.handleNameBlur(e)}
              isEditingName = {this.state.isEditingName}
             />
           </div>

          <div className="pokemon-image-container">
            <PokemonImage
              src={this.state.currentImage}/>
            <ImageInsertion
              handleSubmitImage = {() => this.handleSubmitImage()}
            />
            <button onClick={(e) => this.resetEverything(e)}>Reset Everything</button>
          </div>

          <div className = "pokemon-type-container">
            <h3>Type</h3>
            <PokemonType
              type = {this.state.type}
              onDropdownSelected = {(e, which) => this.onDropdownSelected(e, which)}
            />
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

        <SearchPokemon
          handleSearchPokemon = {() => this.handleSearchPokemon()}
        />

      </div>
    )
  }
}

export default PokemonContainer;
