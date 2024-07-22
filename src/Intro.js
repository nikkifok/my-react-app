// Intro.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Popup from "./Popup";


const intros = [
    {
        image: "/assets/BGP_1Intro.png",
    },

    {
        image: "/assets/BGP_2Intro.png",
    },

    {
        image: "/assets/BGP_3Intro.png",
    },

    {
        image: "/assets/BGP_4Intro.png",
    },

    {
        image: "/assets/BGP_5Intro.png",
    },
];

function Intro() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const initialScene = parseInt(query.get('scene') || '0', 10);
    const [currentScene, setCurrentScene] = useState(initialScene);
    const [showPopup, setShowPopup] = useState(false);


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
        navigate(`/intro?scene=${sceneIndex}`);
    };

    const handleNext = () => {
        if (currentScene < intros.length - 1) {
            updateScene(currentScene + 1);
        } else if (currentScene === intros.length - 1) {
            setShowPopup(true); 
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        navigate("/email?scene=0", { replace: true});
    };

    const isLastScene = currentScene === intros.length - 1;



    return (
        <div className='intro-container'>
            <img
                src={intros[currentScene].image}
                alt={`Intro ${currentScene + 1}`}
                className='intro-image'
            />
            <div className='navigation-button'>
                <div
                    className={`btn ${isLastScene ? 'introend' : ''}`}
                    onClick={handleNext}
                >
                    <img
                        src="/assets/nextbtn.png"
                        alt="Next button"
                    />
                </div>
            </div>

            {showPopup && (
                <Popup
                    message="You've completed the training. Time to get to work."
                    onClose={handleClosePopup}
                />
            )}
        </div>
    )
}

export default Intro;