// components/Pixel/index.tsx
import { usePixelStore } from '../store/usePixelStore';

interface PixelProps {
    xValue: number;
    yValue: number;
}

export function Pixel({ xValue, yValue }: PixelProps) {
    const isAlive = usePixelStore((state) =>
        state.pixelIsActive(xValue, yValue)
    );
    const pixelStyles = usePixelStore((state) => state.pixelStyles);

    const className = `grid-element${isAlive ? " grid-element-alive" : ''}`

    const { activeColor, inactiveColor } = pixelStyles;

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
