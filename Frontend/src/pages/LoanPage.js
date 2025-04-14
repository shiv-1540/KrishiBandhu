import React, { useState, useEffect } from "react";
import axios from "axios";

const LoanPage = () => {
  const [loans, setLoans] = useState([]);
  const [language, setLanguage] = useState("en-US"); // Default language is English
  const [playingLoanId, setPlayingLoanId] = useState(null); // Track which loan is playing
  const API_URL = "https://krushi-backend-1.onrender.com/api/loans"; // Backend API URL

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get(API_URL);
      setLoans(response.data.loans || []); // Ensure correct data extraction
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  // Function to handle text-to-speech
  const handleTextToSpeech = (text, loanId) => {
    if (!text) return;

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = language; // Use the selected language
    speech.rate = 1; // Set the speed of speech (1 is normal speed)
    speech.pitch = 1; // Set the pitch of the voice

    // Start speech synthesis
    window.speechSynthesis.speak(speech);
    setPlayingLoanId(loanId); // Set the currently playing loan ID

    // When speech ends, update the state
    speech.onend = () => setPlayingLoanId(null);
  };

  // Function to stop text-to-speech
  const stopTextToSpeech = () => {
    window.speechSynthesis.cancel(); // Stops any ongoing speech
    setPlayingLoanId(null); // Reset the playing loan ID
  };

  return (
    <div style={styles.container}>
      <h1>🚜 Farmer Loan Options</h1>

      {/* Language Selector */}
      <div style={styles.languageSelector}>
        <label htmlFor="language-select" style={{ marginRight: "10px" }}>
          Select Language:
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={styles.languageDropdown}
        >
          <option value="en-US">English</option>
          <option value="mr-IN">Marathi</option>
          <option value="hi-IN">Hindi</option>
        </select>
      </div>

      <div style={styles.loanGrid}>
        {loans.length > 0 ? (
          loans.map((loan, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h2 style={styles.bankName}>{loan["Bank Name"]}</h2>
              <h3 style={styles.loanName}>{loan["Loan Name"]}</h3>
              <p style={styles.description}>{loan.Description}</p>
              <p style={styles.interestRate}>💰 Interest Rate: {loan["Interest Rate"]}</p>

              {/* Listen and Stop Button */}
              <div style={styles.ttsControls}>
                <button
                  style={{
                    padding: "8px",
                    color: "black",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    if (playingLoanId === index) {
                      stopTextToSpeech();
                    } else {
                      handleTextToSpeech(loan.Description, index);
                    }
                  }}
                >
                  <i
                    className={
                      playingLoanId === index
                        ? "fa-solid fa-volume-xmark"
                        : "fa-solid fa-volume-high"
                    }
                  ></i>
                </button>
              </div>

              <a
                href={loan["Apply Link"]}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.applyButton}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1E5F3F")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#2E8B57")}
              >
                Apply Now
              </a>
            </div>
          ))
        ) : (
          <p>Loading loans...</p>
        )}
      </div>
    </div>
  );
};

// ✅ Optimized Styles for Clean UI
const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  languageSelector: {
    marginBottom: "20px",
  },
  languageDropdown: {
    padding: "5px 10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  loanGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
    textAlign: "left",
    transition: "transform 0.3s ease-in-out",
  },
  bankName: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: "5px",
  },
  loanName: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },
  interestRate: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#d32f2f",
  },
  ttsControls: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  applyButton: {
    display: "block",
    width: "100%",
    textAlign: "center",
    marginTop: "15px",
    padding: "10px",
    borderRadius: "5px",
    textDecoration: "none",
    background: "#2E8B57",
    color: "white",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
};

export default LoanPage;
