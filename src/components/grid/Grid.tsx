import React from 'react';
import GridColumn from './GridColumn';
import styles from './Grid.module.css'

interface Aprops {
  tickets: {
    id: number,
    columnId: number,
    title: string | undefined,
    content: string | undefined,
    position: number,
  }[],
  onEditTicket: (ticketId: number) => void,
  updatePositionsInColumn: (ticketId:number, columnId:number, ticketToBeLower: HTMLElement) => void,
}

const Grid = (props: Aprops) => {
  let draggedTicket:HTMLElement;
  let draggedTicketId:number;
  let destinationColumnId:number;
  let columnTarget:HTMLElement;
  let insertBeforeBox:HTMLElement;

  const columns: { id: number, class: string, name: string }[] = [
    { id: 1, class: 'waiting', name: 'Waiting'},
    { id: 2, class: 'doing', name: 'Doing'},
    { id: 3, class: 'testing', name: 'Testing'},
    { id: 4, class: 'done', name: 'Done'},    
  ];

  const onDragStart = (ticketId: number) => {        
    return (e: React.DragEvent<HTMLDivElement>) => {          
      draggedTicket = e.currentTarget as HTMLElement;
      draggedTicketId = ticketId;
      draggedTicket.classList.add('dragging');      
    };
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {    
    draggedTicket.classList.remove('dragging');
    let documentColumns = document.querySelectorAll('.column');
    documentColumns.forEach((column) => {
      column.classList.remove('over');
    });

    props.updatePositionsInColumn(draggedTicketId, destinationColumnId, insertBeforeBox);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let target = e.target as HTMLElement;
    let column = target.closest('.column') as HTMLElement;
    let documentColumns = document.querySelectorAll('.column');
    documentColumns.forEach((column) => {
      column.classList.remove('over');
    });
    columnTarget = column;
    column.classList.add('over');
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let target = e.target as HTMLElement;
    let column = target.closest('.column') as HTMLElement;
    if (column !== columnTarget) column.classList.remove('over');
  }

  const onDrop = (columnId: number) => {    
    return (e: React.DragEvent<HTMLDivElement>) => {      
      e.preventDefault();
      destinationColumnId = columnId;
      let target = e.target as HTMLElement;
      let column = target.closest('.column') as HTMLElement;
  
      const ticketBoxes = Array.from(column.children).filter(
        (el): el is HTMLElement => 
          el instanceof HTMLElement && el.classList.contains('box') && el !== draggedTicket
      );

      const mouseY = e.clientY;

      for (const box of ticketBoxes) {
        const rect = box.getBoundingClientRect();
        const boxMidY = rect.top + rect.height / 2;

        if (mouseY < boxMidY) {
          insertBeforeBox = box;
          break;
        }
      }
    };
  };

  return (
    <div className={`${styles.grid} columns section`}>       
      {columns.map((column) => (
        <GridColumn 
          key={column.id} 
          id={column.id} 
          onDragOver={onDragOver} 
          onDrop={onDrop} 
          onDragStart={onDragStart} 
          onDragEnd={onDragEnd}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onEditTicket={props.onEditTicket}
          class={column.class} 
          name={column.name} 
          tickets={props.tickets}
        />  
      ))}                
    </div>
  );
}

export default Grid;
