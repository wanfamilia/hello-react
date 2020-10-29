import React, { Component } from 'react';

class HexTileComponent extends Component {
  render() {
    return (
        <div className="hex">
          <div className="hex-background">
            &#x2B22;
          </div>
          <div className="hex-content">{this.props.children}</div>
        </div>
    )
  }
}

export default HexTileComponent