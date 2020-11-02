import React, {Component} from 'react';

class PlayerComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {player: props.player}
  }

  render() {

    let player = this.state.player;
    let format = (number) => {
      return number < 1000 ? number : Math.floor(number / 1000) + "K";
    }
    return (<div>
        <div className="herobar">
          <div>HitPoints: {player.hitPoints} / {player.maxHitPoints()}</div>
          <div>XP: {format(player.xp)} / {format(player.nextLevel())}</div>
          <div>Attack: {player.attack}</div>
          <div>Defense: {player.defense}</div>
          <div>Regeneration: {player.regen}</div>
        </div>
      </div>
    )
  }
}


export default PlayerComponent