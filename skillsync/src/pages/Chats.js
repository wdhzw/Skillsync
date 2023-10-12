import React, { useState } from "react";
import './Chats.css'; 

const Chats = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    const conversations = [
        {id: 1, name: "John Doe", profileImage: "/path/to/image1.jpg"},
        {id: 2, name: "Jane Smith", profileImage: "/path/to/image2.jpg"},
        // Add more conversations with profileImage path as needed
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
                    <img src={selectedChat ? conversations.find(c => c.id === selectedChat).profileImage : "#"}  className="profile-img"/>
                    Chat with {selectedChat ? conversations.find(c => c.id === selectedChat).name : "[Select a chat]"}
                    <button className="block-btn">Block User</button>
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
