import React, {Component} from 'react';
import HexGridComponent from "./HexGridComponent";
import KeyboardEventHandler from 'react-keyboard-event-handler';

class HelloWorldStringComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        welcomeMessage: 'initial message',
        grid: {
          centre: HexGridComponent.position(2, 4),
          object: HexGridComponent.position(6, 8)
        }
      }
    }

    changePosition = (direction) => {
      let movedir = this.getCentre()[direction];
      if (!movedir) {
        return;
      }
      this.setState({grid: {centre: movedir(), object: this.state.grid.object}})
    }

    getCentre = () => {
      return this.state.grid.centre
    }

    render() {
        return (<>
          <KeyboardEventHandler handleKeys={['numeric']} onKeyEvent={this.changePosition}/>
          <p className="jt_message">{this.state.welcomeMessage}</p>
          <HexGridComponent radius="4" getCentre={this.getCentre}>
            {(position) => {
              if (position.matches(this.getCentre())) {
                return <div>X</div>
              }
              let number = this.state.grid.object.distanceTo(position);
              let value = number < 2.01 ? number.toFixed(1) : ""
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