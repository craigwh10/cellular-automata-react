import create from 'zustand';
import { AutomataGridSizeProp } from '../modules/AutomataGrid';
import {
    groupAndRemoveDuplicatesOfNestedPixelArray,
    stringifiedArrayOfArrays,
} from '../rules/utils';

export type Pixel = [number, number];

export type PixelStyles = Omit<{
    inactiveColor?: string;
    activeColor?: string;
} & React.CSSProperties, 'backgroundColor'>;

type PixelStore = {
    pixelsActive: Array<Pixel>;
    pixelStyles: PixelStyles;
    pixelIsActive: (x: number, y: number) => boolean;
    setPixelStyles: (pixelStyles: PixelStyles) => void;
    setPixelsActive: (pixelsActive: Array<Pixel>) => void;
    removeActivePixels: (pixel: Array<Pixel>) => void;
    checkRulesForActive: (
        rules: (
            pixel: Pixel,
            pixels: Array<Pixel>,
            size: AutomataGridSizeProp,
            setPixelsActive: (pixelsActive: Array<Pixel>) => void,
            removeActivePixel: (pixel: Array<Pixel>) => void
        ) => void,
        size: AutomataGridSizeProp
    ) => void;
};

export const usePixelStore = create<PixelStore>((set, get) => ({
    pixelsActive: [],
    pixelStyles: {
        inactiveColor: 'red',
        activeColor: 'green',
        width: 50,
        height: 50,
    },
    setPixelStyles: (states: PixelStyles) => set((state) => ({pixelStyles: {...state.pixelStyles, ...states}})),
    pixelIsActive: (x, y) => {
        const pixels = get().pixelsActive;
        return pixels.some((pixel) => JSON.stringify(pixel) === `[${x},${y}]`);
    },
    setPixelsActive: (pixelsActive) =>
        set((state) => {
            return {
                pixelsActive: groupAndRemoveDuplicatesOfNestedPixelArray(
                    state.pixelsActive,
                    pixelsActive
                ),
            };
        }),
    removeActivePixels: (pixelsToDelete) =>
        set((state) => ({
            pixelsActive: state.pixelsActive.filter((pixelFromActive) => {
                return !stringifiedArrayOfArrays(pixelsToDelete).includes(
                    JSON.stringify(pixelFromActive)
                );
            }),
        })),
    checkRulesForActive: (rules, size) => {
        let pixelsToAdd: Pixel[] = [];
        let pixelsToDelete: Pixel[] = [];

        const pixels = get().pixelsActive; // get active pixels
        const setPixelsActive = get().setPixelsActive;
        const removeActivePixels = get().removeActivePixels;

        pixels.forEach((pixel) => {
            rules(
                pixel,
                pixels,
                size,
                (newPixels) => {
                    pixelsToAdd = groupAndRemoveDuplicatesOfNestedPixelArray(
                        pixelsToAdd,
                        newPixels
                    );
                },
                (pixelsToRemove) => {
                    pixelsToDelete = groupAndRemoveDuplicatesOfNestedPixelArray(
                        pixelsToDelete,
                        pixelsToRemove
                    );
                }
            );
        });

        setPixelsActive(pixelsToAdd);
        removeActivePixels(pixelsToDelete);
    },
}));
