// PostTest.js

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Test from "./Test";
import Popup from "./Popup";

const questions = [
    {
        question: "Thank you for completing the game. This posttest aims to measure the improvement in your knowledge and awareness of phishing and cybersecurity threats after engaging with the game.",
        options: [ "Proceed",

        ],
    },

    {
        question: "Q1. Legitimate companies will never ask for sensitive information via email.",
        options: [
            "True",
            "False",
        ],
    },

    {
        question: "Q2. You receive an email from your bank asking you to confirm your account details by clicking on a link. What should you do?",
        options: [
            "Click the link and provide the requested information",
            "Ignore the email",
            "Forward it to your friend to ask them",
            "Contact your bank using official contact information to verify the request",
        ],
    },

    {
        question: "Q3. Which of the following is a common sign of a phishing email?",
        options: [
            "Unexpected and unknown attachment",
            "Poor grammar and spelling mistakes",
            "Request for sensitive information",
            "All of the above",
        ],
    },

    {
        question: "Q4. Is this email trustworthy? (1 of 2)",
        image: "https://i.imgur.com/SL3pRgy.jpeg",
        options: [
            "Yes",
            "No"
        ],
    },

    {
        question: "Q5. Is this text message trustworthy? (2 of 2)",
        image: "https://i.imgur.com/7aBi5TJ.jpeg",
        options: [
            "Yes",
            "No"
        ],
    },

    {
        question: "Q6. Did you feel like you've learned something after playing the game? ",
        options: [
            "Yes",
            "No",
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
                    image={questions[currentQuestionIndex].image}
                    onAnswer={handleAnswer}
                />
            ) : (
                <div className="completion-message">
                    Thank you for your responses!
                    </div>
            )}
            {showPopup && (
                <Popup
                    message="Thank you for participating."
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
}

export default PreTest;