// Rulebook.js

import React, { useState } from 'react';
import './Rulebook.css';

const Rulebook = () => {
  const [page, setPage] = useState(0);
  const pages = [
    {
      title: "Phishing Red Flags (Page 1 of 4)",
      content: [
        { heading: "Suspicious Sender", points: ["Unknown email addresses (usually gibberish or intelligible)", "Impersonation with slight variations from actual names"] },
        { heading: "Urgent Language", points: ["Immediate action required", "Alleges negative outcomes or threats"] },
      ]
    },
    {
      title: "Phishing Red Flags (Page 2 of 4)",
      content: [
        { heading: "Attachments and Links", points: ["Unexpected attachments (.EXE, .RAR, .ZIP, .SCR)", "Misleading hyperlinks (hovering over reveals suspicious URL)"] },
        { heading: "Generic Greetings", points: ["Impersonal and generic greetings", "Lack of detailed contact information"] },
      ]
    },
    {
      title: "Phishing Red Flags (Page 3 of 4)",
      content: [
        { heading: "Poor Grammar", points: ["Obvious grammatical errors and typos", "Unprofessional language and awkward tone"] },
        { heading: "Unusual Requests", points: ["Sensitive information requests", "Uncharacteristic requests beyond normal business practices"] },
      ]
    },
    {
      title: "Phishing Red Flags (Page 4 of 4)",
      content: [
        { heading: "Mismatched Domains", points: ["Inconsistent email domains (support@paypa1.com)"] },
        { heading: "Spoofed Websites", points: ["Lookalike URLs (www.appl3.com) ", "Insecure sites (uses HTTP rather than HTTPS)" ] },
        { heading: "Too Good to Be True", points: ["Unbelievable offers and unrealistic deals", "Unexpected notifications of winnings or inheritance"] },
      ]
    }
  ];

  const nextPage = () => setPage((prev) => (prev + 1) % pages.length);
  const prevPage = () => setPage((prev) => (prev - 1 + pages.length) % pages.length);

  return (
    <div className="rulebook">
      <h2>{pages[page].title}</h2>
      {pages[page].content.map((section, index) => (
        <div key={index} className="section">
          <h3>{section.heading}</h3>
          <ul>
            {section.points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="navigation">
        <button onClick={prevPage}>&laquo; Previous</button>
        <button onClick={nextPage}>Next &raquo;</button>
      </div>
    </div>
  );
};

export default Rulebook;


