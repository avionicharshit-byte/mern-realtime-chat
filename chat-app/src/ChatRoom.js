import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); 

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() !== '') {
      socket.emit('chatMessage', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div style={{ height: '300px', border: '1px solid #ccc', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
