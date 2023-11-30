import { useState } from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import Grid from './components/grid/Grid';
import Modal from './components/modal/Modal';

type Tickets = {
  id: number;
  columnId: number;
  title: string | undefined;
  content: string | undefined;
}[]

const App = () => {
  const [tickets, setTickets] = useState<Tickets>([
       { id: 1, columnId: 1, title: 'Create some tickets', content: 'This ticket is about creating some new work items.'},
       { id: 2, columnId: 1, title: 'Add ticket editing.', content: 'Make every ticket editable so the title and content can be updated.'},
       { id: 3, columnId: 2, title: 'I am a ticket.', content: 'simple content'},
       { id: 4, columnId: 3, title: 'I am a ticket.', content: 'simple content'},
       { id: 5, columnId: 4, title: 'I am a ticket.', content: 'simple content'}
     ]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const modalOpenHandler = () => {
    setIsModalVisible(true);
  };

  const modalCloseHandler = () => {
    setIsModalVisible(false);
  }

  const modalSaveAndCloseHandler = (title:string | undefined, content:string | undefined) => {
    setIsModalVisible(false);
    const nextId = tickets.length + 1;
    setTickets(prev => [...prev, {
      id: nextId,
      columnId: 1,
      title: title,
      content: content,
    }]);

  }

  return (
    <div className="plate">
      <section className="plate__header section">
        <h1 className="title is-1">The daily plate</h1>
        <p className="subtitle">Hey, this is your plate for your daily tasks. Organize your work, be productive, and have fun.</p>
        <button className="button is-primary" onClick={modalOpenHandler}>Create a new ticket</button>         
      </section>          
      <Grid tickets={tickets}/>      
      <footer className='footer'>Created in 2023, visit the author page <a href="#">here</a></footer>
      <Modal isVisible={isModalVisible} close={modalCloseHandler} save={modalSaveAndCloseHandler}/>
    </div>
  );
}

export default App;
