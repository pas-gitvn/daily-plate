import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Modal.module.css';

interface Aprops {
  isVisible: boolean;
  isEditing: boolean;
  close: () => void;
  save: (title:string | undefined, content:string | undefined) => void;
  onDelete: () => void;
}

const Modal = (props:Aprops) => {
  const { t } = useTranslation();
  const isVisible = props.isVisible;
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    props.save(titleRef.current?.value, contentRef.current?.value);
  };

  const handleDelete = () => {
    props.onDelete();
  };

  return (
    <div id="modal" className={`modal ${isVisible ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={props.close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          {!props.isEditing && <p className="modal-card-title">{t('ticket.create')}</p>}
          {props.isEditing && <p className="modal-card-title">{t('ticket.edit')}</p>}
          <button className="delete" aria-label="close" onClick={props.close}></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">{t('title')}</label>
            <div className="control">
              <input className="input" ref={titleRef} type="text" placeholder={t('ticket.titleplaceholder')}/>
            </div>
          </div>
          <div className="field">
            <label className="label">{t('content')}</label>
            <div className="control">
              <textarea className="textarea" ref={contentRef} placeholder={t('ticket.contentplaceholder')}></textarea>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          {!props.isEditing && <button className="button is-primary" onClick={handleSave}>{t('create')}</button>}
          {props.isEditing && <button className="button is-primary" onClick={handleSave}>{t('save')}</button>}
          <button className="button" onClick={props.close}>{t('cancel')}</button>
          {props.isEditing && <button className={`button is-danger ${styles['delete-ticket']}`} onClick={handleDelete}>{t('ticket.delete')}</button>}
        </footer>
      </div>   
    </div>
  );  
}

export default Modal;