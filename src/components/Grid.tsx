import React from 'react';
import GridColumn from './GridColumn';
import './Grid.css';

const Grid = () => {
  let dragged:HTMLElement | object;

  const columns: { class: string, name: string }[] = [
    { class: 'waiting', name: 'Waiting'},
    { class: 'doing', name: 'Doing'},
    { class: 'testing', name: 'Testing'},
    { class: 'done', name: 'Done'},    
  ];

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('draging...', e.target);
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
    <div className="grid columns section">       
      {columns.map((column) => (
        <GridColumn onDragOver={onDragOver} onDrop={onDrop} onDragStart={onDragStart} class={column.class} name={column.name}/>  
      ))}                
    </div>
  );
}

export default Grid;
