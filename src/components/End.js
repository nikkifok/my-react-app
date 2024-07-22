// End.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Popup from "./Popup";
import '../App.css';

const ending = [

    {
        image: "/assets/BGP_9End1.png",
    },
];

function End() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const initialScene = parseInt(query.get('scene') || '0', 10);
    const [currentScene, setCurrentScene] = useState(initialScene);
    const [showFinalPopup, setShowFinalPopup] = useState(false);

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
        navigate(`/end?scene=${sceneIndex}`);
    };

    const handleNext = () => {
        if (currentScene < ending.length - 1) {
            if (currentScene === 3) {
                setShowFinalPopup(true);
            } else {   
                updateScene(currentScene + 1);
            }
        } else {
            setShowFinalPopup(true);
        }
    };
    
    const handleFinalPopup = () => {
        setShowFinalPopup(false);
        navigate("/Posttest", { replace: true});
    };

    return (
        <div className='email-container'>
            <img
                src={ending[currentScene].image}
                alt={`End ${currentScene + 1}`}
                className='intro-image'
            />

            {currentScene < ending.length && (
                <div className='nav-buttons'>
                    <div className='navigation-button'>
                        <div
                            className='endemail'
                            onClick={handleNext}
                        >
                            <img
                                src="/assets/nextbtn.png"
                                alt="Next button"
                            />
                        </div>
                    </div>
                </div>
            )}

            {showFinalPopup && (
                <Popup
                    message="Well done for completing the game! Before you exit, please complete the short post-test assessment."
                    onClose={handleFinalPopup}
                />
            )}    
        </div>
    );

}

export default End;