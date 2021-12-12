## What is this?

This is the result of a walkthrough I wrote on <http://craigwh.it/posts/conways-game-of-life-in-react>.

Cellular automata has an example called "Conway's game of life" in which you set simple rules for how pixels behave given some initial positions, which can make some interesting behaviour, conway's game of life is one of the examples that are turing complete.

This package provides an `<AutomataGrid />` component from which you can:

- Set the initial pixels via coordinates.
- Set how fast the iterations happen.
- Set the size of the grid.
- Set the rules of how the pixels will behave.

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
    // Removing a pixel from state by passing in the coordinate.
    removeActivePixel: (pixel: Pixel) => void
    ) => void,
}
```

You use this callback as a prop within `<AutomataGrid />`.

Then use the data params to apply the setters to either kill or create more pixels.

## Example: Conway's game of life - Beacon

Example: Beacon

From <https://conwaylife.com/wiki/Beacon>.

```tsx
<AutomataGrid
    pixelsActive={[
        [0,0], [0,1],
        [1,0], [1,1],
        [2,2], [2,3],
        [3,2], [3,3]
    ]}
    iterationTimeInMs={1000}
    size={4}
    rules={(pixel, pixels, size, setPixelsActive, removeActivePixel) => {
        // All the neighbors, so we can generate nearby.
        const movementCombinations: Array<[number, number]> = [
            [-1,   1], [0,   1], [1, 1],
            [-1,   0], /*X0Y0 */ [1, 0],
            [-1,  -1], [0,  -1], [1, -1]
        ];
    
        const isValidPixel = (pixel: undefined | Pixel) => typeof pixel !== 'undefined';    

        const pixelsNearby = (pixelToCheck: Pixel) => {
        // Map over these combinations and generate neighbors if in bounds.
        
        return movementCombinations.map((movements) => {
            // XXX | is our space,
            // XCX | we want to get the coordinates of all the X's
            // XXX | and not to include them if any values greater than {size}.
            const newPosition: Pixel = [pixelToCheck[0] + movements[0], pixelToCheck[1] + movements[1]];
    
            if (!newPosition.some(coordinate => coordinate > size)) {
                return newPosition;
            }
        }).filter(isValidPixel) as Array<Pixel>; 
        // To get rid of typescript bug not inferring properly.
        // We've guarenteed it isn't undefined.
        }
    
        // Return array of neighbors that are alive.
        const nearbyAlivePixelsInState = (pixelToCheck: Pixel) => {
        const pixelsNearbyArray = pixelsNearby(pixelToCheck);
    
        return pixelsNearbyArray.filter((pixel) => {
            if (!pixel) return;
            return JSON.stringify(pixels).includes(JSON.stringify(pixel));
        })
        }
    
        // Return alive neighbors for current pixel being checked in callback.
        const aliveNeighborPixels = nearbyAlivePixelsInState(pixel);
        const aliveNeighbors = aliveNeighborPixels.length;
    
        /**
         * DEAD CELL ACTION: 
         */
    
        // We need to only run if has any dead neighbors
        if (aliveNeighbors) {
        // Getting all of the pixels in the area around an alive pixel.
        const pixelsNearbyArray = pixelsNearby(pixel);
    
        // Get an array of the coordinates of the dead pixels around an alive pixel.
        const deadNeighbors = pixelsNearbyArray.filter((pixel) => {
            return !JSON.stringify(pixels).includes(JSON.stringify(pixel));
        });
    
        // From these dead pixels from neighborhood, return back the ones that have
        // 3 alive neighbors around them.
        const deadPixelsWith3AliveNeighbors = deadNeighbors.filter((deadPixel: Pixel) => {
            return nearbyAlivePixelsInState(deadPixel).length === 3;
        })
    
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
            removeActivePixel(pixel);
        }
    }}
/>
```

## Opportunities

- Variants: <https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/modeling-natural-systems/gameOfLife2.html>.
- Patterns to generate interesting behaviour: <https://conwaylife.com/wiki/>

---

https://www.npmjs.com/package/cellular-automata-react