An updated version of my [old Processing sketch](https://blog.garritys.org/2012/01/tile-explorer.html) that draws
various path tiles.

For more info on the combinatorics of these tiles, see [A132100](https://oeis.org/A132100) of the [Online Encyclopedia of Integer Sequences](http://oeis.org).

This draws the tiles using a React component called TileViewer which is implemented in SVG. It has handlers for the arrow keys which allow you to step through the different tiles. You might have to click to ensure that the TileViewer has focus before using the arrow keys.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

To get code coverage, do <pre>npm test -- --coverage</pre>.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

## Modules used

* [react](https://reactjs.org/) - React
* [jest](https://jestjs.io/), [jest-dom](https://github.com/testing-library/jest-dom), & [jest-extended](https://github.com/jest-community/jest-extended) - Jest unittest framework
