import React from 'react';
import Ticket from '../ticket/Ticket';
import styles from './GridColumn.module.css';

interface AProps {
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  class: string;
  name: string;
  id: number,
  tickets: {
    id: number,
    columnId: number,
    title: string,
  }[]
}

const GridColumn = (props:AProps) => {

  const tickets = props.tickets;

  const filteredTickets = tickets.filter((ticket) => ticket.columnId === props.id);

  return (
    <div 
        className={`column grid__column ${styles[`grid__column-${props.class}`]}`}
        onDragOver={props.onDragOver}
        onDrop={props.onDrop}
      >
        <h3 className="title is-3 mt-4 has-text-centered">{props.name}</h3>        
        {filteredTickets.map((ticket) => (
          <Ticket key={ticket.id} id={ticket.id} onDragStart={props.onDragStart} onDragEnd={props.onDragEnd} text={ticket.title} />
        ))}          
    </div> 
  )
}

export default GridColumn;