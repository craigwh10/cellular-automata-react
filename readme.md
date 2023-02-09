# cellular-automata-react

This is the result of a walkthrough I wrote on <http://craigwh.it/posts/conways-game-of-life-in-react>.

**Prerequisites:**

- React (v18 onwards)

---

## Installation

Once installed you can import this module into your React components and get using it quickly.

For some implementation examples see:

- [NextJS](example-ssr/src/pages/index.tsx)
- [Create-React-App](example/src/App.tsx)

### NPM

```sh
npm i cellular-automata-react
```

### Yarn

```sh
yarn add cellular-automata-react
```

---

## What is Cellular Automata?

> A cellular automaton is a collection of "colored" cells on a grid of specified shape that evolves through a number of discrete time steps according to a set of rules based on the states of neighboring cells. The rules are then applied iteratively for as many time steps as desired.

**[Reference: Wolfram Mathworld](https://mathworld.wolfram.com/CellularAutomaton.html)**

## What can I do?

- Run fun experiments by writing javascript using the API provided.
  - [API file (.ts)](https://github.com/craigwh10/cellular-automata-react/blob/master/src/rules/utils.ts)
- Make interesting "living" graphics on your website.
  - Check out [my site](https://craigwh.it/).
- Run the Conways preset and play around with the initial conditions.

This package provides an `<AutomataGrid />` component from which you can:

- Set the initial pixels via coordinates.
- Set how fast the iterations happen.
- Set the size of the grid.
- Set the rules of how the pixels will behave.
- Set the style of the pixels or grid within.

## Example: Conway's game of life with a randomized pixel soup

**Example: Random Soup - Generates an N randomized pixel distribution.**

```tsx
import './App.css';
import {
    AutomataGrid,
    conwaysGameOfLifePreset,
    generateSoup,
} from 'cellular-automata-react';

function App() {
    const gridDimensions = {
        xWidth: 4,
        yWidth: 4,
    };

    return (
        <div className="App">
            <header className="App-header">
                <AutomataGrid
                    pixelsActive={generateSoup(gridDimensions)}
                    iterationTimeInMs={1000}
                    size={gridDimensions}
                    rules={conwaysGameOfLifePreset}
                    className="conway-grid"
                />
            </header>
        </div>
    );
}

export default App;
```

## Setting rules

```ts
type Pixel = [number, number];

type RuleCallback = (
    // Every active pixel [x,y] is passed
    // Through this callback per iteration.
    pixel: Pixel,
    // The current state of the grid.
    pixels: Array<Pixel>,
    // The size of the board
    size: number,
    // Setter for the next iteration state of the board.
    setPixelsActive: (pixelsActive: Array<Pixel>) => void,
    // Removing a group of pixels from state by
    // passing in an array of coordinates.
    removeActivePixels: (pixel: Array<Pixel>) => void
) => void;
```

You use this callback as a prop within `<AutomataGrid />`.

Then use the data params to apply the setters to either kill or create more pixels.

You can use either the predefined utilities within the package or pass a callback and make your own rules, if they're interesting let me know and I'll add them to the presets :)

**Example: Random activity rule callback**

```tsx
import './App.css';
import { AutomataGrid, pixelsNearby } from 'cellular-automata-react';

function App() {
    return (
        <AutomataGrid
            rules={(
                pixel,
                pixels,
                size,
                setPixelsActive,
                removeActivePixels
            ) => {
                // All pixels brought in this callback are alive
                // rather than iterating on each grid element.

                const pixelsNearbyArray = pixelsNearby(pixel, size);
                if (pixelsNearbyArray.length) {
                    const randomPixel =
                        pixelsNearbyArray[
                            Math.floor(Math.random() * pixelsNearbyArray.length)
                        ];
                    setPixelsActive(randomPixel);
                }
            }}
        />
    );
}

export default App;
```

## Setting styles

In 1.0.8 you can now pass down a `className`, it adds the className to the grid wrapper, so you can style from parent downwards.

1.0.9 allows you to set any css-in-js pixel styles for the pixel by passing in an appropriate style object such as the below:

```tsx
<AutomataGrid
    pixelStyles={{
        activeColor: 'red',
        inactiveColor: 'blue',
        width: 25,
        height: 25,
        border: 1,
        borderColor: 'black',
    }}
/>
```

OR via CSS:

```css
.automata-grid-custom .automata-grid-element {
    width: 10px !important;
    height: 10px !important;
    background: #e2e8f0 !important;
}

.automata-grid-custom .automata-grid-element-alive {
    background: #38a169 !important;
}
```

with the prop:

```tsx
<AutomataGrid className="automata-grid-custom" />
```

## Example rule preset: Conway's game of life

Feel free to take this apart and create your own unique cellular automata algorithm, if you find any cool ones, open a PR with them as a `rule`.

```ts
import {
    nearbyAlivePixelsInState,
    nearbyDeadPixels,
    Pixel,
    AutomataGridSizeProp,
} from 'cellular-automata-react';

export const conwaysGameOfLifePreset = (
    pixel: Pixel,
    pixels: Pixel[],
    size: AutomataGridSizeProp,
    setPixelsActive: (pixelsActive: Array<Pixel>) => void,
    removeActivePixels: (pixel: Array<Pixel>) => void
) => {
    // All the neighbors, so we can generate nearby.

    // Return alive neighbors for current pixel being checked in callback.
    const aliveNeighborPixels = nearbyAlivePixelsInState(pixel, size, pixels);
    const aliveNeighbors = aliveNeighborPixels.length;

    /**
     * DEAD CELL ACTION:
     */

    // We need to only run if has any dead neighbors
    if (aliveNeighbors) {
        // Get an array of the coordinates of the dead pixels around an alive pixel.
        const deadNeighbors = nearbyDeadPixels(pixel, size, pixels);

        // From these dead pixels from neighborhood, return back the ones that have
        // 3 alive neighbors around them.
        const deadPixelsWith3AliveNeighbors = deadNeighbors.filter(
            (deadPixel: Pixel) => {
                return (
                    nearbyAlivePixelsInState(deadPixel, size, pixels).length ===
                    3
                );
            }
        );

        if (deadPixelsWith3AliveNeighbors.length) {
            setPixelsActive(deadPixelsWith3AliveNeighbors);
        }
    }

    /**
     * ALIVE CELL ACTIONS:
     */

    // Any live cell with two or three live neighbours survives.
    if (aliveNeighbors === 3 || aliveNeighbors === 2) {
        return;
    }

    // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
    else {
        removeActivePixels([pixel]);
    }
};
```

## Opportunities/Inspiration

- Variants: <https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/modeling-natural-systems/gameOfLife2.html>.
- Patterns to generate interesting behavior: <https://conwaylife.com/wiki/>
- Every method used to create Conway's example is available within the package for ease of creation of rulesets, if you create any just open a PR.
- My logo on [craigwh.it](http://craigwh.it)

---

### FAQs

- Does this support SSR?
  - Yes this has been tested on SSR/CSR & SSG

## Contribute

Feel free to open pull requests for presets or suggestions and I'll happily look over them.

Also if you make anything cool with this let me know and I'll feature it here.

<https://www.npmjs.com/package/cellular-automata-react>
