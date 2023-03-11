import { AutomataGridSizeProp } from '../modules/AutomataGrid';
import { PixelStyles } from '../store/usePixelStore';
import { Pixel } from './Pixel';

interface GridRowProps {
    size: AutomataGridSizeProp;
    yValue: number;
    pixelStyles: PixelStyles;
}

export function GridRow({ size, yValue, pixelStyles }: GridRowProps) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row"
        }}>
            {[...Array(size.xWidth)].map((_, xValue) => (
                <Pixel
                    yValue={yValue}
                    xValue={xValue}
                    key={`${size}-${xValue}-${yValue}`}
                    pixelStyles={pixelStyles}
                />
            ))}
        </div>
    );
}