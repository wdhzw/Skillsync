import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Adjust this path based on your project structure
import graphQLFetch from './api'; // Adjust this path based on your project structure
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
    const [messages, setMessages] = useState([]); // Initialize as an array
    const [currentMessage, setCurrentMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [blockedUsers, setBlockedUsers] = useState([]);
    // const [skillSyncingUsers, setSkillSyncingUsers] = useState([]);
    // const [showConfirmSkillSyncModal, setShowConfirmSkillSyncModal] = useState(false);
    // const [showRateModal, setShowRateModal] = useState(false);
    // const [rating, setRating] = useState('');
    // const [comment, setComment] = useState('');

    // const handleStartSkillSync = () => {
    //     setShowConfirmSkillSyncModal(true);
    // };

    // const confirmSkillSync = () => {
    //     if (!skillSyncingUsers.includes(selectedChat)) {
    //         setSkillSyncingUsers([...skillSyncingUsers, selectedChat]);
    //     }
    //     setShowConfirmSkillSyncModal(false);
    // };

    // const handleBlock = () => {
    //     if (blockedUsers.includes(selectedChat)) {
    //         setBlockedUsers(blockedUsers.filter(id => id !== selectedChat));
    //     } else {
    //         setShowBlockModal(true);
    //     }
    // };

    // const confirmBlock = () => {
    //     setBlockedUsers([...blockedUsers, selectedChat]);
    //     setShowBlockModal(false);
    // }

    // const handleRate = () => {
    //     setShowRateModal(true);
    // };

    // const submitRating = () => {
    //     setShowRateModal(false);
    // };

    const handleSendMessage = async () => {
        console.log('handleSendMessage called'); // Log when function is called
    
        // Check if there's a current message and a selected chat, and the chat is not blocked
        if (!currentMessage || !selectedChat || blockedUsers.includes(selectedChat.id)) {
            console.log('Message sending conditions not met'); // Log condition failure
            return;
        }
    
        // Define the GraphQL mutation
        const mutation = `
            mutation sendMessage($chatId: ID!, $content: String!, $sender: ID!) {
                sendMessage(chatId: $chatId, content: $content, sender: $sender) {
                    id
                    content
                    timestamp
                }
            }
        `;
    
        // Variables for the GraphQL query
        const vars = {
            chatId: selectedChat.id, // Ensure this is a string if your server expects IDs to be strings
            content: currentMessage,
            sender: loggedInUser.id // Again, ensure this is a string if needed
          };
    
        try {
            console.log('Sending message:', vars); // Log the variables being sent
    
            const response = await graphQLFetch(mutation, vars);
            console.log('Message sent:', response); // Log the response
    
            // No need to manually add the message to the chat since the server does it
            // Instead, we refetch the chat messages to get the latest messages including the one just sent
            await fetchChats();
    
        } catch (error) {
            console.error('Error sending message:', error); // Log any errors
        }
    
        setCurrentMessage(""); // Reset the input field
    };
    
    
      
    const fetchChats = async () => {
        if (loggedInUser && loggedInUser.id) {
            console.log("Fetching chats for user:", loggedInUser.id);
            const query = `query getUserChats($userId: ID!) {
                getUserChats(userId: $userId) {
                    id
                    messages {
                        id
                        content
                        timestamp
                        sender
                    }
                    participants{
                        id
                        username
                        profile {
                            avatar
                        }
                    }
                }
            }`;
    
            const data = await graphQLFetch(query, { userId: loggedInUser.id });
            console.log("Fetched chats:", data);
            if (data) {
                setChats(data.getUserChats);
            }
        }
    };
    
    useEffect(() => {
        fetchChats();
    }, [loggedInUser]);
    
// This useEffect will run after 'chats' has been updated
useEffect(() => {
    if (profileChatId) {
        // Ensure profileChatId is the same type as chat.id
        const chatIdToFind = typeof chats[0]?.id === 'number' ? Number(profileChatId) : profileChatId;
        console.log("profildid, ",  chatIdToFind)
        console.log("chat, ", chats)
        const foundChat = chats.find(chat => chat.id === chatIdToFind);
        console.log("found", foundChat)
        if (foundChat) {
            setSelectedChat(foundChat);
        }
    } else if (chats.length > 0) {
        // Select the first chat by default if no specific chat ID is given
        setSelectedChat(chats[0]);
    }
}, [chats, profileChatId]); // This effect depends on 'chats' and 'profileChatId'

    

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