import { render } from '@testing-library/react';

import { GridRow } from "../../components/GridRow"

const pixelAtPosition = (x: number, y: number) => `pixel-x${x}-y${y}`;

jest.mock('../../components/Pixel', () => ({
    Pixel: (props: any) => {
        return <div data-testid={pixelAtPosition(props.xValue, props.yValue)} />;
    }
}));

describe('GridRow - Unit', () => {
    it('should render no pixel if x width size is 0', () => {
        const { queryByTestId } = render(
            <GridRow size={{xWidth: 0, yWidth: 1}} yValue={1 }/>
        )

        expect(queryByTestId(pixelAtPosition(0, 1))).toBeNull();
    })
    it('should render 1 pixel with x value 0 if x width is 1', () => {
        const { getByTestId } = render(
            <GridRow size={{xWidth: 1, yWidth: 1}} yValue={1}/>
        )

        getByTestId(pixelAtPosition(0, 1));
    })
    it('should render 2 pixels with x values 0 and 1 if x width size is 2', () => {
        const { getByTestId } = render(
            <GridRow size={{xWidth: 2, yWidth: 1}} yValue={1 }/>
        )

        getByTestId(pixelAtPosition(0, 1));
        getByTestId(pixelAtPosition(1, 1));
    })
})