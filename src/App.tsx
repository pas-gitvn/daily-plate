import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import 'bulma/css/bulma.min.css';
import './App.css';
import Grid from './components/grid/Grid';
import Modal from './components/modal/Modal';
import InfoModal from './components/modal/InfoModal';
import GDPRConsent from './components/policies/GDPRConsent';

type Tickets = {
  id: number;
  columnId: number;
  title: string | undefined;
  content: string | undefined;
}[]

interface Quote {
  q: string;
  a: string;
}

const App = () => {
  const { t } = useTranslation();

  const [tickets, setTickets] = useState<Tickets>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditingTicket, setIsEditingTicket] = useState<boolean>(false);
  const [editingTicketId, setEditingTicketId] = useState<number>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState<boolean>(false);
  const [gdprAccepted, setIsGdprAccepted] = useState<boolean>(false);
  const [quote, setQuote] = useState<Quote | null>(null);

  const modalOpenHandler = () => {
    setIsEditingTicket(false);
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

  const onDeleteTicket = () => {
    setIsEditingTicket(false);    
    setIsModalVisible(false);
    const updatedTickets = tickets.filter((ticket) => {      
      return ticket.id !== editingTicketId;
    });
    setTickets(updatedTickets);
  }

  useEffect(() => {    
    let value = null;     
    let gdprAccepted = !!localStorage.getItem('gdpr:accepted');
    setIsGdprAccepted(gdprAccepted);

    value = localStorage.getItem('plateTickets');      
      if(!value) {
        setIsLoading(false);
        return;
      };
            
      setTickets(JSON.parse(value));
      setIsLoading(false);      
  }, []);

  useEffect(() => {    
    if(!isLoading && gdprAccepted) {            
      localStorage.setItem('plateTickets', JSON.stringify(tickets)); 
    }
  }, [isLoading, tickets, gdprAccepted]);  

  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await fetch('/api/random');                        
        const quotes: Quote[] = await response.json();
        console.log(quotes[0]);
        setQuote(quotes[0]);        
      } catch (error) {
        console.error('Failed to fetch quote:', error);
      }
    };

    getQuote();
  }, []);

  return (
    <div className="plate">            
      <section className="plate__header section">        
        <h1 className="title is-1">{t('plate.title')}</h1>
        <p className="subtitle">{t('plate.subtitle')}</p>
        <button className="button is-primary" onClick={modalOpenHandler}>{t('ticket.create')}</button>         
        {quote && 
          <blockquote>
            <span>{quote.q}</span><span> - {quote.a}</span>
          </blockquote>
        }
      </section>          
      <Grid tickets={tickets} updateColumns={updateTicketsColumnsIds} onEditTicket={onEditTicket}/>      
      <footer className='footer'>
        <p>
          {t('info.created')} <a href="mailto:szupa@o2.pl">{t('info.here')}</a>
        </p>
        <span className='has-text-link policy' onClick={modalInfoOpenHandler}>
          {t('info.policy')}
        </span>
      </footer>
      <Modal isVisible={isModalVisible} close={modalCloseHandler} save={modalSaveAndCloseHandler} isEditing={isEditingTicket} onDelete={onDeleteTicket}/>
      <InfoModal isVisible={isInfoModalVisible} close={modalInfoCloseHandler}/>
      <GDPRConsent modalInfoOpener={modalInfoOpenHandler} />
    </div>
  );
}

export default App;
