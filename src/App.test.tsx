import { render } from '@testing-library/react';
import App from './App';

describe('Plate main app', () => {
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

  test('renders columns section', () => {
    const { container } = render(<App />);
    const columns = container.querySelector('.columns');
    
    expect(columns).toBeInTheDocument(); 
  });

  test('renders footer footer', () => {
    const { container } = render(<App />);
    const footer = container.querySelector('.footer');

    expect(footer).toBeInTheDocument();
  })
});