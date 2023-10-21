import { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import './App.css';
import Grid from './components/grid/Grid';
import Modal from './components/modal/Modal';

type Tickets = {
  id: number;
  columnId: number;
  title: string;
}[]

const App = () => {
  const todoMap:string = `  
    plate app
    this is gonna be a plate app with columns for your daily tasks
    *can also be named as daily, daily plate or something similar

    features/assumptions:
    - columns with drag drop / grid
    - creating cards, which can be moved
    - styling for cards
    - adding pomodoro timer    
    - displaying timers
    - worldtime clocks    
    - adding moods, happy, sleepy etc.
    - saving to local storage
    - sharing tasks in the future
    - add motivators, like quotes, colors etc.
    - add notes / canvas based
    - wordpress like notes
    - create some fancy graphics
    - as it is a daily app, think of comparing tasks to plates, dishes or food
    - hiding/showing columns settings e.g. having just two columns like doing and done for example
    
    - personal efficiency calculator / think of an algorithm
    - progress charts    

    - accounts in the future maybe ?
    - groups for sharing data after login, can send a link, save, upload json, 
    - keep data somewhere in a cloud ?    
    - free version with just daily tasks
    - free/full switcher (say you want to stay in free mode)
    - then in full mode login/create account and etc.
    - tasks uploader for free version / copy local storage ? save as a file with node.js ?
    - taxes if charging ? e.g. free version, and $7.99 version / per month

    requirements:
    - (done) tailwind or other lib for styling ? 
    - (done) add some kind of a nice font
    - tests with coverage (included)      

    quote of the day can be used with https://zenquotes.io/api/today from https://zenquotes.io/
  `;

  const [tickets, setTickets] = useState<Tickets>([
       { id: 1, columnId: 1, title: 'I\'m in a box. I am a ticket.'},
       { id: 2, columnId: 1, title: 'I\'m in a box. I am a ticket.'},
       { id: 3, columnId: 2, title: 'I\'m in a box. I am a ticket.'},
       { id: 4, columnId: 3, title: 'I\'m in a box. I am a ticket.'},
       { id: 5, columnId: 4, title: 'I\'m in a box. I am a ticket.'}
     ]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const modalOpenHandler = () => {
    setIsModalVisible(true);
  };

  const modalCloseHandler = () => {
    setIsModalVisible(false);
  }

  const modalCloseAndSaveHandler = () => {
    // save logic
    setIsModalVisible(false);
  }

  return (
    <div className="plate">
      <section className="plate__header section">
        <h1 className="title is-1">The daily plate</h1>
        <p className="subtitle">Hey, this is your plate for your daily tasks. Organize your work and have fun.</p>
        <button className="button is-primary" onClick={modalOpenHandler}>Create a new ticket</button>         
      </section>          
      <Grid tickets={tickets}/>      
      <Modal isVisible={isModalVisible} close={modalCloseHandler} save={modalCloseAndSaveHandler}/>
      <pre children={todoMap} />
    </div>
  );
}

export default App;
