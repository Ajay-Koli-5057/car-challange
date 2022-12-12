// import { render } from "@testing-library/react";
import CarModel from "../pages/Car/components/CarModel";
import { data } from './mockData/mockData';
import { render } from '@testing-library/react';


test('Renders main page correctly', async () => {

    // Setup
    render(<CarModel carData={data} />);

    expect(true).toBeTruthy();
});