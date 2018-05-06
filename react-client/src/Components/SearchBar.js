import React, { Component } from 'react';
import * as U from '../Utils.js';
import Autosuggest from 'react-autosuggest';


class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  getSuggestions(input) {
    var cleanInput = input.trim().toLowerCase();
    var len = cleanInput.length;

    return len === 0 ? [] : this.props.mons.filter(mon =>
      mon.name.toLowerCase().slice(0, len) === cleanInput
    );
  }

  getSuggestionValue(suggestion) {
    return U.capitalize(suggestion.name);
  }

  renderSuggestion(suggestion) {
    return (
      <div>
        {U.capitalize(suggestion.name)}
      </div>
    )
  }

  onChange(e, {newValue}) {
    this.setState({
      value: newValue
    });
    this.props.searchForThis(newValue);
  }

  onSuggestionSelected(e, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    e.preventDefault(); // otherwise, pressing enter resets everything
    this.props.searchForThis(suggestionValue);
  }

  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested({value}) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for a pokemon",
      value,
      onChange: this.onChange
    };

    return (
      <div className="search-container">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}

export default SearchBar;
