import React, {Component} from 'react';
import HexGridComponent from "./HexGridComponent";

class HelloWorldStringComponent extends Component {

    render() {
        let refpos = HexGridComponent.position(2, 2)
        return (<><p className="jt_message">initial message</p>
          <HexGridComponent size="7">
            {(position) => <div>
              D: {refpos.distanceTo(position).toFixed(1)}
            </div>}

          </HexGridComponent>
        </>
        )
    }
}



export default HelloWorldStringComponent