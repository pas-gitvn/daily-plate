import styles from './Modal.module.css';

interface Aprops {
  isVisible: boolean;
  close: () => void;
  save: () => void;
}

const Modal = (props:Aprops) => {
  const isVisible = props.isVisible;
  // modal content
  // simple as that
  // ticket title
  // ticket description

  return (
    <div id="modal" className={`modal ${isVisible ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={props.close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create a ticket</p>
          <button className="delete" aria-label="close" onClick={props.close}></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" placeholder="Ticket title"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Content</label>
            <div className="control">
              <textarea className="textarea" placeholder="Ticket content"></textarea>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={props.save}>Create</button>
          <button className="button" onClick={props.close}>Cancel</button>
        </footer>
      </div>   
    </div>
  );  
}

export default Modal;