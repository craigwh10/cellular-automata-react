import type { Pixel } from '../store/usePixelStore';

export const movementCombinations: Array<[number, number]> = [
    [-1, 1],
    [0, 1],
    [1, 1],
    [-1, 0],
    /*X0Y0 */ [1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
];

export const isValidPixel = (pixel: undefined | Pixel) =>
    typeof pixel !== 'undefined';

export const pixelsNearby = (pixelToCheck: Pixel, size: number) => {
    // Map over these combinations and generate neighbors if in bounds.

    return movementCombinations
        .map((movements) => {
            // XXX | is our space,
            // XCX | we want to get the coordinates of all the X's
            // XXX | and not to include them if any values greater than {size}.
            const newPosition: Pixel = [
                pixelToCheck[0] + movements[0],
                pixelToCheck[1] + movements[1],
            ];

            if (!newPosition.some((coordinate) => coordinate > size)) {
                return newPosition;
            } else {
                return undefined;
            }
        })
        .filter(isValidPixel) as Array<Pixel>;
    // To get rid of typescript bug not inferring properly.
    // We've guarenteed it isn't undefined.
};

export const nearbyAlivePixelsInState = (
    pixelToCheck: Pixel,
    size: number,
    pixels: Pixel[]
) => {
    const pixelsNearbyArray = pixelsNearby(pixelToCheck, size);

    return pixelsNearbyArray.filter((pixel) => {
        if (!pixel) return;
        return JSON.stringify(pixels).includes(JSON.stringify(pixel));
    });
};

export const nearbyDeadPixels = (
    pixel: Pixel,
    size: number,
    pixels: Pixel[]
) => {
    const pixelsNearbyArray = pixelsNearby(pixel, size);

    return pixelsNearbyArray.filter((pixel) => {
        return !JSON.stringify(pixels).includes(JSON.stringify(pixel));
    });
};

export const generateSoup = (size: number) => {
    let activePixels: [number, number][] = [];

    for (let idx1 = 0; idx1 < size; idx1++) {
        for (let idx2 = 0; idx2 < size; idx2++) {
            if (Math.random() <= 0.5) {
                activePixels.push([idx1, idx2]);
            }
        }
    }

    return activePixels;
};

export const stringifiedArrayOfArrays = <T>(
    arrayOfArrays: Array<T>
): Array<string> => {
    return arrayOfArrays.map((array) => {
        return JSON.stringify(array);
    });
};

export const groupAndRemoveDuplicatesOfNestedPixelArray = (
    initialArray: Array<Pixel>,
    secondArray: Array<Pixel>
): Array<Pixel> => {
    const arrayOfStringifiedArrays = stringifiedArrayOfArrays([
        ...initialArray,
        ...secondArray,
    ]);

    const noDuplicateArrayOfArray = [...new Set(arrayOfStringifiedArrays)];

    const newArrayOfArray = noDuplicateArrayOfArray.map((stringArray) => {
        return JSON.parse(stringArray) as Pixel;
    });

    return newArrayOfArray;
};
