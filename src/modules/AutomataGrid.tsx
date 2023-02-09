import { useEffect } from 'react';
import { Grid } from '../components/Grid';
import { Pixel, PixelStyles, usePixelStore } from '../store/usePixelStore';
import { useIsomorphicLayoutEffect } from '../utils/useIsomorphicEffect';

export interface AutomataGridSizeProp {
    /**
     * The number of pixels in horizontal direction in grid.
     */
    xWidth: number;
    /**
     * The number of pixels in vertical direction in grid.
     */
    yWidth: number;
}

interface AutomataGridProps {
    /**
     * A callback which gets called on each item in the grid.
     * @example
     * import { AutomataGrid, conwaysGameOfLifePreset } from 'cellular-automata-react'
     * 
     * <AutomataGrid
     *   rules={conwaysGameOfLifePreset}
     * />
     */
    rules: (
        /**
         * All pixels that will be iterated on [x,y].
         */
        pixel: Pixel,
        /**
         * The current state of the board [[x1,y1], [x2,y2], ...]
         */
        pixels: Array<Pixel>,
        /**
         * The size of the board {size} x {size}.
         */
        size: AutomataGridSizeProp,
        /**
         * Add an array of pixels or just one that should be made active
         */
        setPixelsActive: (pixelsActive: Array<Pixel>) => void,
        /**
         * Remove a single pixel by [x,y] if it is active.
         */
        removeActivePixels: (pixel: Array<Pixel>) => void
    ) => void;     
    /**
     * Array of 2x1 coordinates which determines your initial state for the grid.
     * @example
     * <AutomataGrid
     *    pixelsActive={[[1,1]]}
     * />
     */
    pixelsActive: Array<[number, number]>;
    /**
     * Determines the size of the pixel grid.
     * @example
     * <AutomataGrid
     *   size={{
     *      xWidth: 4,
     *      yWidth: 4    
     *  }}
     * />
     */
    size: AutomataGridSizeProp;
    /**
     * Decides the cycle time to run your program (defaults to 1000ms/1second).
     * @example
     * <AutomataGrid
     *   iterationTimeInMs={1000}
     * />
     */
    iterationTimeInMs?: number;
    /**
     * Can help to create specific stylings for grid (optional).
     * @example
     * <AutomataGrid
     *   className="my-grid"
     * />
     * @example
     * .my-grid {
     *  border: 1px solid blue;
     * }
     */
    className?: string;
    /**
     * Can help to create specific stylings for pixels on grid (optional).
     * @example
     * <AutomataGrid
     *   pixelStyles={{
     *      activeColor: 'red',
     *      inactiveColor: 'purple'
     *  }}
     * />
     */
    pixelStyles?: PixelStyles;
}

export function AutomataGrid({
    rules,
    pixelsActive,
    size,
    iterationTimeInMs = 1000,
    className,
    pixelStyles,
}: AutomataGridProps) {
    const setPixelsActive = usePixelStore((state) => state.setPixelsActive);
    const checkRulesForActive = usePixelStore((state) => state.checkRulesForActive);
    const setPixelStyles = usePixelStore((state) => state.setPixelStyles);
    const clearPixelsActive = usePixelStore((state) => state.clearPixelsActive);

    useEffect(() => {
        setPixelsActive(pixelsActive);
        if (pixelStyles) {
            setPixelStyles(pixelStyles);
        }
        return () => clearPixelsActive();
    }, []);

    useIsomorphicLayoutEffect(() => {
        let timer: ReturnType<typeof setInterval>;

        setTimeout(() => {
            timer = setInterval(() => {
                checkRulesForActive(rules, size);
            }, iterationTimeInMs);
        }, iterationTimeInMs);

        return () => clearInterval(timer);
    }, []);

    if (size.xWidth <= 0 && size.yWidth <= 0) {
        return <p>Automata Grid Error: Provide sizes greater than 0.</p>;
    }

    if (iterationTimeInMs <= 0 || iterationTimeInMs < 200) {
        return <p>Automata Grid Error: Iteration time too low, try greater than 200ms.</p>;
    }

    return <Grid size={size} className={className} />;
}
