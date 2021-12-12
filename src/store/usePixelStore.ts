import create from 'zustand'

export type Pixel = [number, number];

type PixelStore = {
    pixelsActive: Array<Pixel>
    pixelIsActive: (x: number, y: number) => boolean
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