import React from 'react';
import {getTiePointIndices, makePathPoints, makePolygonPoints} from './tile.js';
import 'jest-extended';

test('makePolygonPoints 4', () => {
    const p = makePolygonPoints(4, 0, 0, 200);
    const corners = [
        [-100.*Math.sqrt(2),-100.*Math.sqrt(2)],
        [ 100.*Math.sqrt(2), 100.*Math.sqrt(2)]
    ];

    const x_corners = [0, 1, 1, 0];
    const y_corners = [1, 1, 0, 0];

    expect(p).toBeArrayOfSize(4);
    for (let i=0; i<4; i++) {
        expect(p[i]).toBeArrayOfSize(2);
        expect(p[i][0]).toBeCloseTo(corners[x_corners[i]][0]);
        expect(p[i][1]).toBeCloseTo(corners[y_corners[i]][1]);
    }
});

test('makePathPoints 4/1', () => {

    const indices = [[0, 1], [2, 3]];

    const p = makePathPoints(indices, 4, 1, 0, 0, 200);

    const s2 = 100. * Math.sqrt(2);
    const expected_end_points = [[  0, s2],
                                 [ s2,  0],
                                 [  0,-s2],
                                 [-s2,  0]];

    expect(p).toBeArrayOfSize(2);
    expect(p[0]).toBeArrayOfSize(8);
    // first path, start point
    expect(p[0][0]).toBeCloseTo(expected_end_points[0][0]);
    expect(p[0][1]).toBeCloseTo(expected_end_points[0][1]);
    // first path, end point
    expect(p[0][6]).toBeCloseTo(expected_end_points[1][0]);
    expect(p[0][7]).toBeCloseTo(expected_end_points[1][1]);
    expect(p[1]).toBeArrayOfSize(8);
    // second path, start point
    expect(p[1][0]).toBeCloseTo(expected_end_points[2][0]);
    expect(p[1][1]).toBeCloseTo(expected_end_points[2][1]);
    // second path, end point
    expect(p[1][6]).toBeCloseTo(expected_end_points[3][0]);
    expect(p[1][7]).toBeCloseTo(expected_end_points[3][1]);
});

test('makePathPoints 4/2', () => {

    const indices = [[0, 1], [2, 3], [4, 5], [6, 7]];

    const p = makePathPoints(indices, 4, 2, 0, 0, 200);

    const s2 = 100. * Math.sqrt(2);
    const expected_end_points = [[ s2/3, s2  ],
                                 [-s2/3, s2  ],
                                 [ s2  ,-s2/3],
                                 [ s2  , s2/3],
                                 [-s2/3,-s2  ],
                                 [ s2/3,-s2  ],
                                 [-s2  , s2/3],
                                 [-s2  ,-s2/3]];

    expect(p).toBeArrayOfSize(4);

    // first path
    expect(p[0]).toBeArrayOfSize(8);
    // first path, start point
    expect(p[0][0]).toBeCloseTo(expected_end_points[0][0]);
    expect(p[0][1]).toBeCloseTo(expected_end_points[0][1]);
    // first path, end point
    expect(p[0][6]).toBeCloseTo(expected_end_points[1][0]);
    expect(p[0][7]).toBeCloseTo(expected_end_points[1][1]);

    // second path
    expect(p[1]).toBeArrayOfSize(8);
    // second path, start point
    expect(p[1][0]).toBeCloseTo(expected_end_points[2][0]);
    expect(p[1][1]).toBeCloseTo(expected_end_points[2][1]);
    // second path, end point
    expect(p[1][6]).toBeCloseTo(expected_end_points[3][0]);
    expect(p[1][7]).toBeCloseTo(expected_end_points[3][1]);

    // third path
    expect(p[2]).toBeArrayOfSize(8);
    // third path, start point
    expect(p[2][0]).toBeCloseTo(expected_end_points[4][0]);
    expect(p[2][1]).toBeCloseTo(expected_end_points[4][1]);
    // second path, end point
    expect(p[2][6]).toBeCloseTo(expected_end_points[5][0]);
    expect(p[2][7]).toBeCloseTo(expected_end_points[5][1]);

    // fourth path
    expect(p[3]).toBeArrayOfSize(8);
    // fourth path, start point
    expect(p[3][0]).toBeCloseTo(expected_end_points[6][0]);
    expect(p[3][1]).toBeCloseTo(expected_end_points[6][1]);
    // fourth path, end point
    expect(p[3][6]).toBeCloseTo(expected_end_points[7][0]);
    expect(p[3][7]).toBeCloseTo(expected_end_points[7][1]);
});

test('makePathPoints 4/3', () => {

    const indices = [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11]];

    const p = makePathPoints(indices, 4, 3, 0, 0, 200);

    const s2 = 100. * Math.sqrt(2);
    const expected_end_points = [[ s2/2, s2  ],
                                 [  0  , s2  ],
                                 [-s2/2, s2  ],
                                 [ s2  ,-s2/2],
                                 [ s2  ,  0  ],
                                 [ s2  , s2/2],
                                 [-s2/2,-s2  ],
                                 [  0  ,-s2  ],
                                 [ s2/2,-s2  ],
                                 [-s2  , s2/2],
                                 [-s2  , 0   ],
                                 [-s2  ,-s2/2]];

    expect(p).toBeArrayOfSize(6);

    // first path
    expect(p[0]).toBeArrayOfSize(8);
    // first path, start point
    expect(p[0][0]).toBeCloseTo(expected_end_points[0][0]);
    expect(p[0][1]).toBeCloseTo(expected_end_points[0][1]);
    // first path, end point
    expect(p[0][6]).toBeCloseTo(expected_end_points[1][0]);
    expect(p[0][7]).toBeCloseTo(expected_end_points[1][1]);

    // second path
    expect(p[1]).toBeArrayOfSize(8);
    // second path, start point
    expect(p[1][0]).toBeCloseTo(expected_end_points[2][0]);
    expect(p[1][1]).toBeCloseTo(expected_end_points[2][1]);
    // second path, end point
    expect(p[1][6]).toBeCloseTo(expected_end_points[3][0]);
    expect(p[1][7]).toBeCloseTo(expected_end_points[3][1]);

    // third path
    expect(p[2]).toBeArrayOfSize(8);
    // third path, start point
    expect(p[2][0]).toBeCloseTo(expected_end_points[4][0]);
    expect(p[2][1]).toBeCloseTo(expected_end_points[4][1]);
    // third path, end point
    expect(p[2][6]).toBeCloseTo(expected_end_points[5][0]);
    expect(p[2][7]).toBeCloseTo(expected_end_points[5][1]);

    // fourth path
    expect(p[3]).toBeArrayOfSize(8);
    // fourth path, start point
    expect(p[3][0]).toBeCloseTo(expected_end_points[6][0]);
    expect(p[3][1]).toBeCloseTo(expected_end_points[6][1]);
    // fourth path, end point
    expect(p[3][6]).toBeCloseTo(expected_end_points[7][0]);
    expect(p[3][7]).toBeCloseTo(expected_end_points[7][1]);

    // fifth path
    expect(p[4]).toBeArrayOfSize(8);
    // fifth path, start point
    expect(p[4][0]).toBeCloseTo(expected_end_points[8][0]);
    expect(p[4][1]).toBeCloseTo(expected_end_points[8][1]);
    // fifth path, end point
    expect(p[4][6]).toBeCloseTo(expected_end_points[9][0]);
    expect(p[4][7]).toBeCloseTo(expected_end_points[9][1]);

    // sixth path
    expect(p[5]).toBeArrayOfSize(8);
    // sixth path, start point
    expect(p[5][0]).toBeCloseTo(expected_end_points[10][0]);
    expect(p[5][1]).toBeCloseTo(expected_end_points[10][1]);
    // sixth path, end point
    expect(p[5][6]).toBeCloseTo(expected_end_points[11][0]);
    expect(p[5][7]).toBeCloseTo(expected_end_points[11][1]);
});

test('getTiePointIndices 3/2', () => {
    for (let i=0; i<7; i++) {
        const idx = getTiePointIndices(3,2,i);
        expect(idx).toBeArrayOfSize(3);
        expect(idx[0]).toBeArrayOfSize(2);
        expect(idx[1]).toBeArrayOfSize(2);
        expect(idx[2]).toBeArrayOfSize(2);

        // check that 0-5 each appear once
        expect(idx.flat()).toIncludeAllMembers([...Array(6).keys()]);
    }
});

test('getTiePointIndices 4/1', () => {
    for (let i=0; i<2; i++) {
        const idx = getTiePointIndices(4,1,i);
        expect(idx).toBeArrayOfSize(2);
        expect(idx[0]).toBeArrayOfSize(2);
        expect(idx[1]).toBeArrayOfSize(2);

        // check that 0-3 each appear once
        expect(idx.flat()).toIncludeAllMembers([...Array(4).keys()]);
    }
});

test('getTiePointIndices 4/2', () => {
    for (let i=0; i<12; i++) {
        const idx = getTiePointIndices(4,2,i);
        expect(idx).toBeArrayOfSize(4);
        expect(idx[0]).toBeArrayOfSize(2);
        expect(idx[1]).toBeArrayOfSize(2);
        expect(idx[2]).toBeArrayOfSize(2);
        expect(idx[3]).toBeArrayOfSize(2);

        // check that 0-7 each appear once
        expect(idx.flat()).toIncludeAllMembers([...Array(8).keys()]);
    }
});

test('getTiePointIndices 4/3', () => {
    for (let i=0; i<2688; i++) {
        const idx = getTiePointIndices(4,3,i);
        expect(idx).toBeArrayOfSize(6);
        expect(idx[0]).toBeArrayOfSize(2);
        expect(idx[1]).toBeArrayOfSize(2);
        expect(idx[2]).toBeArrayOfSize(2);
        expect(idx[3]).toBeArrayOfSize(2);
        expect(idx[4]).toBeArrayOfSize(2);
        expect(idx[5]).toBeArrayOfSize(2);

        // check that 0-11 each appear once
        expect(idx.flat()).toIncludeAllMembers([...Array(12).keys()]);
    }
});

test('getTiePointIndices 5/2', () => {
    for (let i=0; i<193; i++) {
        const idx = getTiePointIndices(5,2,i);
        expect(idx).toBeArrayOfSize(5);
        expect(idx[0]).toBeArrayOfSize(2);
        expect(idx[1]).toBeArrayOfSize(2);
        expect(idx[2]).toBeArrayOfSize(2);
        expect(idx[3]).toBeArrayOfSize(2);
        expect(idx[4]).toBeArrayOfSize(2);

        // check that 0-9 each appear once
        expect(idx.flat()).toIncludeAllMembers([...Array(10).keys()]);
    }
});

test('getTiePointIndices 6/1', () => {
    for (let i=0; i<5; i++) {
        const idx = getTiePointIndices(6,1,i);
        expect(idx).toBeArrayOfSize(3);
        expect(idx[0]).toBeArrayOfSize(2);
        expect(idx[1]).toBeArrayOfSize(2);
        expect(idx[2]).toBeArrayOfSize(2);

        // check that 0-5 each appear once
        expect(idx.flat()).toIncludeAllMembers([...Array(6).keys()]);
    }
});

test('getTiePointIndices 6/2', () => {
    for (let i=0; i<1799; i++) {
        const idx = getTiePointIndices(6,2,i);
        expect(idx).toBeArrayOfSize(6);
        expect(idx[0]).toBeArrayOfSize(2);
        expect(idx[1]).toBeArrayOfSize(2);
        expect(idx[2]).toBeArrayOfSize(2);
        expect(idx[3]).toBeArrayOfSize(2);
        expect(idx[4]).toBeArrayOfSize(2);
        expect(idx[5]).toBeArrayOfSize(2);

        // check that 0-11 each appear once
        expect(idx.flat()).toIncludeAllMembers([...Array(12).keys()]);
    }
});

test('getTiePointIndices 8/1', () => {
    for (let i=0; i<18; i++) {
        const idx = getTiePointIndices(8,1,i);
        expect(idx).toBeArrayOfSize(4);
        expect(idx[0]).toBeArrayOfSize(2);
        expect(idx[1]).toBeArrayOfSize(2);
        expect(idx[2]).toBeArrayOfSize(2);
        expect(idx[3]).toBeArrayOfSize(2);

        // check that 0-7 each appear once
        expect(idx.flat()).toIncludeAllMembers([...Array(8).keys()]);
    }
});
