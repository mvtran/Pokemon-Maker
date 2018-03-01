import React, { Component } from 'react';

class PokemonName extends React.Component {

  handleKeyPress(e) {
    // some browsers use e.keyCode; others use e.which
    var key = 'which' in e ? e.which : e.keyCode;
    if (key == 13) {
        document.getElementById("pokemon-name-input").blur();
    }
  }

  renderNameInputField() {
    return (
      <input
        id = "pokemon-name-input"
        onFocus = {(e) => e.target.select()}
        onBlur = {this.props.onBlur}
        onKeyPress = {(e) => this.handleKeyPress(e)}
        placeholder = {this.props.name}
        maxlength = "16"
      />
    )
  }

  render() {
    var nameDisplay = this.props.name;
    if (this.props.isEditingName)
      nameDisplay = this.renderNameInputField();

    return (
      <div className="pokemon-name-field">
        <div id="pokemon-name">
          {nameDisplay}
        </div>
        <div id="edit-name-icon">
          <label for="pokemon-name-input" title="Edit Pokemon name">
            <img src="../../assets/pencil.png"
              alt="Edit name"
              onClick={this.props.onClick}
            />
          </label>
        </div>
      </div>
    )
  }
}

export default PokemonName;
