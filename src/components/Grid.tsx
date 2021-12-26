import { GridRow } from './GridRow';
import '../styles/Grid.scss';
import { AutomataGridSizeProp } from '../modules/AutomataGrid';

interface ConwayGridProps {
    size: AutomataGridSizeProp;
    className?: string;
}

export function Grid({ size, className }: ConwayGridProps) {
    return (
        <div className={`grid-container ${className || ''}`}>
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
