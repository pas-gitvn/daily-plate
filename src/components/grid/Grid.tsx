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
  let dragged:HTMLElement | object;

  const columns: { id: number, class: string, name: string }[] = [
    { id: 1, class: 'waiting', name: 'Waiting'},
    { id: 2, class: 'doing', name: 'Doing'},
    { id: 3, class: 'testing', name: 'Testing'},
    { id: 4, class: 'done', name: 'Done'},    
  ];


  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {    
    dragged = e.target;
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    let shouldBeInsertedBefore = false;
    let childElement = null;

    let target = e.target as Element;
    if(target.parentElement?.classList.contains('column')) {
      childElement = target;
      target = target.parentElement;
      // think about offset on drag
      // add some opacity on a child
      shouldBeInsertedBefore = true;
    }

    console.log(target);

    // aka insert after
    // parentDiv.insertBefore(sp1, sp2.nextSibling);
    // sp1 - dragged
    // sp2 - childElement.nextSibling / if it exists / if not do appendChild as it is the last element

    if(shouldBeInsertedBefore && !childElement?.classList.contains('title')) {
      // if on title, go first
      if(dragged instanceof HTMLElement) target.insertBefore(dragged, childElement);
    } else {
      if(dragged instanceof HTMLElement) target.appendChild(dragged);
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
