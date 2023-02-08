import { render } from '@testing-library/react';

import { Grid } from "../../components/Grid";

type commaSeperatedSize = `${number},${number}`;
const rowAtYPositionAndSize = (y: number, size: commaSeperatedSize) => `row-y${y}-size${size}`;

jest.mock('../../components/GridRow', () => ({
    GridRow: (props: {yValue: number, size: {xValue: number, yValue: number}}) => {
        return <div data-testid={rowAtYPositionAndSize(props.yValue, Object.values(props.size).toString() as commaSeperatedSize )} />;
    }
}));

const gridSize = (x: number, y: number) => ({xWidth: x, yWidth: y});

describe('Grid - Unit', () => {
    it('should render no row if y width size is 0', () => {
        const size = gridSize(0,0);
        const { queryByTestId } = render(
            <Grid size={size} />
        )

        expect(queryByTestId(rowAtYPositionAndSize(0, '0,1'))).toBeNull();
    })
    it('should render 1 row with x value 0 if x width is 1', () => {
        const size = gridSize(1,1);
        const { getByTestId } = render(
            <Grid size={size} />
        )

        getByTestId(rowAtYPositionAndSize(0, '1,1'));
    })
    it('should render 2 rows with x values 0 and 1 if x width size is 2', () => {
        const size = gridSize(2,2);
        const { getByTestId } = render(
            <Grid size={size} />
        )

        getByTestId(rowAtYPositionAndSize(0, '2,2'));
        getByTestId(rowAtYPositionAndSize(1, '2,2'));
    })
})