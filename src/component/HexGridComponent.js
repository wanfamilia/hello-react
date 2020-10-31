import React, {Component} from 'react';

class HexGridComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: parseInt(props.size)
    }
  }

  render() {
    return (<div>
      <table className="hexgrid">
        <tbody>
        {this.indices().map(i => this.row(i))}
        </tbody>
      </table>
      </div>
    )
  }

  row(i) {
    let key = "row"+i
    return <tr key={key}>{this.indices().map(j => this.tile(i, j))}</tr>
  }

  indices() {
    let size = this.state.size || 0;
    return Array(size).fill().map((v, i) => i)
  }


  tile(row, column) {
    let key = "cell" + row + ":" + column
    return <td key={key}>
      <div className="hex">
        <div className="hex-background">
          &#x2B22;
        </div>
        <div className="hex-content">{this.props.children(HexGridComponent.position(row, column))}</div>
      </div>
    </td>
  }
}

let position = (row, column) => {
  let offset = row % 2 === 0 ? 0 : 0.5
  let x = column+offset;
  let y = row;
  let distance = (that) => {
    return Math.sqrt((x - that.x) ** 2 + (y - that.y) ** 2 * 0.75)
  }
  let move = (rowdir, coldir) => () => position(row + rowdir, column + coldir)
  let shiftleft = row % 2 === 0 ? -1 : 0
  return {
    x: x, y: y, label: row+":"+column, distanceTo: distance,
    row: row, column: column,
    "4": move(0, -1), "6": move(0, 1),
    "8": move(-1, 0), "2": move(1, 0),
    "1": move(1, shiftleft), "7": move(-1, shiftleft),
    "3": move(1, shiftleft+1), "9": move(-1, shiftleft + 1)

  }
}

HexGridComponent.position = position

export default HexGridComponent