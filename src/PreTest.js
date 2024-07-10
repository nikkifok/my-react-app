// PreTest.js

import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Test from "./Test";
import Popup from "./Popup";
import { TestCompletionContext } from "./TestCompletionContext";


const questions = [
    {
        question: "Welcome to the cybersecurity awareness pretest. Thank you for participating in this assessment. The purpose of this pretest is to gauge your current knowledge and awareness of cybersecurity threats. Your responses will help us understand your starting point before you engage with our educational game designed to improve threat detection skills. There will be a total of 6 questions.",
        options: [ "Proceed",
        ],
    },

    {
        question: "Q1. What is phishing?",
        options: [
            "A type of virtual fishing simulation programme",
            "A technique used to steal personal information by pretending to be a trustworthy entity",
            "A legitimate way for companies to collect customer data",
            "A method to enhance computer performance",
        ],
    },

    {
        question: "Q2. Where can phishing happen?",
        options: [
            "Email",
            "Text messaging",
            "Phone calls",
            "All of the above",
        ],
    },

    {
        question: "Q3. Phishing emails often create a sense of urgency to trick you into taking immediate action.",
        options: [
            "True",
            "False",
        ],
    },

    {
        question: "Q4. Is this email trustworthy? (1 of 2)",
        image: "/assets/pretest1.jpg",
        options: [
            "Yes",
            "No"
        ],
    },

    {
        question: "Q5. Is this email trustworthy? (2 of 2)",
        image: "/assets/pretest2.jpg",
        options: [
            "Yes",
            "No"
        ],
    },

    {
        question: "Q6. A secure website URL always starts with 'http'. ",
        options: [
            "True",
            "False",
        ],
    },

];

function PreTest() {
    const navigate = useNavigate();
    const location = useLocation();
    const { testCompleted, setTestCompleted } = useContext(TestCompletionContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // This extracts the question indext from the URL
        const query = new URLSearchParams(location.search);
        const questionIndex = parseInt(query.get("question") || "0", 10);
        setCurrentQuestionIndex(questionIndex);
    }, [location]);

    useEffect(() => {
        if (testCompleted) {
            navigate('/intro?scene=0', { replace: true });
        }
    }, [testCompleted, navigate]);

    const handleAnswer = (answer) => {
        setResponses([...responses, answer]);
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            navigate(`?question=${nextQuestion}`);
        } else {
            setShowPopup(true); // Test is complete
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
        setTestCompleted(true);
    };

    if (testCompleted) {
        return <Navigate to="/intro?scene=0" replace />;
    }

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
                    message="Thank you for your responses. The game begins now."
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
}

export default PreTest;