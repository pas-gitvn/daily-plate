import styles from './Modal.module.css';

interface Aprops {
  isVisible: boolean;
  close: () => void;
  save: () => void;
}

const Modal = (props:Aprops) => {
  const isVisible = props.isVisible;

  return (
    <div id="modal" className={`modal ${isVisible ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={props.close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close" onClick={props.close}></button>
        </header>
        <section className="modal-card-body">
          content
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={props.save}>Save changes</button>
          <button className="button" onClick={props.close}>Cancel</button>
        </footer>
      </div>   
    </div>
  );  
}

export default Modal;