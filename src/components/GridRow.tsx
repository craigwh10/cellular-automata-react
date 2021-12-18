import { Pixel } from './Pixel';

interface GridRowProps {
    size: number;
    yValue: number;
}

export function GridRow({ size, yValue }: GridRowProps) {
    return (
        <div className="grid-row">
            {[...Array(size)].map((_, xValue) => (
                <Pixel
                    yValue={yValue}
                    xValue={xValue}
                    key={`${size}-${xValue}-${yValue}`}
                />
            ))}
        </div>
    );
}
