import React, { Component } from 'react';

class PokemonName extends React.Component {

  renderNameInputField() {
    return (
      <input
        onFocus = {(e) => e.target.select()}
        onBlur = {this.props.onBlur}
        placeholder = "Enter Pokemon name"
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
          <img src="../../assets/pencil.png"
            alt="Edit name"
            onClick={this.props.onClick}
          />
        </div>
      </div>
    )
  }
}

export default PokemonName;
