import React, { useEffect, useState } from "react";
import socket from "./socket";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Listening for events from the server
    socket.on("reply", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("client-user-joined", (data) => {
      console.log(data.message);
    });

    socket.on("client-user-left", (data) => {
      console.log(data.message);
    });

    return () => {
      socket.off("reply");
      socket.off("client-user-joined");
      socket.off("client-user-left");
    };
  }, []);

  const sendMessage = () => {
    // Emitting an event to the server
    socket.emit("newMessage", newMessage);
    setNewMessage("");
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
