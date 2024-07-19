// Draggable.js

import React from "react";
import { Draggable } from 'react-beautiful-dnd';

const DraggableItem = ({ item, index }) => {
    return (
      <Draggable draggableId={item.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: "none",
              padding: 16,
              margin: "0 0 8px 0",
              minHeight: "50px",
              backgroundColor: "#456C86",
              color: "white",
              ...provided.draggableProps.style,
            }}
          >
            {item.content}
          </div>
        )}
      </Draggable>
    );
  };
  
  export default DraggableItem;