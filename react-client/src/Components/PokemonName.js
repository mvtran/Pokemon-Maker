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
        placeholder = {this.props.name}
        maxlength = "16"
        onFocus = {(e) => e.target.select()}
        onBlur = {this.props.onBlur}
        onKeyPress = {(e) => this.handleKeyPress(e)}
      />
    )
  }

  render() {
    var nameDisplay = this.props.name;
    if (this.props.isEditingName)
      nameDisplay = this.renderNameInputField();

    return ( // the hidden input is kludge but oh well
      <div>
        <input type="hidden" name="name" value={this.props.name}/>
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
