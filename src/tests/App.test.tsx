import { render, screen } from '@testing-library/react';
import App from '../App';

test('Check main title on the page', () => {
  render(<App />);
  const linkElement = screen.getByText(/starwars heroes/i);
  expect(linkElement).toBeInTheDocument();
});
