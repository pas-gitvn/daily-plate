import { useState } from 'react';
import Time from '../datetime/Time';
// import Quote from '../quotes/Quote';
import { useTranslation } from 'react-i18next';

interface Aprops {
  modalOpenHandler: () => void;
  children: JSX.Element;
}

const Header = (props:Aprops) => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toogleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    setIsDarkMode(!isDarkMode);
  }

  return (
    <section className="plate__header section">
      <h1 className="title is-1">{t('plate.title')}</h1>
      <p className="subtitle">{t('plate.subtitle')}</p>
      {props.children}
      <button className="button is-primary" onClick={props.modalOpenHandler}>{t('ticket.create')}</button>
      <button className="button toogle-dark" onClick={toogleDarkMode}>
        {isDarkMode ? t('lightmode') : t('darkmode')}
      </button>
      <Time />
      {/*<Quote />*/}
    </section>
  )
}

export default Header;
