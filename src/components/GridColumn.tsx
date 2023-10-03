import React from 'react';
import Ticket from './Ticket';
import './GridColumn.css';

interface AProps {
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  class: string;
  name: string;
}

const GridColumn = (props:AProps) => {
  return (
    <div 
        className={`column grid__column grid__column-${props.class}`}
        onDragOver={props.onDragOver}
        onDrop={props.onDrop}
      >
        <h3 className="title is-3 mt-4">{props.name}</h3>
        <Ticket onDragStart={props.onDragStart} text={"I'm in a box. Yeah I am a ticket"} />         
      </div> 
  )
}

export default GridColumn;