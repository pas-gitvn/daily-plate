import { useTranslation } from 'react-i18next';

import styles from './GDPRConsent.module.css';

interface AProps {
  modalInfoOpener: () => void;
  accept: () => void;
}

const GDPRConsent = (props:AProps) => {
  const { t } = useTranslation();
  const accepted = localStorage.getItem('gdpr:accepted');

  if (accepted === 'true') {
    return null;
  }

  return (
    <div className={styles.gdpr}>
      <p>
      {t('info.gdpr')} <span className='anchor-type has-text-info' onClick={props.modalInfoOpener}>{t('info.here')}</span>.
      </p>
      <button className='button is-info' onClick={props.accept}>Accept</button>
    </div>
  );
};

export default GDPRConsent;