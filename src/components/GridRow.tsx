import { AutomataGridSizeProp } from '../modules/AutomataGrid';
import { Pixel } from './Pixel';

interface GridRowProps {
    size: AutomataGridSizeProp;
    yValue: number;
}

export function GridRow({ size, yValue }: GridRowProps) {
    return (
        <div className="grid-row">
            {[...Array(size.xWidth)].map((_, xValue) => (
                <Pixel
                    yValue={yValue}
                    xValue={xValue}
                    key={`${size}-${xValue}-${yValue}`}
                />
            ))}
        </div>
    );
}
