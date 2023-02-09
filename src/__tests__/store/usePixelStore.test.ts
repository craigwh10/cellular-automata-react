import { conwaysGameOfLifePreset } from "../../rules/conways"
import { pixelStoreInitialStates, usePixelStore } from "../../store/usePixelStore"

// https://docs.pmnd.rs/zustand/guides/typescript
describe('usePixelStore - Unit', () => {
    describe('actions', () => {
        beforeEach(() => {
            usePixelStore.setState(pixelStoreInitialStates)
        })

        it('should have initial state', () => {
            const initialState = usePixelStore.getState();

            expect(initialState).toMatchObject({
                    ...pixelStoreInitialStates,
                    setPixelStyles: expect.any(Function),
                    pixelIsActive: expect.any(Function),
                    setPixelsActive: expect.any(Function),
                    removeActivePixels: expect.any(Function),
                    checkRulesForActive: expect.any(Function),
                    clearPixelsActive: expect.any(Function),
            });  
        })
        it('setPixelStyles should modify pixelStyle state', () => {
            const state = usePixelStore.getState();

            state.setPixelStyles({
                width: 51
            });

            expect(usePixelStore.getState().pixelStyles).toMatchObject(
                {
                        ...pixelStoreInitialStates.pixelStyles,
                        width: 51,
                }
            )
        });

        it('should successfully check a previously made active pixel as active', () => {
            const state = usePixelStore.getState();

            state.setPixelsActive([[1,0]]);

            expect(usePixelStore.getState().pixelsActive).toEqual(
                [[1,0]]
            );

            expect(state.pixelIsActive(1,0)).toEqual(true);
        })

        it('should remove a previously made active pixel as inactive and not show as active', () => {
            const state = usePixelStore.getState();

            state.setPixelsActive([[1,0]]);

            expect(usePixelStore.getState().pixelsActive).toEqual(
                [[1,0]]
            );

            expect(state.pixelIsActive(1,0)).toEqual(true);

            state.removeActivePixels([[1,0]]);

            expect(state.pixelIsActive(1,0)).toEqual(false);
        });

        it('should get expected result running conway ruleset on a single pixel', () => {
            const state = usePixelStore.getState();

            state.setPixelsActive([[1,0]]);

            expect(usePixelStore.getState().pixelsActive).toEqual(
                [[1,0]]
            );

            expect(state.pixelIsActive(1,0)).toEqual(true);

            state.checkRulesForActive(conwaysGameOfLifePreset, {xWidth: 2, yWidth: 2});

            expect(state.pixelIsActive(1,0)).toEqual(false);
        });

        it('should get expected result running conway ruleset on a group of pixels', () => {
            const state = usePixelStore.getState();

            // 2 next to each other produces 1 more
            state.setPixelsActive([[0,0], [0,1], [1,0]]);

            expect(usePixelStore.getState().pixelsActive).toEqual(
                [[0,0], [0,1], [1,0]]
            );

            state.checkRulesForActive(conwaysGameOfLifePreset, {xWidth: 2, yWidth: 2});

            expect(usePixelStore.getState().pixelsActive).toEqual(
                [[0,0], [0,1], [1,0], [1,1]]
            );
        });

        it('should be able to clear all active pixels after being set', () => {
            const state = usePixelStore.getState();

            state.setPixelsActive([[1,0], [2,0]]);

            expect(usePixelStore.getState().pixelsActive).toEqual(
                [[1,0], [2,0]]
            );

            state.clearPixelsActive();

            expect(usePixelStore.getState().pixelsActive).toEqual(
                []
            );  
        })
    })
})