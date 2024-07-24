// CustomAlert.js

import React from 'react';
import './CustomAlert.css';

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert">
        <div className="custom-alert-header">
          <h2>Alert</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="custom-alert-body">
          <p>{message}</p>
        </div>
        <div className="custom-alert-footer">
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
