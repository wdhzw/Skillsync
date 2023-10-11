import React from 'react';
import './UserItem.css';

function UserItem({ user }) {
    return (
      <div className="user-item">
        <img src={user.picture} width="100" />
        <h2>{user.name}</h2>
        <div className="location-bubble">{user.location}</div>
        <p><h3>{user.noofskills}</h3></p>
        <p>{user.noofskills} Skills to Share</p>
        <div>
          {user.skills.map((skill) => (
            <div className="skill-box">
              {skill}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default UserItem;
  