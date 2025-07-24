import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'


import styles from './Ticket.module.scss';

type Props = {
  onDragStart: (ticketId:number) => (e: React.DragEvent<HTMLDivElement>) => void,
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void,
  onEdit: (ticketId:number) => void;

  title: string | undefined,
  id: number,
  content: string | undefined,
}

const Ticket = (props: Props) => {

  const [detailsStatus, setDetailsStatus] = useState<boolean>(false);
  const [detailsIcon, setDetailsIcon] = useState<string>('+');

  const handleOnClick = () => {
    setDetailsStatus(!detailsStatus);
    detailsIcon === '+' ? setDetailsIcon('-') : setDetailsIcon('+');
  }

  const handleEdit = () => {
    props.onEdit(props.id);
  }

  return (
    <div
      className={`box ${styles.ticket}`}
      draggable={true}
      onDragStart={props.onDragStart(props.id)}
      onDragEnd={props.onDragEnd}
      data-id ={props.id}
    >
      <span className={`icon ${styles.edit}`} onClick={handleEdit}>
        <FontAwesomeIcon icon={faEdit} />
      </span>
      <span className={styles.ticket__number}>Ticket {props.id}</span>
      <p className='is-size-5 mt-2'> {props.title}</p>

      <span className={`button is-light ${styles['toggle-content']}`} onClick={handleOnClick}>{detailsIcon}</span>
      {detailsStatus && <div className="ticket-details">
        <div className='mt-2'>
        {props.content?.split('\n').map((line, index, array) => (
          <React.Fragment key={index}>
            {line}
            {index < array.length - 1 && <br />}
          </React.Fragment>
        ))}
        </div>
      </div>}
    </div>
  );
}

export default Ticket;
