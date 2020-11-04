import React, {Component} from 'react';
import HexGridComponent from "./HexGridComponent";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Locations from "../model/Locations";
import SubjectFactory from "../model/SubjectFactory";
import PlayerComponent from "./HeroComponent";

class HelloWorldStringComponent extends Component {
    constructor(props) {
      super(props)
      this.defaultMessage = "Use numpad to move"
      this.start = Locations.position(20, 20)
      this.state = {
        welcomeMessage: this.defaultMessage,
        grid: {centre: this.start}
      }
      this.player = SubjectFactory.newHero(1)
      this.reset();
    }

  reset = () => {
    this.locations = Locations.create(SubjectFactory, this.start)
    this.player.reset()
    this.setState({grid: {centre: this.start}})
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
      this.locations.update(thatCentre, interaction.replacement)
      this.setState({
        grid: {centre: interaction.newPlayerPosition, object: this.state.grid.object},
        welcomeMessage: interaction.message || this.defaultMessage
      })
    }

    getCentre = () => {
      return this.state.grid.centre
    }

    render() {
      return (<>
        <KeyboardEventHandler handleKeys={['numeric']} onKeyEvent={this.changePosition}/>
        <button className="btn btn-success" onClick={this.reset}>Reset</button>
        <p className="jt_message">{this.state.welcomeMessage}</p>
        <PlayerComponent player={this.player}/>
        <HexGridComponent radius="3" getCentre={this.getCentre}>
          {(position) => {
            if (position.matches(this.getCentre())) {
              return <div className="hex-text">{this.player.label()}</div>
            }
            return <div className="hex-text">
              {this.locations.label(position)}
            </div>;
          }}
        </HexGridComponent>
      </>)
    }
}



export default HelloWorldStringComponent