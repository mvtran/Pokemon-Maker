import React, { Component } from 'react';

class PokemonImage extends Component {
  render() {
    console.log(this.props.src);
    return (
      <div>
        <img class="pokemon-image"
          src={this.props.src}
          alt="Pokemon image"/>
      </div>
    )
  }
}

export default PokemonImage;
