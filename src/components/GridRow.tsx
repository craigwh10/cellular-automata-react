import React from 'react';
import {Pixel} from './Pixel';

interface GridRowProps {
    size: number
    yValue: number
    key: string
  }
  
  
export const GridRow = ({size, yValue, key}: GridRowProps) => {
    return (
        <div className="grid-row" key={key}>
            {
                [...Array(size)].map((_, xValue) => (
                <Pixel 
                    yValue={yValue} 
                    xValue={xValue}
                    key={`${key}-${size}-${xValue}-${yValue}`} 
                />
                ))
            }
        </div>
    )
}