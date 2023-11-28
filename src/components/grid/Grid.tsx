import React from 'react';
import GridColumn from './GridColumn';
import styles from './Grid.module.css'

interface Aprops {
  tickets: {
    id: number,
    columnId: number,
    title: string,
  }[]
}

const Grid = (props: Aprops) => {
  let draggedTicket:HTMLElement | object;

  const columns: { id: number, class: string, name: string }[] = [
    { id: 1, class: 'waiting', name: 'Waiting'},
    { id: 2, class: 'doing', name: 'Doing'},
    { id: 3, class: 'testing', name: 'Testing'},
    { id: 4, class: 'done', name: 'Done'},    
  ];


  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {    
    draggedTicket = e.target;
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    let target = e.target as HTMLElement;
    let column = target.closest('.column') as HTMLElement;

    let ticketBoxes = Array.from(column.children).filter((el) => {
      return el.classList.contains('box');
    }) as HTMLElement[];
    
    let ticketToBeLower = ticketBoxes.find((element) => {
      return (element.offsetTop + element.offsetHeight * 0.35) > e.pageY;
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
        <GridColumn key={column.id} id={column.id} onDragOver={onDragOver} onDrop={onDrop} onDragStart={onDragStart} class={column.class} name={column.name} tickets={props.tickets}/>  
      ))}                
    </div>
  );
}

export default Grid;
