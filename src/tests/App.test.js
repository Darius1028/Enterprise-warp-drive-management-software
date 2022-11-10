import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Enterprise Warp-drive management software/i);
  expect(linkElement).toBeInTheDocument();
});
