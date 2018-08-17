import React, { Component } from 'react';
import * as U from '../Utils.js';

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
      type: ["Normal", "None"],
      pokemonToSearch: ""
    }
    this.state = JSON.parse(JSON.stringify(this.defaultState));
    this.handleSubmitImage = this.handleSubmitImage.bind(this);
    this.handleSearchPokemon = this.handleSearchPokemon.bind(this);

    // localStorage.setItem("apple", "pie");
    // const cache = localStorage.getItem("apple");
    // if (cache) {
    //   console.log("Success! Value is " + cache);
    // } else {
    //   console.log("fuck you");
    //}
  }

  changeName(newName) {
    var updatedState = this.state;
    updatedState["name"] = newName;
    this.setState(updatedState);
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

  changeEditingStatus() {
    var updatedState = this.state;
    updatedState.isEditingStats = true;
    this.setState(updatedState);
  }

  // "res" = pokemon in json returned by pokeapi
  insertPokemon(res) {
    this.changeName(U.capitalize(res["name"]));

    if (res.types.length == 1) {
      this.changeType(0, res.types[0]["type"]["name"], true);
    } else if (res.types.length == 2) {
      this.changeType(0, res.types[1]["type"]["name"], false);
      this.changeType(1, res.types[0]["type"]["name"], false);
    }

    this.changeStat("HP", res.stats[5].base_stat);
    this.changeStat("Attack", res.stats[4].base_stat);
    this.changeStat("Defense", res.stats[3].base_stat);
    this.changeStat("Special Attack", res.stats[2].base_stat);
    this.changeStat("Special Defense", res.stats[1].base_stat);
    this.changeStat("Speed", res.stats[0].base_stat);
  }

  searchForThis(who) {
    var updatedState = this.state;
    updatedState.pokemonToSearch = who;
    this.setState(updatedState);
  }

  handleNameClick() {
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

  handleStatChange(statName, e) {
    var newValue = U.validateNumber(e.target.value, this.state.statBounds);
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

  // searches the pokemon currently in the state and puts it in
  handleSearchPokemon() {
    if (this.state.pokemonToSearch) {
      const pokemon = this.state.pokemonToSearch.toLowerCase();

      var _this = this; // "this" becomes undefined if not stored here

      this.props.P.getPokemonByName(pokemon)
      .then(function(res) {
        _this.insertPokemon(res);
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

  renderNameContainer() {
    return (
      <div className="pokemon-name-container">
        <PokemonName
          name = {this.state.name}
          onClick = {() => this.handleNameClick()}
          onBlur = {(e) => this.handleNameBlur(e)}
          isEditingName = {this.state.isEditingName}
         />
       </div>
    )
  }

  renderImageContainer() {
    return (
      <div className="pokemon-image-container">
        <PokemonImage
          src={this.state.currentImage}/>
        <ImageInsertion
          handleSubmitImage = {() => this.handleSubmitImage()}
        />
        <button onClick={(e) => this.resetEverything(e)}>Reset Everything</button>
      </div>
    )
  }

  renderTypeContainer() {
    return (
      <div className = "pokemon-type-container">
        <h3>Type</h3>
        <PokemonType
          type = {this.state.type}
          onDropdownSelected = {(e, which) => this.onDropdownSelected(e, which)}
        />
      </div>
    )
  }

  renderAbilityContainer() {
    return (
      <div className = "pokemon-ability-container">
        <h3>Ability</h3>
      </div>
    )
  }

  // TODO: render type and ability in table
  renderGeneralInfo() {
    return (
      <table>
        <tbody>

          <tr>
            <td>Type</td><td></td>
          </tr>

        </tbody>
      </table>
    )
  }

  renderStatsContainer() {
    return (
      <div className="pokemon-stats-container">
        <PokemonStats
          state = {this.state}
          onStatClick = {() => this.changeEditingStatus()}
          onStatChange = {(statName, e) => this.handleStatChange(statName, e)}
          onBlur = {() => this.handleStatBlur()}
          onReset = {() => this.statReset()}
        />
      </div>
    )
  }

  renderSearchContainer() {
    return (
      <SearchPokemon
        mons = {this.props.cache}
        searchForThis = {(who) => this.searchForThis(who)}
        handleSearchPokemon = {() => this.handleSearchPokemon()}
      />
    )
  }

  render() {

    // add this to form below. when clicked, you can view the pokemon
    // sent in the command line window running server-dev
    //<button type="submit">Save</button>

    return (
      <div className="pokemon-container">
        <form action="/save" method="POST">

          {this.renderNameContainer()}
          {this.renderSearchContainer()}
          {this.renderImageContainer()}
          {this.renderTypeContainer()}
          {this.renderStatsContainer()}

        </form>
      </div>
    )
  }
}

export default PokemonContainer;
