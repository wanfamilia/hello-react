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
      if (!this.player.isAlive()) {
        this.setState({welcomeMessage: "Your character has died"})
        return
      }
      let centre = this.getCentre();
      let movedir = centre[direction];
      if (!movedir) {
        return;
      }
      let thatCentre = movedir()
      let target = this.locations.content(thatCentre)
      let interaction = target.interact({
        player: this.player,
        playerPosition: centre,
        destination: thatCentre
      })
      this.setState({grid: {centre: interaction.newPlayerPosition, object: this.state.grid.object}})
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