import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'


import styles from './Ticket.module.css';

type Props = {
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void, 
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void, 

  title: string,
  id: number,
  content: string,
}

const Ticket = (props: Props) => {  

  const [detailsStatus, setDetailsStatus] = useState<boolean>(false);
  const [detailsIcon, setDetailsIcon] = useState<string>('+');

  const handleOnClick = () => {
    setDetailsStatus(!detailsStatus);
    detailsIcon === '+' ? setDetailsIcon('-') : setDetailsIcon('+');    
  }

  const handleEdit = () => {
    // edit, send fn from props
    console.log('edit');
  }

  return (
    <div 
      className={`box ${styles.ticket}`} 
      draggable={true} 
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragEnd}
    >
      <span className={`icon ${styles.edit}`} onClick={handleEdit}>
        <FontAwesomeIcon icon={faEdit} />
      </span>
      <span>Ticket {props.id}</span>
      <p className='is-size-5'> {props.title}</p>
      
      <span className={`button is-light ${styles['toggle-content']}`} onClick={handleOnClick}>{detailsIcon}</span>
      {detailsStatus && <div className="ticket-details">
        <div className='mt-2'>
          {props.content}
        </div>
      </div>}
    </div>
  );
}

export default Ticket;
