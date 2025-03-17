import { fireEvent, render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';import Header from './Header';

describe('Header', () => {
  test('renders the text properly even when mode selector is clicked', () => {
    const { container, getByText, queryByText } = render(
        <I18nextProvider i18n={i18n}>
            <Header />
        </I18nextProvider>
    );
    
    expect(getByText('The daily plate')).toBeInTheDocument();
    expect(getByText('Hey, this is your plate for your daily tasks. Organize your work, be productive, and have fun.')).toBeInTheDocument();
    expect(getByText('Create a new ticket')).toBeInTheDocument();
    expect(getByText('Switch to dark mode')).toBeInTheDocument();
    expect(queryByText('Switch to light mode')).not.toBeInTheDocument();

    const toggleButton = container.querySelector('.toogle-dark');
    fireEvent.click(toggleButton);

    expect(queryByText('Switch to dark mode')).not.toBeInTheDocument();
    expect(getByText('Switch to light mode')).toBeInTheDocument();
  });
});