import React, { Component } from 'react';

function StatBar(props) {
  return (
      <div style={{
          width: props.width,
          height: "0.7em",
          border: "1px solid #ddd",
          backgroundColor: props.color,
        }}>
      </div>
    );
}

module.exports = StatBar;
