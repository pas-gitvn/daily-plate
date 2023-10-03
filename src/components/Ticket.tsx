import React, { useState } from 'react';
import './Ticket.css';

type Props = {
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void, 
  text: string,
  id: number,
}

const Ticket = (props: Props) => {  

  const [detailsStatus, setDetailsStatus] = useState<boolean>(false);
  const [detailsIcon, setDetailsIcon] = useState<string>('+');

  const handleOnClick = () => {
    setDetailsStatus(!detailsStatus);
    detailsIcon === '+' ? setDetailsIcon('-') : setDetailsIcon('+');    
  }

  return (
    <div 
      className="box ticket" 
      draggable={true} 
      onDragStart={props.onDragStart}
    >
      <span>Ticket {props.id}</span>
      <p>{props.text}</p>
      <span className='button is-light toggle-content' onClick={handleOnClick}>{detailsIcon}</span>
      {detailsStatus && <div className="ticket-details">
        <div>
          details
        </div>
      </div>}
    </div>
  );
}

export default Ticket;
