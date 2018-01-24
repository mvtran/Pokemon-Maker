import React, { Component } from 'react';

class StatBar extends Component {
  handleMouseOver() {

  }

  render() {
    return (
        <div style={{
            width: this.props.width,
            height: "0.7em",
            border: "1px solid #ddd",
            backgroundColor: this.props.color
          }}>
        </div>
      );
  }
}

module.exports = StatBar;
