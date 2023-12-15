import { useState } from 'react';
import styles from './GDPRConsent.module.css';

interface AProps {
  modalInfoOpener: () => void;
}

const GDPRConsent = (props:AProps) => {
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
        We use local storage to enhance your experience. By continuing to visit this site you agree to our use of local storage. 
        Read the policy <span className='has-text-info' onClick={props.modalInfoOpener}>here</span>.
      </p>
      <button className='button is-info' onClick={accept}>Accept</button>
    </div>
  );
};

export default GDPRConsent;