import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './App';

describe('Plate main app', () => {
  test('renders plate element', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );

    const plateElement = container.querySelector('.plate');
    
    expect(plateElement).toBeInTheDocument();
  });
  
  test('renders header section of the app', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );
    
    const headerSection = container.querySelector('.plate__header.section');
    
    expect(headerSection).toBeInTheDocument();  
  }); 

  test('renders columns section', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );    
    
    const columns = container.querySelector('.columns');
    
    expect(columns).toBeInTheDocument(); 
  });

  test('renders footer footer', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );
    
    const footer = container.querySelector('.footer');

    expect(footer).toBeInTheDocument();
  })
});