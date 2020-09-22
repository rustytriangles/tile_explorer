import React from 'react';
import {t2_data, s1_data, s2_data, s3_data, p2_data, h1_data, h2_data, o1_data} from './path_data.js';

// Returns the vertices of a polygon
//
// - num_sides - The number of sides
// - cx, cy - The center
// - radius - The radius
function makePolygonPoints(num_sides, cx, cy, radius) {
    let verts = [];
    const angle_offset = 0.25 + 1 / (2*num_sides);
    for (let i=0; i<num_sides; i++) {
        const ang = 2 * Math.PI * (1 + angle_offset - i / num_sides);
        const x = cx + radius*Math.cos(ang)
        const y = cy + radius*Math.sin(ang)
        verts.push([x, y]);
    }
    return verts;
}

// Returns the "tie points" of a polygon. That is, the places where the
// paths intersect the edges.
//
// - num_sides - The number of sides
// - num_ends - The number of paths per side
// - cx, cy - The center
// - radius - The radius
function makeTiePoints(num_sides, num_ends, cx, cy, radius) {

    const p = makePolygonPoints(num_sides, cx, cy, radius);

    let verts = [];
    if (num_ends == 1) {
        for (let i=0; i<num_sides; i++) {
            const j = (i+1)%num_sides;
            verts.push([(p[i][0] + p[j][0])/2, (p[i][1] + p[j][1])/2]);
        }
    } else if (num_ends == 2) {
        for (let i=0; i<num_sides; i++) {
            const j = (i+1)%num_sides;
            verts.push([(  p[i][0] + 2*p[j][0])/3, (  p[i][1] + 2*p[j][1])/3]);
            verts.push([(2*p[i][0] +   p[j][0])/3, (2*p[i][1] +   p[j][1])/3]);
        }
    } else if (num_ends == 3) {
        for (let i=0; i<num_sides; i++) {
            const j = (i+1)%num_sides;
            verts.push([(  p[i][0] + 3*p[j][0])/4, (  p[i][1] + 3*p[j][1])/4]);
            verts.push([(  p[i][0] +   p[j][0])/2, (  p[i][1] +   p[j][1])/2]);
            verts.push([(3*p[i][0] +   p[j][0])/4, (3*p[i][1] +   p[j][1])/4]);
        }
    }
    return verts;
}

// Returns the normal vectors of the tie points.
//
// - num_sides - The number of sides
// - num_ends - The number of paths per side
// - cx, cy - The center
// - radius - The radius
function makeTieNormals(num_sides, num_ends, cx, cy, radius) {

    const p = makePolygonPoints(num_sides, cx, cy, radius);

    let verts = [];
    for (let i=0; i<num_sides; i++) {
        const j = (i+1)%num_sides;
        const x = (p[j][1] - p[i][1]);
        const y = (p[i][0] - p[j][0]);
        const l = 0.375 * radius / Math.sqrt(x*x + y*y);
        for (let k=0; k<num_ends; k++) {
            verts.push([x*l, y*l]);
        }
    }
    return verts;
}

// Returns control points for the paths.
// Each path is 8 values: [c0x, c0y, c1x, c1y, c2x, c2y, c3x, c3y]
//
// - tie_indices - Array of pairs indices of tie points
// - num_sides - The number of sides
// - num_ends - The number of paths per side
// - cx, cy - The center
// - radius - The radius
function makePathPoints(tie_indices, num_sides, num_ends, cx, cy, radius) {
    const p = makePolygonPoints(num_sides, cx, cy, radius);
    const t = makeTiePoints(num_sides, num_ends, cx, cy, radius);
    const n = makeTieNormals(num_sides, num_ends, cx, cy, radius);

    let verts = [];
    for (let i=0; i<tie_indices.length; i++) {
        const s = tie_indices[i][0];
        const e = tie_indices[i][1];
        const c0 = t[s];
        const c1 = [t[s][0]+n[s][0], t[s][1]+n[s][1]];
        const c2 = [t[e][0]+n[e][0], t[e][1]+n[e][1]];
        const c3 = t[e];
        verts.push([c0[0], c0[1], c1[0], c1[1], c2[0], c2[1], c3[0], c3[1]])
    }
    return verts;
}

// Returns tie points indices for a specific tile. Returns [] if invalid.
//
// num_sides - # of sides of the polygon
// num_ends - # of end points per side
// set_index - Index into the set of tiles
function getTiePointIndices(num_sides, num_ends, set_index) {

    let seq = [];
    switch (num_sides) {
    case 3:
        if (num_ends == 2) {
            const s = t2_data[set_index];
            seq = [[s[0]-1, s[1]-1],
                   [s[2]-1, s[3]-1],
                   [s[4]-1, s[5]-1]];
        }
        break;
    case 4:
        if (num_ends == 1) {
            const s = s1_data[set_index];
            seq = [[s[0]-1, s[1]-1],
                   [s[2]-1, s[3]-1]];
        } else if (num_ends == 2) {
            const s = s2_data[set_index];
            seq = [[s[0]-1, s[1]-1],
                   [s[2]-1, s[3]-1],
                   [s[4]-1, s[5]-1],
                   [s[6]-1, s[7]-1]];
        } else if (num_ends == 3) {
            const s = s3_data[set_index];
            seq = [[s[0]-1, s[1]-1],
                   [s[2]-1, s[3]-1],
                   [s[4]-1, s[5]-1],
                   [s[6]-1, s[7]-1],
                   [s[8]-1, s[9]-1],
                   [s[10]-1, s[11]-1]];
        }
        break;
    case 5:
        if (num_ends == 2) {
            const s = p2_data[set_index];
            seq = [[s[0]-1, s[1]-1],
                   [s[2]-1, s[3]-1],
                   [s[4]-1, s[5]-1],
                   [s[6]-1, s[7]-1],
                   [s[8]-1, s[9]-1]];
        }
        break;
    case 6:
        if (num_ends == 1) {
            const s = h1_data[set_index];
            seq = [[s[0]-1, s[1]-1],
                   [s[2]-1, s[3]-1],
                   [s[4]-1, s[5]-1]];
        } else if (num_ends == 2) {
            const s = h2_data[set_index];
            seq = [[s[0]-1, s[1]-1],
                   [s[2]-1, s[3]-1],
                   [s[4]-1, s[5]-1],
                   [s[6]-1, s[7]-1],
                   [s[8]-1, s[9]-1],
                   [s[10]-1, s[11]-1]];
        }
        break;
    case 8:
        if (num_ends == 1) {
            const s = o1_data[set_index];
            seq = [[s[0]-1, s[1]-1],
                   [s[2]-1, s[3]-1],
                   [s[4]-1, s[5]-1],
                   [s[6]-1, s[7]-1]];
        }
        break;
    }

    return seq;
}

export {makePolygonPoints, makePathPoints, getTiePointIndices};
