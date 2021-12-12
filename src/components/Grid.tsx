import {GridRow} from './GridRow';

interface ConwayGridProps {
    size: number
  }
  
export function Grid ({size}: ConwayGridProps) {
    return (
      <div className="grid-container">
        {[...Array(size)].map((_, yValue) => (
          <GridRow 
            size={size}
            yValue={yValue}
            key={`ConwayGridRow-${size}-${yValue}`}
          />
        ))}
      </div>
    )
}