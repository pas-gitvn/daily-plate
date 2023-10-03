import React from 'react';
import Ticket from './Ticket';
import './GridColumn.css';
import { isPropertySignature } from 'typescript';

interface AProps {
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  class: string;
  name: string;
  id: number,
}

const tickets = [
  { id: 1, columnId: 1, title: 'I\'m in a box. I am a ticket.'},
  { id: 2, columnId: 1, title: 'I\'m in a box. I am a ticket.'},
  { id: 3, columnId: 2, title: 'I\'m in a box. I am a ticket.'},
  { id: 4, columnId: 3, title: 'I\'m in a box. I am a ticket.'},
  { id: 5, columnId: 4, title: 'I\'m in a box. I am a ticket.'}
];

const GridColumn = (props:AProps) => {

  const filteredTickets = tickets.filter((ticket) => ticket.columnId === props.id);

  return (
    <div 
        className={`column grid__column grid__column-${props.class}`}
        onDragOver={props.onDragOver}
        onDrop={props.onDrop}
      >
        <h3 className="title is-3 mt-4">{props.name}</h3>        
        {filteredTickets.map((ticket) => (
          <Ticket id={ticket.id} onDragStart={props.onDragStart} text={ticket.title} />
        ))}          
    </div> 
  )
}

export default GridColumn;