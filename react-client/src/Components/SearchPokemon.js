import React, { Component } from 'react';
import SearchBar from './SearchBar.js';

class SearchPokemon extends Component {
  render() {
    return (
      <div className="search-pokemon-container">
        <SearchBar
          mons = {this.props.mons}
          searchForThis = {(who) => this.props.searchForThis(who)}
          executeSearch = {() => this.props.handleSearchPokemon()}
        />
        <button type="button"
          id="search-pokemon-button"
          onClick={() => this.props.handleSearchPokemon()}>
            Search
        </button>
      </div>
    )
  }
}

export default SearchPokemon;
