import React, { useState } from 'react';
import './SchemeCard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SchemeCard = (props) => {
    const [isPlaying, setIsPlaying] = useState(false); // Track if speech is playing

    // Function to handle text-to-speech
    const handleTextToSpeech = (text) => {
        if (!text) return;

        const voices = window.speechSynthesis.getVoices();
        let selectedVoice = voices.find((voice) => voice.lang === props.language);

        // Fallback to Hindi if Marathi is not available
        if (!selectedVoice && props.language === "mr-IN") {
            selectedVoice = voices.find((voice) => voice.lang === "hi-IN");
        }

        if (!selectedVoice) {
            alert("Text-to-speech for the selected language is not supported on this browser.");
            return;
        }

        const speech = new SpeechSynthesisUtterance(text);
        speech.voice = selectedVoice;
        speech.lang = selectedVoice.lang;
        speech.rate = 1; // Set the speed of speech (1 is normal speed)
        speech.pitch = 1; // Set the pitch of the voice

        // Start speech synthesis
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);

        // When speech ends, update the state
        speech.onend = () => setIsPlaying(false);
    };

    // Function to stop text-to-speech
    const stopTextToSpeech = () => {
        window.speechSynthesis.cancel(); // Stops any ongoing speech
        setIsPlaying(false);
    };

    return (
        <div className="scheme-card">
            <b><h2>{props.data.Name}</h2></b>
            <b><h3>Ministry Of Agriculture</h3></b>

            <p>{props.data.Description[props.language]}</p>
            <span className="tag">{props.data["Application Mode"]}</span>
            <span className="tag">{props.data["Employment"]}</span>
            <span className="tag">{props.data["Residence"]}</span>
            <span className="tag">{props.data["Benefit"]}</span>
            <span>
                <button>
                    <a href={props.data.link} target="_blank" rel="noopener noreferrer">Apply Now</a>
                </button>
            </span>

            {/* Listen and Stop Button */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
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
                        if (isPlaying) {
                            stopTextToSpeech();
                        } else {
                            handleTextToSpeech(props.data.Description[props.language]);
                        }
                    }}
                >
                    <i className={isPlaying ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high"}></i>
                </button>
            </div>
        </div>
    );
};

export default SchemeCard;
