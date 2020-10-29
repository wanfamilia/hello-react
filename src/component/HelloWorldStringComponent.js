import React, { Component } from 'react';
import HexTileComponent from './HexTileComponent'
import HexGridComponent from "./HexTileComponent";

class HelloWorldStringComponent extends Component {
    render() {
        return (<>
          <HexGridComponent size="7">

          </HexGridComponent>
            <HexTileComponent>
                FOO
            </HexTileComponent>
        </>
        )
    }
}

export default HelloWorldStringComponent