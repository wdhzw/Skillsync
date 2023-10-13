import React, { useState } from "react";
import './Chats.css';

const conversations = [
    {id: 1, name: "John Doe", profileImage: "/images/john-doe.png"},
    {id: 2, name: "Jane Smith", profileImage: "/images/jane-smith.png"},
];

const Chats = () => {
    const [selectedChat, setSelectedChat] = useState(conversations[0].id);
    const [messages, setMessages] = useState({});
    const [currentMessage, setCurrentMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSendMessage = () => {
        if (!selectedChat) return;

        setMessages(prevMessages => ({
            ...prevMessages,
            [selectedChat]: [
                ...(prevMessages[selectedChat] || []),
                currentMessage
            ]
        }));

        setCurrentMessage("");
    };

    return (
        <div className="chat-container">
            <div className="conversations-list">
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {conversations.filter(convo => convo.name.toLowerCase().includes(searchTerm.toLowerCase())).map(conversation => (
                    <div 
                        key={conversation.id} 
                        className={`conversation-item ${selectedChat === conversation.id ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedChat(conversation.id);
                            setCurrentMessage("");
                        }}
                    >
                        <img src={conversation.profileImage} className="small-profile-img" alt={conversation.name} />
                        {conversation.name}
                    </div>
                ))}
            </div>

            <div className="chat-content">
                <div className="chat-header">
                    <img src={selectedChat ? conversations.find(c => c.id === selectedChat).profileImage : "#"}  className="profile-img" alt="profile" />
                    {selectedChat ? conversations.find(c => c.id === selectedChat).name : "[Select a chat]"}
                    <button className="block-btn">Block User</button>
                </div>
                <div className="chat-body">
                    {(messages[selectedChat] || []).map((message, idx) => (
                        <div key={idx} className="message user">
                            {message}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input 
                        type="text" 
                        placeholder="Type a message..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage} disabled={!currentMessage || !selectedChat}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chats;
