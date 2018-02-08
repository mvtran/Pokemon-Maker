import React, { Component } from 'react';
import Utils from '../Utils.js';
import Autosuggest from 'react-autosuggest';

const mons = [
  {
    name: "pikachu",
    type: "electric"
  },
  {
    name: "psyduck",
    type: "water"
  },
  {
    name: "abomasnow",
    type: "grass/ice"
  },
  {
    name: "arbok",
    type: "poison"
  },
  {
    name: "porygon2",
    type: "normal"
  },
  {
    name: "ho-oh",
    type: "fire/flying"
  }
];


class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: []
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  getSuggestions(input) {
    var cleanInput = input.trim().toLowerCase();
    var len = cleanInput.length;

    return len === 0 ? [] : mons.filter(mon =>
      mon.name.toLowerCase().slice(0, len) === cleanInput
    );
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    return (
      <div>
        {suggestion.name}
      </div>
    )
  }

  onChange(e, {newValue}) {
    console.log("onchange");
    this.setState({
      value: newValue
    });
  }

  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested({value}) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
    console.log(this.state);
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
      placeholder: "Search for Pokemon",
      value,
      onChange: this.onChange
    };

    return (
      <div className="search-container">
        <Autosuggest
          suggestions={suggestions}
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
