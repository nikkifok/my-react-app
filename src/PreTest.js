// PreTest.js

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Test from "./Test";
import Popup from "./Popup";

const questions = [
    {
        question: "What is phishing?",
        options: [
            "A deceptive attempt to steal sensitive information, like passwords or credit card details, by pretending to be a trustworthy source.",
            "A type of digital simualtion of fishing at sea.",
            "A legitimate way for companies to collect customer data.",
        ],
    },

    {
        question: "Which of the following are types of phishing?",
        options: [
            "Email",
            "Text message",
            "Phone calls",
            "All of the above",
        ],
    },
];

function PreTest() {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // This extracts the question indext from the URL
        const query = new URLSearchParams(location.search);
        const questionIndex = parseInt(query.get("question") || "0", 10);
        setCurrentQuestionIndex(questionIndex);
    }, [location]);

    const handleAnswer = (answer) => {
        setResponses([...responses, answer]);
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            navigate(`?question=${nextQuestion}`);
        } else {
            // Test is complete
            setShowPopup(true);
            // To enable when database server is up
            //sendResponses([...responses, answer]);
        }
    };

    /** const sendResponses = async (responses) => {
        try {
          const res = await fetch('https://your-heroku-app.herokuapp.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ responses }),
          });
          const data = await res.text();
          console.log(data);
        } catch (error) {
          console.error('Error sending responses:', error);
        }
      };
      **/

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="test-container">
            {currentQuestionIndex < questions.length ? (
                <Test
                    question={questions[currentQuestionIndex].question}
                    options={questions[currentQuestionIndex].options}
                    onAnswer={handleAnswer}
                />
            ) : (
                <div className="completion-message">
                    Thank you for your responses!
                    </div>
            )}
            {showPopup && (
                <Popup message="Thank you for your responses!" onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default PreTest;