// Intro.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const intros = [
    {
        image: "/assets/BFP_1Intro.png",
    },

    {
        image: "/assets/BGP_2ChooseChar.png",
    },

    {
        image: "/assets/BGP_2ABegin.png",
    },
];

function Intro() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const initialScene = parseInt(query.get('scene') || '0', 10);
    const [currentScene, setCurrentScene] = useState(initialScene);

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
        }
    };


    return (
        <div className='intro-container'>
            <img
                src={intros[currentScene].image}
                alt={`Intro ${currentScene + 1}`}
                className='intro-image'
            />
            <div className='navigation-button'>
                {currentScene !== 1 && (
                    <div className= "btn" onClick={handleNext} disabled={currentScene === intros.length - 1}>
                        <img
                            src="/assets/nextbtn.png"
                            alt="Next button"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Intro;