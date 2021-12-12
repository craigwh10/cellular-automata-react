// components/Pixel/index.tsx
import React from 'react';
import cn from 'classnames';
import { usePixelStore } from '../store/usePixelStore';

interface PixelProps {
    xValue: number
    yValue: number
}

export const Pixel = ({xValue, yValue}: PixelProps) => {
  const isAlive = usePixelStore(state => state.pixelIsActive(xValue, yValue));

  const className = cn('grid-element', {'grid-element-alive': isAlive});

  return (
    <div className={className} />
  )
}