import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; 

const App = () => {
  const [messages, setMessages] = useState([]); 
  const [inputMessage, setInputMessage] = useState(""); 
  // Fetch data from the API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/chats");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  
  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      try {
        const response = await axios.post("http://localhost:3001/api/chat", {
          message: inputMessage,
        });
        setMessages((prev) => [...prev, { userMessage: inputMessage, botReply: response.data.reply }]);
        setInputMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="app-container">
      <div className="message-container">
        <h2>Chat Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="message-item">
              <strong>User:</strong> {msg.userMessage} <br />
              <strong>Bot:</strong> {msg.botReply}
            </li>
          ))}
        </ul>
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="input-field"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
