// Droppable.js

import React from "react";
import { Droppable } from 'react-beautiful-dnd';

const DroppableContainer = ({ droppableId, children }) => {
    return (
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: "lightgrey",
              padding: 8,
              width: 250,
              minHeight: 500,
            }}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };
  
  export default DroppableContainer;
