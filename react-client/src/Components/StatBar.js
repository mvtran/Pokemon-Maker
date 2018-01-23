var React = require('react');

function StatBar(props) {
  return (
      <div style={{
          width: props.width,
          height: "12px",
          border: "1px solid #ddd",
          backgroundColor: props.color,
        }}>
      </div>
    );
}

module.exports = StatBar;
