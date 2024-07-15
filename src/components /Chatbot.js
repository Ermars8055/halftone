import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = ({ onCoordinatesSubmit }) => {
  const [messages, setMessages] = useState([
    { text: 'Hello! What is your latitude?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);

      if (latitude === null) {
        setLatitude(input.trim());
        setMessages((prev) => [...prev, { text: 'What is your longitude?', sender: 'bot' }]);
      } else if (longitude === null) {
        setLongitude(input.trim());
        setMessages((prev) => [
          ...prev,
          { text: 'Got it! When you are ready, type "let\'s go".', sender: 'bot' },
        ]);
      } else if (input.toLowerCase() === "let's go") {
        onCoordinatesSubmit({ latitude, longitude });
      }

      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
