import { useEffect, useLayoutEffect } from 'react';
import { Grid } from '../components/Grid';
import { Pixel, PixelStyles, usePixelStore } from '../store/usePixelStore';

export interface AutomataGridSizeProp {
    xWidth: number,
    yWidth: number
}

interface AutomataGridProps {
    rules: (
        // All pixels that will be iterated on [x,y].
        pixel: Pixel,
        // The current state of the board [[x1,y1], [x2,y2], ...]
        pixels: Array<Pixel>,
        // The size of the board {size} x {size}.
        size: AutomataGridSizeProp,
        // Add an array of pixels or just one that should be made active
        setPixelsActive: (pixelsActive: Array<Pixel>) => void,
        // Remove a single pixel by [x,y] if it is active.
        removeActivePixels: (pixel: Array<Pixel>) => void
    ) => void;
    pixelsActive: Array<[number, number]>;
    size: AutomataGridSizeProp;
    iterationTimeInMs: number;
    className?: string;
    pixelStyles?: PixelStyles;
}

export function AutomataGrid({
    rules,
    pixelsActive,
    size,
    iterationTimeInMs,
    className,
    pixelStyles,
}: AutomataGridProps) {
    const setPixelsActive = usePixelStore((state) => state.setPixelsActive);
    const checkRulesForActive = usePixelStore(
        (state) => state.checkRulesForActive
    );
    const setPixelStyles = usePixelStore((state) => state.setPixelStyles);

    useEffect(() => {
        setPixelsActive(pixelsActive);
        if (pixelStyles) {
            setPixelStyles(pixelStyles);
        }
    }, []);

    useLayoutEffect(() => {
        let timer: ReturnType<typeof setInterval>;

        setTimeout(() => {
            timer = setInterval(() => {
                checkRulesForActive(rules, size);
            }, iterationTimeInMs);
        }, iterationTimeInMs);

        return () => clearInterval(timer);
    }, []);

    if (size.xWidth <= 0 && size.yWidth) {
        return <p>Error: Provide a size greater than 0.</p>;
    }

    if (iterationTimeInMs <= 0 || iterationTimeInMs < 200) {
        return (
            <p>
                Error: Iteration time too low, try greater than 200ms.
            </p>
        );
    }

    return <Grid size={size} className={className} />;
}
