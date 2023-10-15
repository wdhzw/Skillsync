import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Chats.css';
import '../Modal.css';

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
    2: [ // Messages for conversation with Jane Smith (id: 3)
        {
            senderId: 2,
            timestamp: new Date('2023-10-14T09:00:00'),
            text: "Hey Jane! I saw you're proficient in Graphic Design. I'm trying to learn the basics, got any tips?"
        },
        {
            senderId: 3,
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
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [skillSyncingUsers, setSkillSyncingUsers] = useState([]);
    const [showConfirmSkillSyncModal, setShowConfirmSkillSyncModal] = useState(false);
    const [showRateModal, setShowRateModal] = useState(false);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const handleStartSkillSync = () => {
        setShowConfirmSkillSyncModal(true);
    };

    const confirmSkillSync = () => {
        if (!skillSyncingUsers.includes(selectedChat)) {
            setSkillSyncingUsers([...skillSyncingUsers, selectedChat]);
        }
        setShowConfirmSkillSyncModal(false);
    };

    const handleBlock = () => {
        if (blockedUsers.includes(selectedChat)) {
            setBlockedUsers(blockedUsers.filter(id => id !== selectedChat));
        } else {
            setShowBlockModal(true);
        }
    };

    const confirmBlock = () => {
        setBlockedUsers([...blockedUsers, selectedChat]);
        setShowBlockModal(false);
    }

    const handleRate = () => {
        setShowRateModal(true);
    };

    const submitRating = () => {
        setShowRateModal(false);
    };

    const handleSendMessage = () => {
        if (!currentMessage || !selectedChat || blockedUsers.includes(selectedChat)) return;

        const newMessage = {
            senderId: 2, // Assuming 2 is the user ID
            timestamp: new Date(),
            text: currentMessage
        };

        setMessages(prevMessages => ({
            ...prevMessages,
            [selectedChat]: [...(prevMessages[selectedChat] || []), newMessage]
        }));

        setCurrentMessage("");
    };
    return (
        <div className="chat-container">

            {showConfirmSkillSyncModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to initiate SkillSync with this user?</p>
                        <button className="confirm-btn" onClick={confirmSkillSync}>Yes</button>
                        <button className="cancel-btn" onClick={() => setShowConfirmSkillSyncModal(false)}>No</button>
                    </div>
                </div>
            )}

            {showRateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Rate this user:</p>
                        <input type="number" className="rating-input" value={rating} onChange={e => setRating(e.target.value)} min="0" max="5" />
                        <textarea placeholder="Leave a comment..." value={comment} onChange={e => setComment(e.target.value)} />
                        <button className="confirm-btn" onClick={submitRating}>Submit Rating</button>
                        <button className="cancel-btn" onClick={() => setShowRateModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {showBlockModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to block this user?</p>
                        <button className="confirm-btn" onClick={confirmBlock}>Yes</button>
                        <button className="cancel-btn" onClick={() => setShowBlockModal(false)}>No</button>
                    </div>
                </div>
            )}
    
            {/* Conversations List */}
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
    
            {/* Chat Content */}
            <div className="chat-content">
                <div className="chat-header">
                    <Link to="/ViewProfile">
                        <img src={selectedChat ? conversations.find(c => c.id === selectedChat).profileImage : "#"} className="profile-img" alt="profile" />
                    </Link>
                    {selectedChat ? conversations.find(c => c.id === selectedChat).name : "[Select a chat]"}
    
                    {/* SkillSync buttons */}
                    {!skillSyncingUsers.includes(selectedChat) && (
                        <button onClick={handleStartSkillSync} className="initiate-exchange-btn">
                            Start SkillSync
                        </button>
                    )}
                    {skillSyncingUsers.includes(selectedChat) && (
                        <>
                            <button onClick={handleRate} className="rate-btn">
                                Rate
                            </button>
                            <button className="skillsyncing-btn">
                                SkillSyncing...
                            </button>
                        </>
                    )}

                    {/* Block user button */}
                    <button onClick={handleBlock} className="block-btn">
                        {blockedUsers.includes(selectedChat) ? 'Unblock User' : 'Block User'}
                    </button>
                </div>
    
                <div className="chat-body">
                    {blockedUsers.includes(selectedChat) ? (
                        <div className="blocked-message">
                            You have blocked this user. To view messages and interact, unblock them.
                        </div>
                    ) : (
                        (messages[selectedChat] || []).map((message, idx) => (
                            <div key={idx} className={`message ${message.senderId === 2 ? 'self' : 'user'}`}>
                                {message.text}
                            </div>
                        ))
                    )}
                </div>
    
                <div className="chat-input">
                    <input 
                        type="text" 
                        placeholder="Type a message..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage} disabled={!currentMessage || !selectedChat || blockedUsers.includes(selectedChat)}>Send</button>
                </div>
            </div>
        </div>
    );
    
}

export default Chats;
