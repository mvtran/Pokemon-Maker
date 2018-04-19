import React, { Component } from 'react';

class SearchPokemon extends Component {
  render() {
    return (
      <div className="search-pokemon-container">
        <input type="text" id="search-pokemon" placeholder="Enter Pokemon to search"/>
        <button type="button"
          id="search-pokemon-button"
          onClick={this.props.handleSearchPokemon}>
            Submit
        </button>
      </div>
    )
  }
}

export default SearchPokemon;
