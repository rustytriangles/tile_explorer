import React from 'react';
import './App.css';
import {getTiePointIndices, makePolygonPoints, makePathPoints} from './tile.js';
import {tile_sets} from './path_data.js';

// Returns an SVG path which draws a polygon
// num_sides - # of sides
// cx, cy - Center
// radius - The radius
// props - Rendering properties
function makePolygon(num_sides, cx, cy, radius, props) {

    const verts = makePolygonPoints(num_sides, cx, cy, radius);

    // generate path data from vertices
    let path_data = '';
    for (let i=0; i<num_sides; i++) {
        path_data += (i===0?' M':' L');
        path_data += ' ' + verts[i][0] + ' '+ verts[i][1]
    };
    path_data += ' Z';

    // return path
    return <path fill={props.fillStyle}
                 stroke={props.strokeColor}
                 stroke-width={props.strokeWidth}
                 d={path_data} />
}

function makePaths(num_sides, num_ends, tile_index, cx, cy, radius, props) {
    const tieIndices = getTiePointIndices(num_sides, num_ends, tile_index);
    const tiePoints = makePathPoints(tieIndices, num_sides, num_ends, cx, cy, radius);

    const colors = ["#F00", "#0F0", "#00F", "#F0F", "#FF0", "#0FF"];
    let color_index = 0;

    const fun = (items) => items.map((item) => {
        const dstr = "M " + item[0] + " " + item[1] + " C " + item[2] + " " + item[3] + " " + item[4] + " " + item[5] + " " + item[6] + " " + item[7];

        const color = colors[color_index];
        color_index = (color_index+1)%colors.length;
        return <path fill={props.fillStyle}
                     stroke={color}
                     stroke-width={props.strokeWidth}
                     d={dstr} />
    })

    return <> {fun(tiePoints)} </>
}

function makeTile(num_sides, num_ends, tile_index) {
    const borderProps = {
        fillStyle: "none",
        strokeColor: "grey",
        strokeWidth: "9"
    };

    const pathProps = {
        fillStyle: "none",
        strokeColor: "red",
        strokeWidth: "5"
    };

    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
               <g fill="#FF00FF">
                   { makePaths(num_sides, num_ends, tile_index, 200, 200, 175, pathProps) }
                   { makePolygon(num_sides, 200, 200, 175, borderProps) }
               </g>
           </svg>
}

class TileViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currSet: 4,
            currTile: 3
        };
    }

    keyDown(e) {
        switch (e.keyCode) {
        case 37:
            this.decrementTile();
            break;
        case 39:
            this.incrementTile();
            break;
        case 38:
            this.decrementSet();
            break;
        case 40:
            this.incrementSet();
            break;
        }
    }

    incrementSet() {
        this.setState((prevState) => {
            const newSet = (prevState.currSet + 1) % tile_sets.length;
            const newTile = prevState.currTile % tile_sets[newSet].num_sets
            return { currSet: newSet,
                     currTile: newTile }
        });
    }

    decrementSet() {
        this.setState((prevState) => {
            const newSet = (prevState.currSet + tile_sets.length - 1) % tile_sets.length;
            const newTile = prevState.currTile % tile_sets[newSet].num_sets
            return { currSet: newSet,
                     currTile: newTile }
        });
    }

    incrementTile() {
        this.setState((prevState) => {
            const newTile = (prevState.currTile + 1) % tile_sets[prevState.currSet].num_sets;
            return { currSet: prevState.currSet,
                     currTile: newTile }
        });
    }

    decrementTile() {
        this.setState((prevState) => {
            const newTile = (prevState.currTile + tile_sets[prevState.currSet].num_sets - 1) % tile_sets[prevState.currSet].num_sets;
            return { currSet: prevState.currSet,
                     currTile: newTile }
        });
    }

    render() {
        return (
            <div onKeyDown = { this.keyDown.bind(this) } tabIndex="1" >
                <p>Curr Set: {tile_sets[this.state.currSet].name}</p>
                <p>Curr Tile: {this.state.currTile}</p>
                { makeTile(tile_sets[this.state.currSet].num_sides,
                           tile_sets[this.state.currSet].num_ends,
                           this.state.currTile)
                }
            </div>
        );
    }
}

export default TileViewer;
