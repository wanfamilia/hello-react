import React, { Component } from 'react';
import HexTileComponent from './HexTileComponent'

class HelloWorldStringComponent extends Component {
    render() {
        return (<>
          <table className="hexgrid">
              <tbody>
                <tr>
                    <td><HexTileComponent>a</HexTileComponent></td>
                    <td><HexTileComponent>b</HexTileComponent></td>
                    <td><HexTileComponent>c</HexTileComponent></td>
                    <td><HexTileComponent>d</HexTileComponent></td>
                </tr>
                <tr>
                    <td><HexTileComponent>e</HexTileComponent></td>
                    <td><HexTileComponent>f</HexTileComponent></td>
                    <td><HexTileComponent>g</HexTileComponent></td>
                    <td><HexTileComponent>h</HexTileComponent></td>
                </tr>
                <tr>
                  <td><HexTileComponent>i</HexTileComponent></td>
                  <td><HexTileComponent>j</HexTileComponent></td>
                  <td><HexTileComponent>k</HexTileComponent></td>
                  <td><HexTileComponent>l</HexTileComponent></td>
                </tr>
                <tr>
                  <td><HexTileComponent>m</HexTileComponent></td>
                  <td><HexTileComponent>n</HexTileComponent></td>
                  <td><HexTileComponent>o</HexTileComponent></td>
                  <td><HexTileComponent>p</HexTileComponent></td>
                </tr>
              </tbody>

          </table>
            <HexTileComponent>
                FOO
            </HexTileComponent>
        </>
        )
    }
}

export default HelloWorldStringComponent