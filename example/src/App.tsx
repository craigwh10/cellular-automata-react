import React from 'react';
import './App.css';
import {AutomataGrid} from 'cellular-automata-react';

type Pixel = [number, number];

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
