import React from 'react';
import {Grid} from '../components/Grid';
import { Pixel } from '../store/usePixelStore';


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
    // const setPixelsActive = usePixelStore(state => state.setPixelsActive);
    // const checkRulesForActive = usePixelStore(state => state.checkRulesForActive);
    // const {setPixelsActive, checkRulesForActive} = usePixelStore()

    console.log(rules, pixelsActive);
//   useEffect(() => {
//     setPixelsActive(pixelsActive);

//     const timer = setInterval(() => {
//         checkRulesForActive(rules, size);
//     }, iterationTimeInMs);
//       return () => clearInterval(timer);
//   }, [])

  if (size <= 0) {
    return <p>Provide a size greater than 0.</p>
  }

  if (iterationTimeInMs <= 0 || iterationTimeInMs < 200) {
    return <p>Do you want your browser to crash? - try set iteration time higher</p>
  }

  return (
      <Grid size={size} />
  )
}