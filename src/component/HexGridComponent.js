import React, {Component} from 'react';

class HexGridComponent extends Component {
  constructor(props) {
    super(props)
    let radius = parseInt(props.radius);
    this.state = {
      radius: radius,
      size: 2*radius + 1,
    }
    this.getCentre = props.getCentre
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

  calculatePosition = (row, column) => {
    let offset = this.state.radius;
    let centre = this.getCentre();
    let radiusParity = this.state.radius %2;
    let aligned = centre.row %2 === radiusParity || row %2 === radiusParity;
    let correction = aligned ? 0 : 1 - radiusParity * 2
    return centre.move(row - offset, column - offset + correction)()
  }


  tile(row, column) {
    let key = "cell" + row + ":" + column
    let gridPosition = this.calculatePosition(row, column);
    let far = gridPosition.distanceTo(this.getCentre()) > this.state.radius
    return <td key={key}>
      <div className={far ? "hidden" : "hex"}>
        <div className="hex-background">
          &#x2B22;
        </div>
        <div className="hex-content">
          {this.props.children(gridPosition)}
        </div>
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
  let id = `${row}:${column}`
  let matches = (that) => id === that.id
  let move = (rowdir, coldir) => () => position(row + rowdir, column + coldir)
  let shiftleft = row % 2 === 0 ? -1 : 0
  let upleft = move(-1, shiftleft);
  return {
    x: x, y: y, label: row+":"+column, distanceTo: distance,
    id: id,
    row: row, column: column, matches: matches, move: move,
    "4": move(0, -1), "6": move(0, 1),
    "8": move(-1, 0), "2": move(1, 0),
    "1": move(1, shiftleft), "7": upleft, upleft: upleft,
    "3": move(1, shiftleft+1), "9": move(-1, shiftleft + 1)

  }
}

HexGridComponent.position = position

export default HexGridComponent