import { fireEvent, render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import Footer from './Footer';

describe('Footer', () => {
  test('renders the text properly', () => {
    const mockModalInfoOpenHandler = jest.fn();

    const { container, getByText, getByRole } = render(
        <I18nextProvider i18n={i18n}>
            <Footer modalInfoOpenHandler={mockModalInfoOpenHandler} />
        </I18nextProvider>
    );
    
    expect(getByText('Created with React, TypeScript and Bulma, mail the author')).toBeInTheDocument();
    expect(getByText('Privacy Policy')).toBeInTheDocument();

    const linkElement = getByRole('link');
    expect(linkElement).toHaveAttribute('href', 'mailto:szupa@o2.pl');

    const policyButton = container.querySelector('.policy');
    fireEvent.click(policyButton);
    expect(mockModalInfoOpenHandler).toHaveBeenCalledTimes(1);
  });
});