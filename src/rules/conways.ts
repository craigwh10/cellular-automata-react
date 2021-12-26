import { AutomataGridSizeProp } from '../modules/AutomataGrid';
import { Pixel } from '../store/usePixelStore';
import { nearbyAlivePixelsInState, nearbyDeadPixels } from './utils';

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
