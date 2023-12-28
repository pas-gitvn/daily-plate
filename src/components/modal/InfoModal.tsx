import { useTranslation } from 'react-i18next';

interface Aprops {
  isVisible: boolean;  
  close: () => void;  
}

const InfoModal = (props:Aprops) => {
  const { t } = useTranslation();
  const isVisible = props.isVisible;
  
  return (
    <div id="modal" className={`modal ${isVisible ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={props.close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <h2 className="modal-card-title">Privacy Policy</h2>
          <button className="delete" aria-label="close" onClick={props.close}></button>
        </header>
        <section className="modal-card-body">                  
          <h3 className='is-size-5'>{t('info.localstorage.title')}</h3>
          <p className='my-2'>{t('info.localstorage.lineone')}</p>
          <p className='my-2'>{t('info.localstorage.linetwo')}</p>
          <h3 className='mt-5 is-size-5'>{t('info.localstorage.whatis')}</h3>
          <p className='my-2'>{t('info.localstorage.info')}</p>
          <h3 className='mt-5 is-size-5'>{t('info.cookies.title')}</h3>
          <p className='my-2'>{t('info.cookies.lineone')}</p>
          <h3 className='mt-5 is-size-5'>{t('info.cookies.whatis')}</h3>
          <p className='my-2'>{t('info.cookies.info')}</p>          
          <h3 className='mt-5 is-size-5'>{t('info.data.title')}</h3>
          <p className='my-2'>{t('info.data.info')}</p>          
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={props.close}>Close</button>          
        </footer>
      </div>   
    </div>
  );  
}

export default InfoModal;