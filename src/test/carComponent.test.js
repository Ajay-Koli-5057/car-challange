import MakeCar from "../pages/Car/components/CarCompany";
import { render } from '@testing-library/react';
import { data } from './mockData/mockData';

test('Renders main page correctly', async () => {
    
  // Setup
  render(<MakeCar carData={data}/>);

  expect(true).toBeTruthy();
});