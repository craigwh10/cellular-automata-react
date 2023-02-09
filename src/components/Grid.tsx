import { GridRow } from './GridRow';
import { AutomataGridSizeProp } from '../modules/AutomataGrid';

interface ConwayGridProps {
    size: AutomataGridSizeProp;
    className?: string;
}

export function Grid({ size, className }: ConwayGridProps) {
    return (
        <div className={className && `${className}`} style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {[...Array(size.yWidth)].map((_, yValue) => (
                <GridRow
                    size={size}
                    yValue={yValue}
                    key={`ConwayGridRow-${size}-${yValue}`}
                />
            ))}
        </div>
    );
}
