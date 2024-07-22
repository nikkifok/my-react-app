// Homepage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Homepage({onStartGame}) {
    const navigate = useNavigate();

    const handleClick = () => {
      onStartGame();
      navigate("/PreTest");
    };
  
    return (
      <div className="homepage-container">
        <img
          className="homepage"
          src="/assets/BGP_Title.png" 
        alt="Homepage" 
      />
      <button className="invisible-btn" onClick={handleClick}>Start Game</button>
      </div>
    );
  }
  
  export default Homepage;