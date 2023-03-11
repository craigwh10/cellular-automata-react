// components/Pixel/index.tsx
import { PixelStyles, usePixelStore } from '../store/usePixelStore';

interface PixelProps {
    xValue: number;
    yValue: number;
    pixelStyles: PixelStyles;
}

export function Pixel({ xValue, yValue, pixelStyles }: PixelProps) {
    const isAlive = usePixelStore((state) =>
        state.pixelIsActive(xValue, yValue)
    );

    const className = `automata-grid-element${isAlive ? " automata-grid-element-alive" : ''}`

    const { activeColor = 'green', inactiveColor = 'red' } = pixelStyles;

    return (
        <div
            data-testid={`pixel-x${xValue}-y${yValue}`}
            className={className}
            style={{
                backgroundColor: isAlive ? activeColor : inactiveColor,
                ...pixelStyles,
            }}
        />
    );
}
