import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Adjust this path based on your project structure
import graphQLFetch from './api'; // Adjust this path based on your project structure
import { Link, useLocation } from 'react-router-dom';
import './Chats.css';
import '../Modal.css';

const Chats = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const profileChatId = queryParams.get('profileChatId'); // '4' if the URL is '/Chats?chatId=4'
    
    const { loggedInUser } = useContext(AuthContext);
    useEffect(() => {
        console.log('Current loggedInUser:', loggedInUser);
    }, [loggedInUser]);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [currentMessage, setCurrentMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [blockedUsers, setBlockedUsers] = useState([]);

    const handleSendMessage = async () => {
        if (!currentMessage || !selectedChat || blockedUsers.includes(selectedChat.id)) {
            console.log('Message sending conditions not met');
            return;
        }
    
        const mutation = `
            mutation sendMessage($chatId: ID!, $content: String!, $sender: ID!) {
                sendMessage(chatId: $chatId, content: $content, sender: $sender) {
                    id
                    content
                    timestamp
                }
            }
        `;
    
        const vars = {
            chatId: selectedChat.id,
            content: currentMessage,
            sender: loggedInUser.id
        };
    
        try {
            const response = await graphQLFetch(mutation, vars);
            if (response && response.sendMessage) {
                // Refresh chats and keep the current chat selected
                fetchChats(selectedChat.id);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    
        setCurrentMessage("");
    };

    const fetchChats = async (chatIdToSelect) => {
        if (loggedInUser && loggedInUser.id) {
            const query = `query getUserChats($userId: ID!) {
                getUserChats(userId: $userId) {
                    id
                    messages {
                        id
                        content
                        timestamp
                        sender
                    }
                    participants {
                        id
                        username
                        profile {
                            avatar
                        }
                    }
                }
            }`;
    
            const data = await graphQLFetch(query, { userId: loggedInUser.id });
            if (data) {
                setChats(data.getUserChats);
                if (chatIdToSelect) {
                    const chatToSelect = data.getUserChats.find(chat => chat.id === chatIdToSelect);
                    if (chatToSelect) setSelectedChat(chatToSelect);
                }
            }
        }
    };

    const handleDeleteChat = async (chatId) => {
        if (window.confirm('Are you sure you want to delete this chat?')) {
            const deleteChatMutation = `
                mutation deleteChat($chatId: ID!) {
                    deleteChat(chatId: $chatId)
                }
            `;
    
            try {
                const vars = { chatId };
                const response = await graphQLFetch(deleteChatMutation, vars);
                if (response.deleteChat) {
                    setChats(chats.filter(chat => chat.id !== chatId));
                    if (selectedChat?.id === chatId) setSelectedChat(null);
                }
            } catch (error) {
                console.error('Error deleting chat:', error);
            }
        }
    };

    useEffect(() => {
        fetchChats(profileChatId);
    }, [loggedInUser, profileChatId]);
    

    return (
        <div className="chat-container">

            {/* {showConfirmSkillSyncModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to initiate SkillSync with this user?</p>
                        <button className="confirm-btn" onClick={confirmSkillSync}>Yes</button>
                        <button className="cancel-btn" onClick={() => setShowConfirmSkillSyncModal(false)}>No</button>
                    </div>
                </div>
            )} */}

            {/* {showRateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Rate this user:</p>
                        <input type="number" className="rating-input" value={rating} onChange={e => setRating(e.target.value)} min="0" max="5" />
                        <textarea placeholder="Leave a comment..." value={comment} onChange={e => setComment(e.target.value)} />
                        <button className="confirm-btn" onClick={submitRating}>Submit Rating</button>
                        <button className="cancel-btn" onClick={() => setShowRateModal(false)}>Cancel</button>
                    </div>
                </div>
            )} */}

            {/* {showBlockModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to block this user?</p>
                        <button className="confirm-btn" onClick={confirmBlock}>Yes</button>
                        <button className="cancel-btn" onClick={() => setShowBlockModal(false)}>No</button>
                    </div>
                </div>
            )} */}
    
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
                {chats.filter(chat => 
                    chat.participants.some(participant => 
                        participant.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        participant.id !== loggedInUser.id
                    )
                ).map(chat => (
                    <div 
                        key={chat.id} 
                        className={`conversation-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                        onClick={() => setSelectedChat(chat)}
                    >
                        {/* Render participant info here */}
                        {chat.participants.find(p => p.id !== loggedInUser.id).username}
                        <button onClick={() => handleDeleteChat(chat.id)} className="delete-chat-btn">
                            Delete
                        </button>
                    </div>
                ))}

            </div>

    
            {/* Chat Content */}
            <div className="chat-content">
                <div className="chat-header">
                {selectedChat && (
                    // Find the user in the chat who is not the logged-in user
                    <Link to={`/ViewProfile?userId=${(selectedChat.participants.find(p => p.id !== loggedInUser.id).id)}`}>
                        <img 
                            src={selectedChat.participants.find(p => p.id !== loggedInUser.id).profile.avatar} 
                            className="profile-img" 
                            alt="Profile" 
                        />
                    </Link>
                )}

                {selectedChat 
                        ? selectedChat.participants.find(p => p.id !== loggedInUser.id).username 
                        : "[Select a chat]"
                    }
                    {/* SkillSync buttons */}
                    {/* {!skillSyncingUsers.includes(selectedChat) && (
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
                    )} */}

                    {/* Block user button */}
                    {/* <button onClick={handleBlock} className="block-btn">
                        {blockedUsers.includes(selectedChat) ? 'Unblock User' : 'Block User'}
                    </button> */}
                </div>
    
                    <div className="chat-body">
                        {selectedChat && selectedChat.messages.map((message, idx) => (
                            <div 
                                key={idx} 
                                className={`message ${String(message.sender) === String(loggedInUser.id)? 'self' : 'other'}`}
                            >
                                {message.content}
                            </div>
                        ))}
                        {blockedUsers.includes(selectedChat) && (
                            <div className="blocked-message">
                                You have blocked this user. To view messages and interact, unblock them.
                            </div>
                        )}
                    </div>

    
                <div className="chat-input">
                    <input 
                        type="text" 
                        placeholder="Type a message..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                    <button 
                        onClick={handleSendMessage} 
                        disabled={!currentMessage || !selectedChat || blockedUsers.includes(selectedChat)}
                    >
                        Send
                    </button>
                </div>

            </div>
        </div>
    );
    
}

export default Chats;