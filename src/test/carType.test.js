import CarType from "../pages/Car/components/CarType";
import React from 'react';
import { data } from './mockData/mockData';
import { render } from '@testing-library/react';

test('Renders main page correctly', async () => {

    // Setup
    render(<CarType carData={data} />);

    expect(true).toBeTruthy();
});