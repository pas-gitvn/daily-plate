import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './GDPRConsent.module.css';

interface AProps {
  modalInfoOpener: () => void;
}

const GDPRConsent = (props:AProps) => {
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState(localStorage.getItem('gdpr:accepted'));

  const accept = () => {
    localStorage.setItem('gdpr:accepted', 'true');
    setAccepted('true');
  };

  if (accepted === 'true') {
    return null;
  }

  return (
    <div className={styles.gdpr}>
      <p>
      {t('info.gdpr')} <span className='has-text-info' onClick={props.modalInfoOpener}>{t('info.here')}</span>.
      </p>
      <button className='button is-info' onClick={accept}>Accept</button>
    </div>
  );
};

export default GDPRConsent;