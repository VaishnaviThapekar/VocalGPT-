import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import axios from 'axios';
import './Chatbot.css';

let recognition;

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm AI. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const chatRef = useRef(null);

  const cohereApiKey = ""; // API key

  const sendToCohere = async (userMessage) => {
    try {
      const response = await axios.post(
        "https://api.cohere.ai/v1/chat",
        {
          message: userMessage,
          model: "command-r-plus",
        },
        {
          headers: {
            Authorization: `Bearer ${cohereApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botReply = response.data.text.trim();
      speak(botReply);
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      let errorMsg = "Something went wrong. Please try again.";
      if (error.response?.status === 429) {
        errorMsg = "⚠️ You're sending messages too quickly. Please wait a moment.";
      } else if (error.response?.status === 401) {
        errorMsg = "⚠️ Invalid API Key. Please check your Cohere key.";
      }
      speak(errorMsg);
      setMessages((prev) => [...prev, { text: errorMsg, sender: "bot" }]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    sendToCohere(input);
    setInput("");
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support voice recognition.');
      return;
    }

    if (!recognition) {
      recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const voiceText = event.results[0][0].transcript;
        setInput(voiceText);
        setMessages((prev) => [...prev, { text: voiceText, sender: "user" }]);
        sendToCohere(voiceText);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container mt-4 chatbot-container">
      <div className="card shadow-lg">
        <div className="card-header bg-dark text-white text-center">
          <h4>VocalGPT : Talk with AI</h4>
        </div>
        <div className="card-body chat-area">
          {messages.map((msg, idx) => (
            <Message key={idx} text={msg.text} sender={msg.sender} />
          ))}
          <div ref={chatRef} />
        </div>
        <div className="card-footer d-flex gap-2">
          <button
            onClick={handleVoiceInput}
            className={`btn ${isListening ? 'btn-danger' : 'btn-outline-danger'} rounded-circle`}
            title={isListening ? "Click to stop listening" : "Click to start voice input"}
          >
            🎤
          </button>
          <input
            type="text"
            value={input}
            placeholder="Type a message..."
            className="form-control"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} className="btn btn-success">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
