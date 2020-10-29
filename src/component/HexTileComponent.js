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
    let size = this.state.size;
    debugger
    return Array(size || 0).fill().map((v, i) => i)
  }

  tile(row, column) {
    let key = "cell" + row + ":" + column
    return <td key={key}>
      <div className="hex">
        <div className="hex-background">
          &#x2B22;
        </div>
        <div className="hex-content">{key}</div>
      </div>
    </td>
  }
}

export default HexGridComponent