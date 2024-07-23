// Quiz.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Popup from "./Popup";
import './Quiz.css';

const ItemTypes = {
    ITEM: 'item',
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Quiz = () => {
    const [showEndPopup, setShowEndPopup] = useState(false);
    const [completedItems, setCompletedItems] = useState([]);
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
    const navigate = useNavigate();

    const categories = [
        { id: 'email-red-flags', name: 'Phishing Email Red Flags' },
        { id: 'website-red-flags', name: 'Phishing Website Red Flags' },
        { id: 'text-red-flags', name: 'Phishing Text Message Red Flags' },
    ];

    const handleDrop = (item, category) => {
        if (item.category === category.id) {
            const dropzone = document.getElementById(category.id);
            const draggableElement = document.getElementById(item.id);
            if (dropzone && draggableElement) {
                draggableElement.classList.add('correct-drop');
                setTimeout(() => {
                    setCompletedItems((prev) => [...prev, item]);
                    if (completedItems.length + 1 === items.length) {
                        setShowEndPopup(true);
                    }
                }, 1000); // Duration of the animation
            }
        } else {
            alert('Incorrect category! Please try again.');
        }
    };

    const handleCloseEndPopup = () => {
        setShowEndPopup(false);
        navigate("/end?scene=0", { replace: true });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="quiz-container">
                <h1>Drag and drop the phishing red flags into the correct categories</h1>
                <div className="quiz">
                    <div className="categories">
                        {categories.map((category) => (
                            <Category key={category.id} category={category} onDrop={handleDrop} />
                        ))}
                    </div>
                    <div className="items">
                        {items.filter(item => !completedItems.includes(item)).map((item) => (
                            <DraggableItem key={item.id} item={item} />
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

const Category = ({ category, onDrop }) => {
    const [, ref] = useDrop({
        accept: ItemTypes.ITEM,
        drop: (item) => onDrop(item, category),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <div ref={ref} id={category.id} className="category">
            <h3>{category.name}</h3>
            <div className="dropzone"></div>
        </div>
    );
};

const DraggableItem = ({ item }) => {
    const [, ref] = useDrag({
        type: ItemTypes.ITEM,
        item,
    });

    return (
        <div ref={ref} id={item.id} className="item">
            {item.content}
        </div>
    );
};

export default Quiz;




