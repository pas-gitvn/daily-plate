import { useRef } from 'react';
import styles from './Modal.module.css';

interface Aprops {
  isVisible: boolean;
  isEditing: boolean;
  close: () => void;
  save: (title:string | undefined, content:string | undefined) => void;  
}

const Modal = (props:Aprops) => {
  const isVisible = props.isVisible;
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    props.save(titleRef.current?.value, contentRef.current?.value);
  };

  const handleDelete = () => {

  };

  return (
    <div id="modal" className={`modal ${isVisible ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={props.close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          {!props.isEditing && <p className="modal-card-title">Create a ticket</p>}
          {props.isEditing && <p className="modal-card-title">Edit ticket</p>}
          <button className="delete" aria-label="close" onClick={props.close}></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" ref={titleRef} type="text" placeholder="Ticket title"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Content</label>
            <div className="control">
              <textarea className="textarea" ref={contentRef} placeholder="Ticket content"></textarea>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          {!props.isEditing && <button className="button is-primary" onClick={handleSave}>Create</button>}
          {props.isEditing && <button className="button is-primary" onClick={handleSave}>Save</button>}
          <button className="button" onClick={props.close}>Cancel</button>
          {props.isEditing && <button className={`button is-danger ${styles['delete-ticket']}`} onClick={handleDelete}>Delete ticket</button>}
        </footer>
      </div>   
    </div>
  );  
}

export default Modal;