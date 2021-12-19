## What is this?

This is the result of a walkthrough I wrote on <http://craigwh.it/posts/conways-game-of-life-in-react>.

Cellular automata has an example called "Conway's game of life" in which you set simple rules for how pixels behave given some initial positions, which can make some interesting behaviour, Conway's game of life is one of the examples that is turing complete.

This package provides an `<AutomataGrid />` component from which you can:

- Set the initial pixels via coordinates.
- Set how fast the iterations happen.
- Set the size of the grid.
- Set the rules of how the pixels will behave.
- Set the style of the pixels or grid within.

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
    // Removing a group of pixels from state by passing in an array of coordinates.
    removeActivePixels: (pixel: Array<Pixel>) => void
) => void;
```

You use this callback as a prop within `<AutomataGrid />`.

Then use the data params to apply the setters to either kill or create more pixels.

You can use either the predefined utilities within the package or pass a callback and make your own rules, if they're interesting let me know and I'll add them to the presets :)

Example rule callback: No idea what it does just made it up.

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

1.0.9 allows you to set any css-in-js pixel styles for the pixel through passing in a appropriate style object such as the below:

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
.automata-grid-custom .grid-element {
    width: 10px !important;
    height: 10px !important;
    background: #e2e8f0 !important;
}

.automata-grid-custom .grid-element-alive {
    background: #38a169 !important;
}
```

with the prop:

```tsx
<AutomataGrid className="automata-grid-custom" />
```

## Example: Conway's game of life - Random Soup

Example: Random Soup - Generates a NxN randomised pixel distribution.

```tsx
import './App.css';
import {
    AutomataGrid,
    conwaysGameOfLifePreset,
    generateSoup,
} from 'cellular-automata-react';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <AutomataGrid
                    pixelsActive={generateSoup(4)}
                    iterationTimeInMs={1000}
                    size={4}
                    rules={conwaysGameOfLifePreset}
                />
            </header>
        </div>
    );
}

export default App;
```

## Example rule preset: Conway's game of life

```ts
import { Pixel } from '../store/usePixelStore';
import { nearbyAlivePixelsInState, nearbyDeadPixels } from './utils';

export const conwaysGameOfLifePreset = (
    pixel: Pixel,
    pixels: Pixel[],
    size: number,
    setPixelsActive: any,
    removeActivePixels: any
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

## Opportunities

-   Variants: <https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/modeling-natural-systems/gameOfLife2.html>.
-   Patterns to generate interesting behaviour: <https://conwaylife.com/wiki/>

---

https://www.npmjs.com/package/cellular-automata-react

## Planned

- [x] Customisable theme for grid. (1.0.8).
- [x] Customisable pixels. (1.0.9).
- [x] Set up rule presets within examples that are reusable and easy to contribute to. (1.1.0)
- [x] Reduce number of rerenders and race conditions within algorithm [1.1.3]
- [x] Npm optimisation [1.1.7]
- [x] Improved style handling [1.1.9] (STABLE)

## Contribute

Feel free to open PR's for presets or suggestions and I'll happily look over them.

Also if you make anything cool with this let me know and I'll feature it here.
