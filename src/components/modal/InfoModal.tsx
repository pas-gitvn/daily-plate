
interface Aprops {
  isVisible: boolean;  
  close: () => void;  
}

const InfoModal = (props:Aprops) => {
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
          <h3 className='is-size-5'>Local storage.</h3>
          <p className='my-2'>We use local storage to save tickets data, so they can be refered later by using the same
          browser as before.</p>
          <p className='my-2'>It means that by using the same browser a user will see saved tickets 
            and by using another browser they won't be visible as local storage is browser specific.</p>
          <h3 className='mt-5 is-size-5'>What is a local storage ?</h3>
          <p className='my-2'>          
            Local Storage is a method by which web pages locally store named key/value pairs inside 
            a client's web browser. 
            Similar to cookies, this stored data exists even when you close a browser tab, quit the browser, 
            or turn off the computer. 
            We use Local Storage, including but not limited to, to enhance your user experience 
            by storing tickets data. 
            Most browsers support Local Storage and allow you to disable this feature 
            and to delete stored data, but if you do so, you may not be able 
            to fully utilize all of the features of our services.
          </p>
          <h3 className='mt-5 is-size-5'>Cookies.</h3>
          <p className='my-2'>We don't use cookies to gather user data.</p>
          <h3 className='mt-5 is-size-5'>What is a cookie ?</h3>
          <p className='my-2'>
            A browser cookie, also known as an HTTP cookie or web cookie, is a small piece of data stored on the user's computer by the web browser while browsing a website.
          </p>          
          <h3 className='mt-5 is-size-5'>Data gathering</h3>
          <p className='my-2'>
            There is no data gathering on our website. We don't use any third party services to gather data.
            The only data we use is the one you provide by creating tickets and it is saved on your machine only by using local storage.
          </p>          
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={props.close}>Close</button>          
        </footer>
      </div>   
    </div>
  );  
}

export default InfoModal;