import React from 'react';
import './InvitationItem.css';
import { Link } from 'react-router-dom';

function InvitationItem({ invitation, user, type }) {
    if (!user) {
    return (
        <div className="invitations-grid-item">
            <p>Uh Oh, User has Left SkillSync</p>
        </div>
    );
    }
    return (
      <div className="invitations-grid-item">
        
        <div className="invitations-maincontent">
            <img src={user.picture} width="50" height="50" />
            <h2>{user.name}</h2>
            <div className="location-bubble">{user.location}</div>
        </div>

        <div className="invitations-buttons">
                {
                    type === "sentinvitations" ? (
                        <>
                            {invitation.invite_accepted ? (
                                      <Link to="/Chats">
                                      <button className="chat-button">Start Chat</button>
                                      </Link>
                            ) : (
                                <p>Pending Response</p>
                            )}
                            <p>Withdraw Invite</p>
                        </>
                    ) : (
                        <>
                            <Link to="/Chats">
                            <button className="chat-button">Accept Invite</button>
                            <p>Decline Invite</p>
                            </Link>
                        </>
                    )
                }
            </div>

      </div>
    );
  }
  
  export default InvitationItem;
  