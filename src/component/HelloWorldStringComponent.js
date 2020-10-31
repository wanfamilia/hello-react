import React, {Component} from 'react';
import HexGridComponent from "./HexGridComponent";
import KeyboardEventHandler from 'react-keyboard-event-handler';

class HelloWorldStringComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        welcomeMessage: 'initial message',
        refpos: HexGridComponent.position(2, 4)
      }
    }

    numkey = (key) => {
      this.changePosition(key)
    }

    changePosition(direction) {
      let movedir = this.state.refpos[direction];
      if (!movedir) {
        return;
      }
      this.setState({refpos: movedir()})
    }

    render() {
        return (<>
          <KeyboardEventHandler handleKeys={['numeric']} onKeyEvent={this.numkey}/>
          <p className="jt_message">{this.state.welcomeMessage}</p>
          <HexGridComponent size="7">
            {(position) => {
              let number = this.state.refpos.distanceTo(position);
              let value = number < 1.01 ? number.toFixed(1) : ""
              return <div>
                {value}
              </div>;
            }}

          </HexGridComponent>
        </>
        )
    }
}



export default HelloWorldStringComponent