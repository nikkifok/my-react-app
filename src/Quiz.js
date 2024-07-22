// Quiz.js

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Popup from "./Popup";
import './Quiz.css';

//Function to shuffle the array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const Quiz = () => {
        const [showEndPopup, setShowEndPopup] = useState(false);
        const navigate = useNavigate();

        const [categories] = useState([
            { id: 'email-red-flags', name: 'Phishing Email Red Flags' },
            { id: 'website-red-flags', name: 'Phishing Website Red Flags' },
            { id: 'text-red-flags', name: 'Phishing Text Message Red Flags' },
        ]);

        const [items] = useState(() =>
            shuffleArray([
                // Email Red Flags
                { id: 'item1', content: 'From: "inf0@bank-secure.com"', category: 'email-red-flags' },
                { id: 'item2', content: 'Subject: "URGENT: Verify your account now!"', category: 'email-red-flags' },
                { id: 'item4', content: 'Attachment: "invoice.zip"', category: 'email-red-flags' },
                // Website Red Flags
                { id: 'item5', content: 'Address Bar: "http://secure-login.com"', category: 'website-red-flags' },
                { id: 'item6', content: 'Form Field: "Enter your Social Security Number"', category: 'website-red-flags' },
                { id: 'item7', content: 'Button: "Loggin in to your account."', category: 'website-red-flags' },
                // Text Message Red Flags
                { id: 'item8', content: 'From Number: "+1234567890"', category: 'text-red-flags' },
                { id: 'item9', content: 'Tap This Link: "http://bit.ly/bank-secure"', category: 'text-red-flags' },
                { id: 'item10', content: 'Message: "Your accunt is at riks. Act immidiately."', category: 'text-red-flags' },
            ])
        );

        const [completedItems, setCompletedItems] = useState([]);

        const onDragStart = (e, id) => {
            e.dataTransfer.setData('text/plain', id);
        };

        const onDragOver = (e) => {
            e.preventDefault();
        };

        const onDrop = (e, category) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text');
            const item = items.find(item => item.id === id);

            if (item.category === category) {
            const dropzone = e.target.closest('.dropzone');
            const draggableElement = document.getElementById(id);
            if (dropzone) {
                dropzone.appendChild(draggableElement);
                setCompletedItems(prev => [...prev, item]);

                if (completedItems.length + 1 === items.length) {
                    setShowEndPopup(true);
                }
            } else {
                alert('Please drop your answers in the designated area.');
            }
        } else {
            alert('Incorrect category! Please try again.');
        }
    };

        const handleCloseEndPopup = () => {
            setShowEndPopup(false);
            navigate("/end?scene=0", { replace: true});

        };

    return (
        <div className="quiz-container">
            <h1>Drag and drop the phishing red flags into the correct categories</h1>
            <div className="quiz">
                <div className="categories">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            id={category.id}
                            className="category"
                            onDragOver={onDragOver}
                            onDrop={(e) => onDrop(e, category.id)}
                        >
                            <h3>{category.name}</h3>
                            <div className="dropzone"></div>
                        </div>
                    ))}
                </div>
            <div className="items">
                {items.map((item) => (
                    <div
                        key={item.id}
                        id={item.id}
                        className="item"
                        draggable="true"
                        onDragStart={(e) => onDragStart(e, item.id)}
                    >
                        {item.content}
                    </div>
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
  );
};


export default Quiz;

