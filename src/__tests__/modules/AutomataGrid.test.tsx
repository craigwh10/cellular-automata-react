import { render, RenderResult } from "@testing-library/react";
import { AutomataGrid } from "../../modules/AutomataGrid";

import { usePixelStore } from '../../store/usePixelStore';
import { CommaSeperatedSize } from "../@types/general";

const generateGridTestId = (size: CommaSeperatedSize) => `grid-size${size}`;

jest.mock('../../components/Grid', () => ({
    Grid: (
            props: {className: string, size: {xPosition: number, yPosition: number}}
        ) => <div
        className={props.className}
        data-testid={
            generateGridTestId(
                Object.values(props.size).toString() as CommaSeperatedSize
            )}
        />
}))

jest.mock('../../store/usePixelStore');
const mockUsePixelStore = jest.mocked(usePixelStore);

describe('AutomataGrid - Unit', () => {
    const usePixelStoreMocks = {
        mockSetPixelsActive: jest.fn(),
        mockCheckRulesForActive: jest.fn(),
        mockClearPixelsActive: jest.fn(),
    }
    beforeEach(() => {
        mockUsePixelStore.mockReset();
        jest.useFakeTimers();
        Object.values(usePixelStoreMocks).forEach(
            mockUsePixelStore.mockReturnValueOnce
        );
    })

    describe('function calls', () => {
        let rulesMock = jest.fn();
        let renderResult: RenderResult;
        const pixelsActive = [[0,1]] as [number, number][];
        const pixelStyle = {
            background: 'red'
        }
        const size = {
            xWidth: 2,
            yWidth: 2
        }

        beforeEach(() => {
            rulesMock.mockReset();
            jest.useFakeTimers();
            renderResult = render(<AutomataGrid
                rules={rulesMock}
                pixelsActive={pixelsActive}
                size={size}
                pixelStyles={pixelStyle}
            />);
        })

        it('should initially call setting of active pixels', () => {
            renderResult.getByTestId(generateGridTestId('2,2'));
    
            expect(usePixelStoreMocks.mockSetPixelsActive).toBeCalledWith(pixelsActive);
        })

        it('should not run an iteration of timer after 0s', () => {
            renderResult.getByTestId(generateGridTestId('2,2'));
            expect(usePixelStoreMocks.mockCheckRulesForActive).not.toBeCalled();
        })

        it('should run an iteration of checking rules after a tick', () => {
            renderResult.getByTestId(generateGridTestId('2,2'));
            jest.advanceTimersByTime(2000);
            expect(usePixelStoreMocks.mockCheckRulesForActive).toBeCalledTimes(1);
            expect(usePixelStoreMocks.mockCheckRulesForActive).toBeCalledWith(rulesMock, size);
        })
    })

    describe('error cases', () => {
        const rulesMock = jest.fn();
        beforeEach(() => {
            rulesMock.mockReset();
        })

        it('should not allow sizes equal to 0', () => {
            const {getByText} = render(<AutomataGrid
                rules={rulesMock}
                pixelsActive={[[1,0]]}
                size={{
                    xWidth: 0,
                    yWidth: 0
                }}
            />);

            getByText('Automata Grid Error: Provide sizes greater than 0.');
        })

        it('should not allow iteration less than 200ms', () => {
            const {getByText} = render(<AutomataGrid
                rules={rulesMock}
                pixelsActive={[[1,0]]}
                size={{
                    xWidth: 1,
                    yWidth: 1
                }}
                iterationTimeInMs={199}
            />);

            getByText('Automata Grid Error: Iteration time too low, try greater than 200ms.');
        })

        it('should not allow iteration equal less than 0ms', () => {
            const {getByText} = render(<AutomataGrid
                rules={rulesMock}
                pixelsActive={[[1,0]]}
                size={{
                    xWidth: 1,
                    yWidth: 1
                }}
                iterationTimeInMs={-1}
            />);

            getByText('Automata Grid Error: Iteration time too low, try greater than 200ms.');
        })
    })
});