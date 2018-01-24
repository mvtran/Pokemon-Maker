import React, { Component } from 'react';

class StatBar extends Component {

  getStyle() {
    var length = Math.max(1, ~~((this.props.statValue/255) * 100));

    const barStyle = {
      "width": "30vw",
      "background-image": "linear-gradient(to right, " +
        this.props.color + " " + length + "%, #fff " +
        length + "%)"
    };
    return barStyle;
  }

  render() {
    var min = this.props.stats.statBounds[0];
    var max = this.props.stats.statBounds[1];
    const barStyle = this.getStyle();

    return (
        <div>
          <input className="stat-slider" type="range" min={min} max={max}
            onChange = {(e) => this.props.onChange(this.props.statName, e)}
            style = {barStyle}
          />
        </div>
    )
  }
}

export default StatBar;
