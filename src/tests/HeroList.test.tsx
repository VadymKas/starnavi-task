import { render, screen } from '@testing-library/react';
import HeroList from '../components/HeroList';

describe('HeroList', () => {
  test('Check if list of heros is rendered', () => {
    render(<HeroList />);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });  
});
