import { Pixel } from "../../components/Pixel";

import { render } from "@testing-library/react";
import { usePixelStore } from "../../store/usePixelStore";

jest.mock('../../store/usePixelStore');
const mockUsePixelStore = jest.mocked(usePixelStore);

const renderPixel = ({alive, styles}: {alive: boolean, styles: Object}) => {
    mockUsePixelStore
    .mockReturnValueOnce(alive)
    .mockReturnValueOnce({
        ...styles
    })

    return render(<Pixel xValue={1} yValue={1} />)
}

describe('Pixel Component - Unit', () => {
    describe('when alive', () => {

        it('should give alive classname and be green', () => {
            const { getByTestId, container } = renderPixel({
                alive: true,
                styles: {
                    activeColor: 'green',
                    inactiveColor: 'red'
                }
            });
    
            getByTestId('pixel-x1-y1');
            expect(container.firstChild).toHaveAttribute('class', 'automata-grid-element automata-grid-element-alive');
            expect(container.firstChild).toHaveStyle({
                backgroundColor: 'green'
            })
        })
    })
    describe('when dead', () => {
        it('should give default classname and be red', () => {
            const { getByTestId, container } = renderPixel({
                alive: false,
                styles: {
                    activeColor: 'green',
                    inactiveColor: 'red'
                }
            });
    
            getByTestId('pixel-x1-y1');
            expect(container.firstChild)
                .toHaveAttribute('class', 'automata-grid-element');
            expect(container.firstChild).toHaveStyle({
                backgroundColor: 'red'
            })
        });
    })


})