//Test.js

import React, { useState } from "react";

function Test({ question, options, onAnswer}) {
    return (
        <div className="question-section">
            <div className="question-text">{question}</div>
            <div className="answer-section">
                {options.map((option, index) => (
                    <button key={index} onClick={() => onAnswer(option)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Test;