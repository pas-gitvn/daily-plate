import { useState, useEffect } from 'react';
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
  const [tickets, setTickets] = useState<Tickets>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditingTicket, setIsEditingTicket] = useState<boolean>(false);
  const [editingTicketId, setEditingTicketId] = useState<number>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const modalOpenHandler = () => {
    setIsEditingTicket(false);
    setIsModalVisible(true);
  };

  const modalCloseHandler = () => {
    setIsModalVisible(false);
  };

  const modalSaveAndCloseHandler = (title:string | undefined, content:string | undefined) => {
    setIsModalVisible(false);
    if (isEditingTicket) {
      const updatedTickets = tickets.map((ticket) => {
        if (ticket.id === editingTicketId) {        
          let newTicket = {
            ...ticket,
            title: title,
            content: content,
          };
          return newTicket;
        }
        return ticket;
      });
      setTickets(updatedTickets);
    } else {
      const nextId = tickets.length + 1;
      setTickets(prev => [...prev, {
        id: nextId,
        columnId: 1,
        title: title,
        content: content,
      }]);   
    }    
  };

  const updateTicketsColumnsIds = (ticketId:number, columnId:number) => {      
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId && !!columnId !== false) {        
        let newTicket = {
          ...ticket,
          columnId: columnId,
        };
        return newTicket;
      }
      return ticket;
    });

    // issue of changeing column id and then child node is different while removing on drop
    setTickets(updatedTickets);
  };

  const onEditTicket = (ticketId:number) => {
    setIsModalVisible(true);
    setIsEditingTicket(true);
    setEditingTicketId(ticketId);    
  }; 

  useEffect(() => {    
    let value = null;     
    value = localStorage.getItem('plateTickets');      
      if(!value) {
        setIsLoading(false);
        return;
      };
            
      setTickets(JSON.parse(value));
      setIsLoading(false);      
  }, []);

  useEffect(() => {    
    if(!isLoading) {            
      localStorage.setItem('plateTickets', JSON.stringify(tickets)); 
    }
  }, [isLoading, tickets]);

  return (
    <div className="plate">
      <section className="plate__header section">
        <h1 className="title is-1">The daily plate</h1>
        <p className="subtitle">Hey, this is your plate for your daily tasks. Organize your work, be productive, and have fun.</p>
        <button className="button is-primary" onClick={modalOpenHandler}>Create a new ticket</button>         
      </section>          
      <Grid tickets={tickets} updateColumns={updateTicketsColumnsIds} onEditTicket={onEditTicket}/>      
      <footer className='footer'>Created in 2023, visit the author page <a href="#">here</a></footer>
      <Modal isVisible={isModalVisible} close={modalCloseHandler} save={modalSaveAndCloseHandler} isEditing={isEditingTicket}/>
    </div>
  );
}

export default App;
