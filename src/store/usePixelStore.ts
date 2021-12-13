import create from 'zustand'

export type Pixel = [number, number];

export type PixelStyles = {
    inactiveColor?: string, 
    activeColor?: string,
} & React.CSSProperties

type PixelStore = {
    pixelsActive: Array<Pixel>,
    pixelStyles: PixelStyles,
    pixelIsActive: (x: number, y: number) => boolean
    setPixelStyles: (pixelStyles: PixelStyles) => void,
    setPixelsActive: (pixelsActive: Array<Pixel>) => void
    removeActivePixel: (pixel: Pixel) => void
    checkRulesForActive: (rules: (
        pixel: Pixel,
        pixels: Array<Pixel>,
        size: number,
        setPixelsActive: (pixelsActive: Array<Pixel>) => void,
        removeActivePixel: (pixel: Pixel) => void
    ) => void, size: number) => void
}


export const usePixelStore = create<PixelStore>((set, get) => ({
    pixelsActive: [],
    pixelStyles: {
        inactiveColor: 'red',
        activeColor: 'green',
        width: 50,
        height: 50
    },
    setPixelStyles: (states: PixelStyles) => states,
    pixelIsActive: (x, y) => {
      const pixels = get().pixelsActive;
      return pixels.some((pixel) => JSON.stringify(pixel) === `[${x},${y}]`);
    },
    setPixelsActive: (pixelsActive) => set(state => ({ pixelsActive: [...state.pixelsActive, ...pixelsActive] })),
    removeActivePixel: (pixel) => set(state => ({pixelsActive: state.pixelsActive.filter((pixelFromActive) => {
      return JSON.stringify(pixelFromActive) !== JSON.stringify(pixel);
    })})),
    checkRulesForActive: (rules, size) => {
      const pixels = get().pixelsActive; // get active pixels
      const setPixelsActive = get().setPixelsActive;
      const removeActivePixel = get().removeActivePixel;

      pixels.forEach((pixel) => {
        rules(pixel, pixels, size, setPixelsActive, removeActivePixel);
      })
    },
}))