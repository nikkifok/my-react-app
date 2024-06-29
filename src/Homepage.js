import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Homepage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/PreTest");
    };
  
    return (
      <div className="homepage-container">
        <img
          className="homepage"
          src="https://i.imgur.com/dRp7G5w.png" 
        alt="Homepage" 
      />
      <button className="invisible-btn" onClick={handleClick}>Start Game</button>
      </div>
    );
  }
  
  export default Homepage;