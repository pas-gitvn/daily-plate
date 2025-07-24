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
  position: number;
}[]

const App = () => {
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
      const nextPosition = calculateTicketPosition(1);
      setTickets(prev => [...prev, {
        id: nextId,
        columnId: 1,
        title: title,
        content: content,
        position: nextPosition,
      }]);
    }
  };

  const calculateTicketPosition = (columnId:number) => {
    const filteredTickets = tickets.filter((ticket) => {
      return ticket.columnId === columnId;
    });
    return filteredTickets.length + 1;
  };

  const updatePositionsInColumn = (ticketId:number, columnId:number, ticketToBeLower: HTMLElement) => { 
    if(ticketToBeLower) {
      const ticketToBeLowerID = ticketToBeLower.dataset.id;
      const ticket = tickets.find(el => el.id === Number(ticketToBeLowerID));
      const ticketPosition = ticket?.position!;

      // Shift other tickets in the column down
      const shiftedTickets = tickets.map(ticket => {
        if (
          ticket.columnId === columnId &&
          ticket.id !== ticketId &&
          ticket.position >= ticketPosition
        ) {
          return {
            ...ticket,
            position: ticket.position + 1,
          };
        }
        return ticket;
      });

      // Insert the dragged ticket at the desired position
      const updatedTickets = shiftedTickets.map(ticket => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            position: ticketPosition,
            columnId: columnId,
          };
        }
        return ticket;
      });

      setTickets(normalizeColumnPositions(updatedTickets, columnId));
    } else {
      const columnTickets = tickets
      .filter(ticket => ticket.columnId === columnId && ticket.id !== ticketId);

      const maxPosition = columnTickets.length
      ? Math.max(...columnTickets.map(t => t.position)) + 1
      : 0;
     
      const updatedTickets = tickets.map((ticket) => {
        if(ticket.id === ticketId) {
          return {
            ...ticket,
            position: maxPosition,
            columnId: columnId,
          }
        }
        return ticket;
      });
      
      setTickets(normalizeColumnPositions(updatedTickets, columnId));
    }
  };

  const normalizeColumnPositions = (tickets: Tickets, columnId: number): Tickets => {
    const sorted = tickets
      .filter(t => t.columnId === columnId)
      .sort((a, b) => a.position - b.position);
  
    return tickets.map(t => {
      const index = sorted.findIndex(s => s.id === t.id);
      return index !== -1 ? { ...t, position: index + 1} : t;
    });
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

  const acceptGDPR = () => {
    localStorage.setItem('gdpr:accepted', 'true');
    setIsGdprAccepted(true);
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
      <Grid tickets={tickets} updatePositionsInColumn={updatePositionsInColumn} onEditTicket={onEditTicket}/>
      <Footer modalInfoOpenHandler={modalInfoOpenHandler} />
      <Modal isVisible={isModalVisible} close={modalCloseHandler} tickets={tickets} ticketId={editingTicketId} save={modalSaveAndCloseHandler} isEditing={isEditingTicket} onDelete={onDeleteTicket}/>
      <InfoModal isVisible={isInfoModalVisible} close={modalInfoCloseHandler}/>
      <GDPRConsent modalInfoOpener={modalInfoOpenHandler} accept={acceptGDPR}/>
    </div>
  );
}

export default App;
