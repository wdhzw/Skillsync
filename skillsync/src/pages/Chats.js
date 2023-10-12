import React, { useState } from "react";
import './Chats.css'; 

const Chats = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    const conversations = [
        {id: 1, name: "John Doe"},
        {id: 2, name: "Jane Smith"},
        // Add more conversations as needed
    ];

    return (
        <div className="chat-container">
            <div className="conversations-list">
                {conversations.map(conversation => (
                    <div 
                        key={conversation.id} 
                        className={`conversation-item ${selectedChat === conversation.id ? 'active' : ''}`}
                        onClick={() => setSelectedChat(conversation.id)}
                    >
                        {conversation.name}
                    </div>
                ))}
            </div>

            <div className="chat-content">
                <div className="chat-header">
                    Chat with {selectedChat ? conversations.find(c => c.id === selectedChat).name : "[Select a chat]"}
                </div>
                <div className="chat-body">
                    {/* Messages for the selected chat go here */}
                </div>
                <div className="chat-input">
                    <input type="text" placeholder="Type a message..."/>
                    <button>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chats;
