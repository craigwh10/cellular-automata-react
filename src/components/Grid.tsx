import { GridRow } from './GridRow';
import { AutomataGridSizeProp } from '../modules/AutomataGrid';
import { PixelStyles } from '../store/usePixelStore';

interface ConwayGridProps {
    size: AutomataGridSizeProp;
    className?: string;
    pixelStyles: PixelStyles;
}

export function Grid({ size, className, pixelStyles }: ConwayGridProps) {
    return (
        <div className={className && `${className}`} style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {[...Array(size.yWidth)].map((_, yValue) => (
                <GridRow
                    pixelStyles={pixelStyles}
                    size={size}
                    yValue={yValue}
                    key={`ConwayGridRow-${size}-${yValue}`}
                />
            ))}
        </div>
    );
}
