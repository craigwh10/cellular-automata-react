import { useEffect, useLayoutEffect, useState } from 'react';
import {Grid} from '../components/Grid';
import { Pixel, usePixelStore } from '../store/usePixelStore';

interface AutomataGridProps {
    rules: (
        pixel: Pixel,
        pixels: Array<Pixel>,
        size: number, setPixelsActive: (pixelsActive: Array<Pixel>) => void,
        removeActivePixel: (pixel: Pixel) => void
        ) => void,
    pixelsActive: Array<[number, number]>
    size: number,
    iterationTimeInMs: number
}

export function AutomataGrid ({rules, pixelsActive, size, iterationTimeInMs}: AutomataGridProps) {
    const setPixelsActive = usePixelStore(state => state.setPixelsActive);
    const checkRulesForActive = usePixelStore(state => state.checkRulesForActive);
    const [iterations, setIterations] = useState(0);
    // const {setPixelsActive, checkRulesForActive} = usePixelStore()
    useEffect(() => {
        setPixelsActive(pixelsActive);
    }, [])

    useLayoutEffect(() => {
        let timer: any;
        
        setTimeout(() => {
            timer = setInterval(() => {
                checkRulesForActive(rules, size);
                setIterations((prev) => prev + 1);
            }, iterationTimeInMs);
        }, iterationTimeInMs)

        return () => clearInterval(timer);
    }, [])

  if (size <= 0) {
    return <p>Provide a size greater than 0.</p>
  }

  if (iterationTimeInMs <= 0 || iterationTimeInMs < 200) {
    return <p>Do you want your browser to crash? - try set iteration time higher</p>
  }

  return (
      <>
        <p>{iterations}</p>
        <Grid size={size} />
      </>
  )
}