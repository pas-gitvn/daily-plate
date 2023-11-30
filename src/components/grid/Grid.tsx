import React from 'react';
import GridColumn from './GridColumn';
import styles from './Grid.module.css'

interface Aprops {
  tickets: {
    id: number,
    columnId: number,
    title: string | undefined,
    content: string | undefined,
  }[]
}

const Grid = (props: Aprops) => {
  let draggedTicket:HTMLElement;
  let draggedStartPosition:number;
  let columnTarget:HTMLElement;

  const columns: { id: number, class: string, name: string }[] = [
    { id: 1, class: 'waiting', name: 'Waiting'},
    { id: 2, class: 'doing', name: 'Doing'},
    { id: 3, class: 'testing', name: 'Testing'},
    { id: 4, class: 'done', name: 'Done'},    
  ];


  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {    
    draggedTicket = e.target as HTMLElement;
    draggedStartPosition = e.pageY;
    draggedTicket.classList.add('dragging');
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    draggedTicket.classList.remove('dragging');
    let columns = document.querySelectorAll('.column');
    columns.forEach((column) => {
      column.classList.remove('over');
    })
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let target = e.target as HTMLElement;
    let column = target.closest('.column') as HTMLElement;
    columnTarget = column;
    column.classList.add('over');
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let target = e.target as HTMLElement;
    let column = target.closest('.column') as HTMLElement;
    if (column != columnTarget) column.classList.remove('over');
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let target = e.target as HTMLElement;
    let column = target.closest('.column') as HTMLElement;

    let ticketBoxes = Array.from(column.children).filter((el) => {
      return el.classList.contains('box');
    }) as HTMLElement[];

    // distance from top to a cursor position of the dragged ticket
    // e.g. ticket's top position is 100 and cursor position is 120
    // then the distance is 20
    let draggedTopDistance = draggedStartPosition - draggedTicket.offsetTop;
    
    // if a dropped ticket's position is in the top 35% of the target ticket area
    // then target ticket will be set to lower position
    // e.g. a ticket below dropped one have a position of 100 and height of 100,
    // so the calculated factor is going to be 135
    // if a dragged element calculated postion will be less than 135, then that dragged ticket will be placed before
    let ticketToBeLower = ticketBoxes.find((element) => {
      return (element.offsetTop + element.offsetHeight * 0.35) > e.pageY - draggedTopDistance;
    });

    if(draggedTicket instanceof HTMLElement && ticketToBeLower) { 
      column.insertBefore(draggedTicket, ticketToBeLower) 
    } else if(draggedTicket instanceof HTMLElement) {
      column.appendChild(draggedTicket);
    } 
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
          class={column.class} 
          name={column.name} 
          tickets={props.tickets}
        />  
      ))}                
    </div>
  );
}

export default Grid;
