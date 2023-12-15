import { render, screen } from '@testing-library/react';
import App from './App';

test('renders plate element', () => {
  const { container } = render(<App />);
  const plateElement = container.querySelector('.plate');
  
  expect(plateElement).toBeInTheDocument();
});

test('renders header section of the app', () => {
  const { container } = render(<App />);
  const headerSection = container.querySelector('.plate__header.section');
  
  expect(headerSection).toBeInTheDocument();  
});

test('renders proper text in header section', () => {
  render(<App />);
  const topTitle = screen.getByText('The daily plate');
  
  expect(topTitle).toBeInTheDocument();
});
