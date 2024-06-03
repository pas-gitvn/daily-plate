import { useState, useEffect } from 'react';

import 'bulma/css/bulma.min.css';
import './App.scss';
import Grid from './components/grid/Grid';
import Modal from './components/modal/Modal';
import InfoModal from './components/modal/InfoModal';
import GDPRConsent from './components/policies/GDPRConsent';
import Header from './components/sections/Header';
import Footer from './components/sections/Footer';
import Stats from "./components/ticket/Stats";

type Tickets = {
  id: number;
  columnId: number;
  title: string | undefined;
  content: string | undefined;
}[]

const App = () => {
  console.log('App rendered...');

  const [tickets, setTickets] = useState<Tickets>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditingTicket, setIsEditingTicket] = useState<boolean>(false);
  const [editingTicketId, setEditingTicketId] = useState<number|null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState<boolean>(false);
  const [gdprAccepted, setIsGdprAccepted] = useState<boolean>(false);

  const modalOpenHandler = () => {
    setIsEditingTicket(false);
    setEditingTicketId(null);
    setIsModalVisible(true);
  };

  const modalCloseHandler = () => {
    setIsModalVisible(false);
  };

  const modalInfoOpenHandler = () => {
    setIsInfoModalVisible(true);
  }

  const modalInfoCloseHandler = () => {
    setIsInfoModalVisible(false);
  };

  const modalSaveAndCloseHandler = (title:string | undefined, content:string | undefined) => {
    setIsModalVisible(false);
    if (isEditingTicket) {
      const updatedTickets = tickets.map((ticket) => {
        if (ticket.id === editingTicketId) {
          return {
            ...ticket,
            title: title,
            content: content,
          }
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
      if (ticket.id === ticketId && !!columnId) {
        return {
          ...ticket,
          columnId: columnId,
        }
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

  const onDeleteTicket = () => {
    setIsEditingTicket(false);
    setIsModalVisible(false);
    const updatedTickets = tickets.filter((ticket) => {
      return ticket.id !== editingTicketId;
    });
    setTickets(updatedTickets);
  }

  const ticketStat = (columnId:number) => {
    const filteredTickets = tickets.filter((ticket) => {
      return ticket.columnId === columnId;
    })
    return filteredTickets.length || 0;
  }

  useEffect(() => {
    let value;
    let gdprAccepted = !!localStorage.getItem('gdpr:accepted');
    setIsGdprAccepted(gdprAccepted);

    value = localStorage.getItem('plateTickets');
      if(!value) {
        setIsLoading(false);
        return;
      }

      setTickets(JSON.parse(value));
      setIsLoading(false);
  }, []);

  useEffect(() => {
    if(!isLoading && gdprAccepted) {
      localStorage.setItem('plateTickets', JSON.stringify(tickets));
    }
  }, [isLoading, tickets, gdprAccepted]);

  return (
    <div className="plate">
      <Header modalOpenHandler={modalOpenHandler}>
        <Stats ticketStat={ticketStat} ticketsLength={tickets.length}/>
      </Header>
      <Grid tickets={tickets} updateColumns={updateTicketsColumnsIds} onEditTicket={onEditTicket}/>
      <Footer modalInfoOpenHandler={modalInfoOpenHandler} />
      <Modal isVisible={isModalVisible} close={modalCloseHandler} tickets={tickets} ticketId={editingTicketId} save={modalSaveAndCloseHandler} isEditing={isEditingTicket} onDelete={onDeleteTicket}/>
      <InfoModal isVisible={isInfoModalVisible} close={modalInfoCloseHandler}/>
      <GDPRConsent modalInfoOpener={modalInfoOpenHandler} />
    </div>
  );
}

export default App;
