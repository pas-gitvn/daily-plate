import React from 'react';
import Ticket from '../ticket/Ticket';
import styles from './GridColumn.module.scss';

interface AProps {
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (columnId:number) => (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (ticketId:number) => (e: React.DragEvent<HTMLDivElement>) => void,
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onEditTicket: (ticketId:number) => void;
  class: string;
  name: string;
  id: number,
  tickets: {
    id: number,
    columnId: number,
    title: string | undefined,
    content: string | undefined,
  }[]
}

const GridColumn = (props:AProps) => {

  const tickets = props.tickets;

  const filteredTickets = tickets.filter((ticket) => ticket.columnId === props.id);

  return (
    <div
        className={`column grid__column ${styles[`grid__column-${props.class}`]}`}
        onDragOver={props.onDragOver}
        onDrop={props.onDrop(props.id)}
        onDragEnter={props.onDragEnter}
        onDragLeave={props.onDragLeave}
      >
        <h3 className={`title is-6 mt-3 mb-3 has-text-centered is-uppercase is-unselectable ${styles[`grid__column-title`]}`}>{props.name}</h3>
        {filteredTickets.map((ticket) => (
          <Ticket key={ticket.id} id={ticket.id} onEdit={props.onEditTicket} onDragStart={props.onDragStart} onDragEnd={props.onDragEnd} title={ticket.title} content={ticket.content} />
        ))}
    </div>
  )
}

export default GridColumn;
