import React, {Component} from 'react';
import HexGridComponent from "./HexGridComponent";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Locations from "../model/Locations";
import SubjectFactory from "../model/SubjectFactory";
import PlayerComponent from "./HeroComponent";

class HelloWorldStringComponent extends Component {
    constructor(props) {
      super(props)
      let start = Locations.position(20, 20)
      this.state = {
        welcomeMessage: 'Use numpad to move',

        grid: {
          centre: start,
          object: HexGridComponent.position(6, 8)
        }
      }
      this.locations = Locations.create(SubjectFactory, start)
      this.player = SubjectFactory.newHero(1)
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
          <PlayerComponent player={this.player}/>
          <HexGridComponent radius="3" getCentre={this.getCentre}>
            {(position) => {
              if (position.matches(this.getCentre())) {
                return <div>X</div>
              }
              return <div>
                {this.locations.label(position)}
              </div>;
            }}

          </HexGridComponent>
        </>
        )
    }
}



export default HelloWorldStringComponent