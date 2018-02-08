import React, { Component } from 'react';

class ImageInsertion extends Component {
  render() {
    return (
      <div className="image-input">
          <label>
            Image URL:<br/>
            <input type="text" id="image-url"
              onClick = {(e) => e.target.select()} />
          </label>
          <button type="button"
            id="image-submit-button"
            onClick={this.props.handleSubmitImage}>
              Submit
          </button>
      </div>
    )
  }
}

export default ImageInsertion;
