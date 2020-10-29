import React, { Component } from 'react';
import HexGridComponent from "./HexGridComponent";

class HelloWorldStringComponent extends Component {

    render() {
        let refpos = HexGridComponent.position(2, 2)
        return (<>
          <HexGridComponent size="11">
            {(position) => <div>
              D: {this.distance(refpos, position)}
            </div>}

          </HexGridComponent>
        </>
        )
    }

    distance(p1, p2) {
      let dd = p1.distanceTo(p2);
      return dd.toFixed(1)
    }

}



export default HelloWorldStringComponent