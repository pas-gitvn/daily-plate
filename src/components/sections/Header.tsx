import Time from '../datetime/Time';
import Quote from '../quotes/Quote';
import { useTranslation } from 'react-i18next';

interface Aprops {  
  modalOpenHandler: () => void;  
}

const Header = (props:Aprops) => {
  const { t } = useTranslation();

  return (
    <section className="plate__header section">        
      <h1 className="title is-1">{t('plate.title')}</h1>
      <p className="subtitle">{t('plate.subtitle')}</p>
      <button className="button is-primary" onClick={props.modalOpenHandler}>{t('ticket.create')}</button>
      <Time />
      <Quote />
    </section>
  )
}

export default Header;