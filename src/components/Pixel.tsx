// components/Pixel/index.tsx
import cn from 'classnames';
import { usePixelStore } from '../store/usePixelStore';

interface PixelProps {
    xValue: number
    yValue: number
}

export function Pixel ({xValue, yValue}: PixelProps) {
  const isAlive = usePixelStore(state => state.pixelIsActive(xValue, yValue));

  const className = cn('grid-element', {'grid-element-alive': isAlive});

  return (
    <div className={className}>{`${isAlive ? '⚪': '⚫'}`}</div>
  )
}