import { useTranslation } from 'react-i18next';

interface Aprops {  
  modalInfoOpenHandler: () => void;  
}

const Footer = (props:Aprops) => {
  const { t } = useTranslation();

  return (
    <footer className='footer'>
      <p>
        {t('info.created')} <a href="mailto:szupa@o2.pl">{t('info.here')}</a>
      </p>
      <span className='has-text-link policy anchor-type' onClick={props.modalInfoOpenHandler}>
        {t('info.policy')}
      </span>
    </footer>
  )
}

export default Footer;