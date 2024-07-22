// PostTest.js

import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Test from "./Test";
import Popup from "./Popup";
import { PostTestCompletionContext } from "./PostTestCompletionContext";

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
        image: "/assets/posttest1.jpg",
        options: [
            "Yes",
            "No"
        ],
    },

    {
        question: "Q5. Is this text message trustworthy? (2 of 2)",
        image: "/assets/posttest2.jpeg",
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

function PostTest() {
    const navigate = useNavigate();
    const location = useLocation();
    const { postTestCompleted, setPostTestCompleted } = useContext(PostTestCompletionContext);
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
        if (postTestCompleted) {
            navigate('/', { replace: true });
        }
    }, [postTestCompleted, navigate]);

    useEffect(() => {
        // Push a new state to the history stack to prevent back navigation
        window.history.pushState(null, document.title, window.location.href);

        const handlePopState = (event) => {
            event.preventDefault();
            // Navigate back to the PostTest component
            navigate("/PostTest", { replace: true });
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate]);

    const handleAnswer = (answer) => {
        const updatedResponses = [...responses, answer];
        setResponses(updatedResponses);
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            navigate(`?question=${nextQuestion}`);
        } else {
            setShowPopup(true); // Test is complete
            sendResponses(updatedResponses); // Enabled for database server is up

        }
    };

    const sendResponses = async (responses) => {
        try {
          const res = await fetch('/api/submit', {
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

    const handleClosePopup = () => {
        setShowPopup(false);
        setPostTestCompleted(true);
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
                    message="Thank you for your participation."
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
}

export default PostTest;