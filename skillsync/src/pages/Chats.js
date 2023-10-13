import React, { useState } from "react";
import './Chats.css';

const conversations = [
    {id: 1, name: "John Doe", profileImage: "/images/john-doe.png"},
    {id: 2, name: "Jane Smith", profileImage: "/images/jane-smith.png"},
];
const sampleMessages = {
    1: [ // Messages for conversation with John Doe (id: 1)
        {
            senderId: 1,
            timestamp: new Date('2023-10-13T12:00:00'),
            text: "Hi there! I noticed you're skilled in React development. Could you help me out with some concepts?"
        },
        {
            senderId: 2, // Assuming 2 is your user ID
            timestamp: new Date('2023-10-13T12:05:00'),
            text: "Of course, John! Which concepts are you struggling with?"
        },
        {
            senderId: 1,
            timestamp: new Date('2023-10-13T12:10:00'),
            text: "I'm having trouble understanding hooks, especially useEffect. Can we schedule a call?"
        }
    ],
    2: [ // Messages for conversation with Jane Smith (id: 2)
        {
            senderId: 2,
            timestamp: new Date('2023-10-14T09:00:00'),
            text: "Hey Jane! I saw you're proficient in Graphic Design. I'm trying to learn the basics, got any tips?"
        },
        {
            senderId: 2,
            timestamp: new Date('2023-10-14T09:20:00'),
            text: "Sure! Start with the basic tools and get hands-on practice. Would you like some resources?"
        }
    ]
};

const Chats = () => {
    const [selectedChat, setSelectedChat] = useState(conversations[0].id);
    const [messages, setMessages] = useState(sampleMessages);

    const [currentMessage, setCurrentMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSendMessage = () => {
        if (!selectedChat) return;
    
        const newMessage = {
            senderId: 2, // or whatever the current user's ID is
            timestamp: new Date(),
            text: currentMessage
        };
    
        setMessages(prevMessages => ({
            ...prevMessages,
            [selectedChat]: [
                ...(prevMessages[selectedChat] || []),
                newMessage
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
                        <div key={idx} className={`message ${message.senderId === 2 ? 'self' : 'user'}`}>
                            {message.text}
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
