import React from 'react';

type Props = {
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void, 
  text: string,
}

const Ticket = (props: Props) => {  

  return (
    <div 
      className="box" 
      draggable={true} 
      onDragStart={props.onDragStart}           
    >
      {props.text}
    </div>
  );
}

export default Ticket;
