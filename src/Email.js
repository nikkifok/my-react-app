// Email.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Popup from "./Popup";
import Modal from './Modal';
import Rulebook from './Rulebook';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./Timer.css";


const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Out of time!</div>;
    }
  
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

const emails = [

    {
        image: "/assets/BGP_6Email1.png",
    },

    {
        image: "/assets/BGP_6Email2.png",
    },

    {
        image: "/assets/BGP_6Email3.png",
    },
];

function Email() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const initialScene = parseInt(query.get('scene') || '0', 10);
    const [currentScene, setCurrentScene] = useState(initialScene);
    const [showRulebookPopup, setShowRulebookPopup] = useState(false);
    const [showTimeoutPopup, setShowTimeoutPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isTimerPlaying, setIsTimerPlaying] = useState(true);
    const [key, setKey] = useState(0); // To reset the timer


    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const scene = parseInt(query.get('scene') || '0', 10);
        setCurrentScene(scene);
    }, [location.search]);

    useEffect(() => {
        console.log(`Current Scene: ${currentScene}`);
    }, [currentScene]);
    
    const updateScene = (sceneIndex) => {
        setCurrentScene(sceneIndex);
        navigate(`/email?scene=${sceneIndex}`);
    };

    const handleNext = () => {
        if (currentScene < emails.length - 1) {
            updateScene(currentScene + 1);
        }
    };

    const openRulebookPopup = () => {
        setShowRulebookPopup(true); 
    }

    const closeRulebookPopup = () => {
        setShowRulebookPopup(false);
    };

    const openRulebook = () => {
        setShowModal(true);
        setIsTimerPlaying(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setIsTimerPlaying(true);
    };

    const handleTimesUp = () => {
        setShowTimeoutPopup(true);
        setIsTimerPlaying(false);
    };

    const handleCloseTimeoutPopup = () => {
        setShowTimeoutPopup(false);
        setCurrentScene(0);
        navigate(`/email?scene=0`);
        setKey(prevKey => prevKey + 1); // Reset the timer by changing the key
        setIsTimerPlaying(true);
    };

    return (
        <div className='email-container'>
            <img
                src={emails[currentScene].image}
                alt={`Email ${currentScene + 1}`}
                className='intro-image'
            />

            <div className='nav-buttons'>
                <div
                    className='safe'
                    onClick={openRulebookPopup}
                >
                    <img
                        src="/assets/safebtn.png"
                        alt="Mark Safe button"
                    />
                </div>
                <div
                    className='unsafe'
                    onClick={handleNext}
                >

                    <img
                        src="/assets/unsafebtn.png"
                        alt="Report Unsafe button"
                    />
                </div>
            </div>

            <div className='rulebook-button-container'>
                <img
                    src="/assets/rulebookbtn.png"
                    alt="Rulebook button"
                    className='rulebook-button'
                    onClick={openRulebook}
                />
            </div>

            <div className="App">
                <div className="timer-wrapper">
                <CountdownCircleTimer
                    key={key} // Key to control the reset
                    isPlaying={isTimerPlaying}
                    isSmoothColorTransition={true}
                    duration={15}
                    colors={["#3257FF", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => {
                        handleTimesUp();
                        return { shouldRepeat: false, delay: 1};
                    }}
                    size={140}
                    strokeWidth={6}
                >
                    {renderTime}
                </CountdownCircleTimer>
                </div>
            
            </div>

            {showRulebookPopup && (
                <Popup
                    message="Hold up. Something's suspicious. Check the Rulebook."
                    onClose={closeRulebookPopup}
                />
            )}

            {showTimeoutPopup && (
                <Popup
                    message="Time's up. Let's start again..."
                    onClose={handleCloseTimeoutPopup}
                />
            )}

            <Modal show={showModal} onClose={handleCloseModal}>
                <Rulebook />
            </Modal>
        </div>

        
    )
}


const rootElement = document.getElementById("root");
  

export default Email;