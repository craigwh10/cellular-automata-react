import { GridRow } from './GridRow';
import '../styles/Grid.scss';

interface ConwayGridProps {
    size: number;
    className?: string;
}

export function Grid({ size, className }: ConwayGridProps) {
    return (
        <div className={`grid-container ${className || ''}`}>
            {[...Array(size)].map((_, yValue) => (
                <GridRow
                    size={size}
                    yValue={yValue}
                    key={`ConwayGridRow-${size}-${yValue}`}
                />
            ))}
        </div>
    );
}
