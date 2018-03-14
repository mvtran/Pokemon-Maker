import React, { Component } from 'react';

class StatBar extends Component {

  getBarStyle() {
    var max = this.props.state.statBounds[1];
    var length = Math.max(1, (this.props.statValue/max) * 100);

    const barStyle = {
      width: "25vw",
      "background-image": "linear-gradient(to right, " +
        this.props.color + " " + length + "%, #fff " +
        length + "%)"
    };

    return barStyle;
  }

  render() {
    var min = this.props.state.statBounds[0];
    var max = this.props.state.statBounds[1];
    const barStyle = this.getBarStyle();

    return (
        <div>
          <input className="stat-slider" type="range" min={min} max={max}
            title = "Click and drag to change"
            onChange = {(e) => this.props.onChange(this.props.statName, e)}
            style = {barStyle}
            tabindex = "-1" />
        </div>
    )
  }
}

export default StatBar;
