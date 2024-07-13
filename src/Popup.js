// Popup.js

import React from "react";
import "./Popup.css";

function Popup({ message, onClose}) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>{message}</h2>
                <button onClick={onClose}>Proceed</button>
            </div>
        </div>
    );
}

export default Popup;