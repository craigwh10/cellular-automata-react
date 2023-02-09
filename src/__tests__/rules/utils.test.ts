import { generateSoup, nearbyAlivePixelsInState } from "../../rules/utils"

describe('utils - Unit', () => {
    describe('generateSoup', () => {
        it('should generate a full array if fixed to all alive', () => {
            const mockRandom = jest.fn();
            Math.random = mockRandom;
            // all alive
            mockRandom.mockReturnValue(0.4);

            expect(generateSoup({
                xWidth: 2,
                yWidth: 2
            })).toEqual([
                expect.any(Array),
                expect.any(Array),
                expect.any(Array),
                expect.any(Array),
            ])
        })
        it('should generate a empty array if fixed to all alive', () => {
            const mockRandom = jest.fn();
            Math.random = mockRandom;
            // all dead
            mockRandom.mockReturnValue(0.6);

            expect(generateSoup({
                xWidth: 2,
                yWidth: 2
            })).toEqual([])
        })
    })
    describe('nearbyAlivePixelsInState', () => {
        it('should accurately say if there are pixels nearby to a pixel', () => {
            expect(
                nearbyAlivePixelsInState([1,0], {xWidth: 2, yWidth: 2}, [[1,0], [1,1]])
            ).toEqual([[1,1]]);
        })
        it('should accurately say if there are no pixels nearby to a pixel', () => {
            expect(
                nearbyAlivePixelsInState([1,0], {xWidth: 2, yWidth: 2}, [[1,0]])
            ).toEqual([]);
        })
    });
})