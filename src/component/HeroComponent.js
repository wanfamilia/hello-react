import React, {Component} from 'react';

class PlayerComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {player: props.player}
  }

  render() {

    let player = this.state.player;
    return (<div>
        <div>HitPoints: {player.hitPoints} / {player.maxHitPoints()}</div>
        <div>XP: {player.xp} / {player.nextLevel()}</div>
      </div>
    )
  }
}


export default PlayerComponent