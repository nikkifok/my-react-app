// Quiz.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from "./Popup";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import './Quiz.css';

const ItemTypes = {
  ITEM: 'item',
};

// Draggable item component
const DraggableItem = ({ item, handleDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item: { id: item.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        handleDrop(item.id, dropResult.category);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      className="item"
    >
      {item.content}
    </div>
  );
};

// Droppable category component
const DroppableCategory = ({ category, children }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: () => ({ category: category.id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="category">
      <h3>{category.name}</h3>
      <div className="dropzone">{children}</div>
    </div>
  );
};

const Quiz = () => {
  const [showEndPopup, setShowEndPopup] = useState(false);
  const navigate = useNavigate();

  const [categories] = useState([
    { id: 'email-red-flags', name: 'Phishing Email Red Flags' },
    { id: 'website-red-flags', name: 'Phishing Website Red Flags' },
    { id: 'text-red-flags', name: 'Phishing Text Message Red Flags' },
  ]);

  const [items, setItems] = useState(() =>
    shuffleArray([
      { id: 'item1', content: 'From: "inf0@bank-secure.com"', category: 'email-red-flags' },
      { id: 'item2', content: 'Subject: "URGENT: Verify your account now!"', category: 'email-red-flags' },
      { id: 'item4', content: 'Attachment: "invoice.zip"', category: 'email-red-flags' },
      { id: 'item5', content: 'Address Bar: "http://secure-login.com"', category: 'website-red-flags' },
      { id: 'item6', content: 'Form Field: "Enter your Social Security Number"', category: 'website-red-flags' },
      { id: 'item7', content: 'Button: "Loggin in to your account."', category: 'website-red-flags' },
      { id: 'item8', content: 'From Number: "+1234567890"', category: 'text-red-flags' },
      { id: 'item9', content: 'Tap This Link: "http://bit.ly/bank-secure"', category: 'text-red-flags' },
      { id: 'item10', content: 'Message: "Your accunt is at riks. Act immidiately."', category: 'text-red-flags' },
    ])
  );

  const [completedItems, setCompletedItems] = useState([]);

  const handleDrop = (itemId, category) => {
    const item = items.find((item) => item.id === itemId);

    if (item.category === category) {
      setCompletedItems((prev) => {
        const newCompletedItems = [...prev, item];
        if (newCompletedItems.length === items.length) {
          setShowEndPopup(true);
        }
        return newCompletedItems;
      });
    } else {
      alert('Incorrect category! Please try again.');
    }
  };

  const handleCloseEndPopup = () => {
    setShowEndPopup(false);
    navigate("/end?scene=0", { replace: true });
  };

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="quiz-container">
        <h1>Drag and drop the phishing red flags into the correct categories</h1>
        <div className="quiz">
          <div className="categories">
            {categories.map((category) => (
              <DroppableCategory key={category.id} category={category}>
                {completedItems
                  .filter((item) => item.category === category.id)
                  .map((item) => (
                    <div key={item.id} className="item">
                      {item.content}
                    </div>
                  ))}
              </DroppableCategory>
            ))}
          </div>
          <div className="items">
            {items
              .filter((item) => !completedItems.includes(item))
              .map((item) => (
                <DraggableItem key={item.id} item={item} handleDrop={handleDrop} />
              ))}
          </div>
        </div>

        {showEndPopup && (
          <Popup
            message="Well done. You've successfully completed Task Three!"
            onClose={handleCloseEndPopup}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default Quiz;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};





